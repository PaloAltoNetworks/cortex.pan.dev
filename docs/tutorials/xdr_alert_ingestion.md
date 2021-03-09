---
id: xdr_alert_ingestion
title: Third-Party alert ingestion into XDR
sidebar_label: XDR Alert Ingestion
description: How to user the XDR Alert Ingestion API
keywords:
  - cortex
  - api
  - go
  - alert
  - xdr
---

## Reason and objective
Cortex XDR PRO features an amazing workflow capable of correlating all sort of alerts into meninful incidents. It provides support
for self-generated alerts (the ones coming from Palo Alto Networks endpoint agents or NGFW's) as well as for third party alerts.
These third party alerts can be incorporated into the product by consuming its **Insert Parsed Alerts API**

This API provides quota enforcement (up to 600 alerts per minute / up to 60 alerts per update). Anyone willing to consume it should
thake that into consideration to avoid alerts being lost due to quota exceeding.

In this tutorial we will implement a pipeline with the following features:
* HTTP front end to process POST requests that contain alerts to be be ingested into Cortex XDR PRO
* Pipeline stage to enforce qouta limitation imposed by XDR
* Client to the Cortex XDR [insert parsed alerts API](https://docs.paloaltonetworks.com/cortex/cortex-xdr/cortex-xdr-api/cortex-xdr-apis/incident-management/insert-parsed-alerts.html#insert-parsed-alerts)

As a project of this characteristics is meant to end up becoming a *micro-service* the following architecural decisions have been taken in
consideration:
* The code must be as compact as possible to run in a container - opted to code in [GO](https://golang.org/)
* Runtime footprint and dependencies must be as low as possible to reduce vulnerabilities - opted to use static linking in a [distroless image](https://github.com/GoogleContainerTools/distroless)

The project described in this article became a repository of its own and is available in [GitHub](https://github.com/xhoms/xdrgateway)

## Insert Parsed Alerts API GO client
There are two main elements to implement here:
* a collection of structs and corresponding methods to create the API payload
* a type to hold secret data capable of implementing the *Advanced API key* authentication method

### The payload structs
The API uses a JSON payload whose main component is an array of alerts with a pre-defined schema.

```json title="Insert Parsed Alert API payload"
{
    "request_data": {
        "alerts": [
            {
                "product": "VPN & Firewall-1",
                "vendor": "<vendor name>",
                "local_ip": "<IP address>",
                "local_port": <port>,
                "remote_ip": "<IP address>",
                "remote_port": <port>,
                "event_timestamp": 1543270652000, // in unix milli
                "severity": "Low",
                "alert_name": "Alert Name Example",
                "alert_description": "Alert Description",
                "action_status": "Reported"
            }
        ]
    }
}
```

To produce such a payload we need a corresponding GO struct featuring [`json tags`](https://golang.org/pkg/encoding/json/)

```go
type jsonalert struct {
	Product          string `json:"product"`
	Vendor           string `json:"vendor"`
	LocalIP          string `json:"local_ip"`
	LocalPort        uint16 `json:"local_port"`
	RemoteIP         string `json:"remote_ip"`
	RemotePort       uint16 `json:"remote_port"`
	Timestamp        int64  `json:"event_timestamp"`
	Severity         string `json:"severity,omitempty"`
	AlertName        string `json:"alert_name"`
	AlertDescription string `json:"alert_description,omitempty"`
	ActionStatus     string `json:"action_status,omitempty"`
}
```

We need, as well, the struct to encapsulate these alerts into a `request_data` json object

```go
type xdrPayload struct {
	RequestData struct {
		Alerts []jsonalert `json:"alerts"`
	} `json:"request_data"`
}
```

There is no need to export the `xdrPayload` struct. But a decision has to be taken regarding whether we expose the `jsonalert`
struct in the library for the developer to fill its properties. A deep dive into the API reveals that some properties like
`severity` and `action_status` can't contain arbitrary string values but enumerated ones.

With that in mind it looks safer to expose an abstracted struct instead and type aliases for these enumerated values. This way
the developer will be forced to use only valid values.

```go {1,2,22,25}
type Severities int
type Actions int

const (
	SeverityInfo Severities = iota
	SeverityLow
	SeverityMedium
	SeverityHigh
	SeverityUnknown
	ActionReported Actions = iota
	ActionBlocked
)

type Alert struct {
	Product          string
	Vendor           string
	LocalIP          string
	LocalPort        uint16
	RemoteIP         string
	RemotePort       uint16
	Timestamp        int64
	Severity         Severities
	AlertName        string
	AlertDescription string
	Action           Actions
}
```

These enumerated values will need to be converted eventually into their string representations. 
```go
func (s Severities) toString() (severity string) {
	switch s {
	case SeverityInfo:
		severity = "Informational"
	case SeverityLow:
		severity = "Low"
	case SeverityMedium:
		severity = "Medium"
	case SeverityHigh:
		severity = "High"
	default:
		severity = "Unknown"
	}
	return
}

func (a Actions) toString() (action string) {
	if a == ActionBlocked {
		action = "Blocked"
	} else {
		action = "Reported"
	}
	return
}
```

Thinking on sanity of API calls it look like a good idea, as well, to provide convenience methods to validate
constrained values like `LocalIP` and `RemoteIP`. The following struct method provides validation for IPv4/v6
values.

```go {10,16}
func (a *Alert) NetData(srcIP, dstIP string, srcPort, dstPort uint16) (err error) {
	var ipaddr net.IP
	a.LocalIP = ""
	a.RemoteIP = ""
	a.LocalPort = 0
	a.RemotePort = 0
	if ipaddr = net.ParseIP(srcIP); ipaddr != nil {
		a.LocalIP = ipaddr.String()
	} else {
		err = fmt.Errorf("unable to parse Source IP %v", srcIP)
		return
	}
	if ipaddr = net.ParseIP(dstIP); ipaddr != nil {
		a.RemoteIP = ipaddr.String()
	} else {
		err = fmt.Errorf("unable to parse Destination IP %v", dstIP)
		return
	}
	a.LocalPort = srcPort
	a.RemotePort = dstPort
	return
}
```

### The *Advanced API key* authentication
Semantics for the *Advanced API key* authentication can be found in the [Get Started with Cortex XDR APIs](https://docs.paloaltonetworks.com/cortex/cortex-xdr/cortex-xdr-api/cortex-xdr-api-overview/get-started-with-cortex-xdr-apis.html) document.

Basically, a random value (nonce) must be created and shared with the XDR endpoint. That value must be used to create a hash composed of the *Advanced API Key* and *timestamp* aming to reduce replay attacks.

So let's start by defining a struct that will hold the required secret data as well as the FQDN of the XDR instance it will be interfacing with.
Let's provide, as well, a factory function that computes a valid `nonce` (random) value.

```go
type Client struct {
	APIKey     string
	APIKeyID   string
	nonce      string
	FQDN       string
}

func NewClient(apikey, apikeyid, fqdn string) (client *Client) {
	client = &Client{
		APIKey: apikey,
		APIKeyID: apikeyid,
		FQDN: fqdn,
	}
	nonce := make([]byte, 40)
	for idx := range nonce {
		nonce[idx] = byte(rand.Intn(256))
	}
	client.nonce = base32.StdEncoding.EncodeToString(nonce)
	return
}
```

Time to implement a hash method that provides the signature that will be used as the `Authentication` header value to every API call.

```go
func (c *Client) hash(tsmillis string) (apiKeyHash string) {
	sum := sha256.Sum256([]byte(c.APIKey + c.nonce + tsmillis))
	apiKeyHash = hex.EncodeToString(sum[:])
	return
}
```

The only missing piece is a method that receives an array of `Alerts` as its input and that pushes them into the
*Insert Parsed Alerts API* filling the http headers as needed to pass the authentication requirements.

```go
func (c *Client) Send(alert []*Alert) (err error) {
	var payload []byte
	var err error

	// create one "jsonalert" per each "Alert"
	jalerts := make([]jsonalert, len(alert))
	for idx := range alert {
		jalerts[idx] = jsonalert{
			Product: alert[idx].Product,
			Vendor: alert[idx].Vendor,
			LocalIP: alert[idx].LocalIP,
			LocalPort: alert[idx].LocalPort,
			RemoteIP: alert[idx].RemoteIP,
			RemotePort: alert[idx].RemotePort,
			AlertName: alert[idx].AlertName,
			AlertDescription: alert[idx].AlertDescription,
			Timestamp: alert[idx].Timestamp,
			Severity: alert[idx].Severity.toString(),
			ActionStatus: alert[idx].Action.toString(),
		}
	}

  // pack the "jsonalert" array in a request
	xp := &xdrPayload{RequestData: struct {
		Alerts []jsonalert `json:"alerts"`
	}{Alerts: jalerts}}
  
  // marshal the request into a JSON payload and push it to XDR  
	if payload, err = json.Marshal(xp); err == nil {
		now := fmt.Sprint(time.Now().UnixNano() / int64(time.Millisecond))
		url := fmt.Sprintf("https://api-%v/public_api/v1/alerts/insert_parsed_alerts/", c.FQDN)
		var request *http.Request
		request, err = http.NewRequest(http.MethodPost, url, bytes.NewReader(payload))
		request.Header["Content-Type"] = []string{"application/json"}
		request.Header["x-xdr-auth-id"] = []string{c.APIKeyID}
		request.Header["x-xdr-nonce"] = []string{c.nonce}
		request.Header["x-xdr-timestamp"] = []string{now}
		request.Header["Authorization"] = []string{c.hash(now)}
		var resp *http.Response
		httpClient := &http.Client{Timeout: 10 * time.Second}
		if resp, err = httpClient.Do(request); err == nil {
			buff := new(bytes.Buffer)
			if _, buferr := buff.ReadFrom(resp.Body); buferr == nil {
				resp.Body.Close()
				if resp.StatusCode != http.StatusOK {
					err = fmt.Errorf("xdrclient error %v - %v", resp.Status, buff.String())
					return
				}
			} else {
				err = fmt.Errorf("xdrclient error reading response (%v)", resp.Status)
				return
			}
		}
	}
  
	return
}
```

## Ingestion Pipeline
So far so good. We have a client implementation capable of receiving an array of `Alerts` and pushing
them to the *Insert Parsed Alerts API*. But, what about XDR quota enforcement? What about these *up to 600
alerts per minute* or the limit of *up to 60 alerts per update*?

Although this is a generic problem with tons of implementations available on the Internet we'll share a few
highlines of a GO implementation.

We need the following components:
* a [Buffered Channel](https://tour.golang.org/concurrency/3) that we'll use to accumulate
`Alerts`.
* a bucket (counter) that will start with a capacity of 600 units and that will be decremented each time we pull an `Alert` from the channel
* a 1 minute [Ticker](https://golang.org/pkg/time/#Ticker) to re-fill the bucket to 600 units
* a 2 seconds Ticker to check the channel for alerts and that drives `Client.Send()` with them.

Let's pack all these components into an engine function meant to be started as a goroutine.

```go
func pipeAlert(c <-chan *xdrclient.Alert, push func([]*xdrclient.Alert) (err error)) {
	t1 := time.NewTicker(2 * time.Second) // check for new alerts each two seconds
	t2 := time.NewTicker(1 * time.Minute) // reset the bucket units each minute
	bucketUnits := 600
	var batchSize int
	var alert *xdrclient.Alert
	var ok bool
	alertBatch := make([]*xdrclient.Alert, 60)
T0:
	for {
		select {
		case <-t2.C:
			bucketUnits = 600 // reset the bucketUnits back to 600
		case <-t1.C:
			batchSize = 0
		T1:
			for bucketUnits > 0 && batchSize < 60 { // drain the alert channel up to a filled batch while having bucketUnits
				select {
				case alert, ok = <-c:
					if !ok {
						break T0 // end the goroutine if there channel is closed
					}
					alertBatch[batchSize] = alert
					batchSize++
					bucketUnits--
				default:
					break T1 // break when no more alerts ara available in the channel
				}
			}
			if batchSize > 0 {
				go push(alertBatch[:batchSize])
			}
		}
	}
	t1.Stop()
	t2.Stop()
}
```

Then we can create a factory function that creates the buffered channel, starts the engine and return a function we
can use to push alerts into the pipe.

```go
func NewPipe(pushFunc func(a []*Alert) (err error)) (pipe func(a *Alert)) {
	c := make(chan *Alert, 6000) // 6000 equals to up to 10 minutes queue
	go pipeAlert(c, pushFunc)
	pipe = func(a *Alert) {
		if a == nil {
			close(c) // assume a nil as a signal to stop the engine
		} else {
			select {
			case c <- a:
			default: // drop alerts if the channel is full
			}
		}
	}
	return
}
```

### Creating a micro-service
The last step is to create a web micro-service that can receive an alert from a third party element, parse it into a
compatible `Alert` struct and then push it into the pipeline.

For that well assume we have a type that implements the following `AlertParser` interface.

```go
type AlertParser interface {
	Parse(data []byte) (alert *Alert, err error)
}
```

The following code demonstrate how to create the web server handler minimum structure (error handling should be implemented)

```go
func NewHandler(pipe func(a *Alert), p AlertParser) (handler func(w http.ResponseWriter, r *http.Request)) {
	var alert *Alert
	handler = func(w http.ResponseWriter, r *http.Request) {
		buff := new(bytes.Buffer)
		if _, err := buff.ReadFrom(r.Body); err == nil {
			if err = r.Body.Close(); err == nil {
				if alert, err = p.Parse(buff.Bytes()); err == nil {
					pipe(alert)
				}
			}
		}
		w.Write(nil)
		return
	}
	return
}
```

And that's all. We just need to initialize all components and assemble all the pieces in a web server. Check the
following code as a basic example

```go
func main() {
	var parser AlertParser = NewAlertParser() // To be provided by the developer
	client := NewClient("<apikey>", "<apikey-id>", "fqdn")
	pipe := NewPipe(client.SendMulti)
	handler := NewHandler(pipe, parser)
	http.HandleFunc("/in", handler) // accept third party alerts sent to the /in end point
	http.ListenAndServe(":8080", nil)
}
```

## Summary
In this tutorial we've covered a typical use case for the *XDR Ingest Parsed Alerts API*: a pipeline
capable of receiving third party alerts, parsing them into valid XDR payloads and pushing the
resulting data into the Cortex XDR alerts dataset. These alerts will be aggregated into their corresponding
incidents.

Althought it is a generic issue the tutorial covered as well the need for an engine capable of enforcing
quota limits imposed, in this case, by the XDR API.

The final example implementation leverages a HTTP micro-service but other implementations are possible like
hooking into `syslog-ng` or `snmptrapd`.

To reduce vulnerability footprint for the micro-service GO language was chosen and only standard runtime libraries
were used. That allows, for example, to pack the whole application in a distroless container image as demonstrated
in the following example Dockerfile

```yaml title="Dockerfile"
FROM golang:latest
RUN mkdir /app
COPY . /app/
WORKDIR /app
RUN CGO_ENABLED=0 go build -ldflags="-X 'main.build=$(date -Iminutes)'" -o server -a .

FROM gcr.io/distroless/static:nonroot
COPY --from=0 /app/server /
ENTRYPOINT ["/server"]
```