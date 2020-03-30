---
id: debugging_python
title: Debugging and Tracing
sidebar_label: Debugging and Tracing
---

:::info
The CDL Python SDK implements logging for the `HTTPClient` and `Credentials` classes. All other logging originates fro the underlying `requests`, `httpclient` and `urllib3` libraries. Additionally, the `HTTPClient` and upstream API gateway include support for cross-application tracing.
:::

## Library Debugging

If you're interested in seeing only the CDL Python SDK and underlying library debug logs, add the following to your project:

```python
import logging


logging.basicConfig(level=logging.DEBUG)
```

Sample output:

```console
DEBUG:pan_cortex_data_lake.httpclient:Monkey patched requests with ujson
DEBUG:pan_cortex_data_lake.httpclient:Default headers applied: {'User-Agent': 'cortex-data-lake-python/2.0.0-a8', 'Accept-Encoding': 'gzip, deflate', 'Accept': 'application/json', 'Connection': 'keep-alive'}
DEBUG:pan_cortex_data_lake.httpclient:Default headers applied: {'User-Agent': 'cortex-data-lake-python/2.0.0-a8', 'Accept-Encoding': 'gzip, deflate', 'Accept': 'application/json', 'Connection': 'keep-alive'}
DEBUG:pan_cortex_data_lake.httpclient:Applying session-level credentials
DEBUG:pan_cortex_data_lake.httpclient:Credentials applied to authorization header
DEBUG:urllib3.connectionpool:Starting new HTTPS connection (1): api.us.cdl.paloaltonetworks.com:443
DEBUG:urllib3.connectionpool:https://api.us.cdl.paloaltonetworks.com:443 "POST /query/v2/jobs HTTP/1.1" 201 108
DEBUG:urllib3.connectionpool:https://api.us.cdl.paloaltonetworks.com:443 "GET /query/v2/jobResults/59d47ada-3446-46a2-b5c5-37ca645314dd?resultFormat=valuesDictionary HTTP/1.1" 200 150
DEBUG:urllib3.connectionpool:https://api.us.cdl.paloaltonetworks.com:443 "GET /query/v2/jobResults/59d47ada-3446-46a2-b5c5-37ca645314dd?resultFormat=valuesDictionary HTTP/1.1" 200 2843
```

## HTTP Debugging

Add the following to you project to enable HTTP debugging that includes request headers and payloads:

```python
import http


http.client.HTTPConnection.debuglevel = 1
```

Sample output:

```console
send: b'POST /query/v2/jobs HTTP/1.1\r\nHost: api.us.cdl.paloaltonetworks.com\r\nUser-Agent: cortex-data-lake-python/2.0.0-a8\r\nAccept-Encoding: gzip, deflate\r\nAccept: application/json\r\nConnection: keep-alive\r\nx-envoy-force-trace: \r\nAuthorization: Bearer ******\r\nContent-Length: 140\r\nContent-Type: application/json\r\n\r\n'
send: b'{"params":{"query":"SELECT * FROM `01234567890.firewall.traffic` LIMIT 1"},"clientType":"cortex-sdk-python","clientVersion":"0.1.0"}'
reply: 'HTTP/1.1 201 Created\r\n'
header: date: Mon, 30 Mar 2020 20:37:42 GMT
header: content-type: application/json
header: content-length: 108
header: x-envoy-upstream-service-time: 902
header: server: istio-envoy
header: x-request-id: 9e1ce33e-7576-a4a6-838d-83ac69b74aad
send: b'GET /query/v2/jobResults/fdb94238-9ac5-4ad5-bb4a-5d11af33da95?resultFormat=valuesDictionary HTTP/1.1\r\nHost: api.us.cdl.paloaltonetworks.com\r\nUser-Agent: cortex-data-lake-python/2.0.0-a8\r\nAccept-Encoding: gzip, deflate\r\nAccept: application/json\r\nConnection: keep-alive\r\nx-envoy-force-trace: \r\nAuthorization: Bearer ******\r\n\r\n'
reply: 'HTTP/1.1 200 OK\r\n'
header: date: Mon, 30 Mar 2020 20:37:42 GMT
header: content-type: application/json
header: content-length: 150
header: x-envoy-upstream-service-time: 74
header: server: istio-envoy
header: x-request-id: 9e43458f-d083-a3b5-b320-cc69ae5b81d8
send: b'GET /query/v2/jobResults/fdb94238-9ac5-4ad5-bb4a-5d11af33da95?resultFormat=valuesDictionary HTTP/1.1\r\nHost: api.us.cdl.paloaltonetworks.com\r\nUser-Agent: cortex-data-lake-python/2.0.0-a8\r\nAccept-Encoding: gzip, deflate\r\nAccept: application/json\r\nConnection: keep-alive\r\nx-envoy-force-trace: \r\nAuthorization: Bearer ******\r\n\r\n'
reply: 'HTTP/1.1 200 OK\r\n'
header: date: Mon, 30 Mar 2020 20:37:44 GMT
header: content-type: application/json
header: content-length: 2511
header: x-envoy-upstream-service-time: 374
header: server: istio-envoy
header: x-request-id: e98f6ba5-5ad5-ab05-bf03-7c2cf6a0b73a
```

## Full HTTP Debugging

:::warning
Full debugging logging works best when dealing with relatively small responses.
:::

Interested in seeing both HTTP request and response payloads? Make sure you keep your `toolbelt` handy.

### Installing Requests Toolbelt

Start, by install the `requests` [toolbelt](https://toolbelt.readthedocs.io/en/latest/) library:

```bash
pip install requests-toolbelt
```

### Define Logging Hook

Now, add the following somewhere in your CDL Python SDK client code:

```python
from requests_toolbelt.utils import dump


def logging_hook(response, *args, **kwargs):
    data = dump.dump_all(response)
    print(data.decode('utf-8'))
```

### Invoke Logging Hook

Next, let's pass our `logging_hook` function to our `QueryService` object so we can watch the magic happen:

```python
qs = QueryService(
    credentials=Credentials(),
    enforce_json=True  # Attempts json.dumps() on responses
)
qs._httpclient.session.hooks["response"] = [logging_hook]
```

Brace yourself for the flood of data coming your way!

```console
< POST /query/v2/jobs HTTP/1.1
< Host: api.us.cdl.paloaltonetworks.com:443
< User-Agent: cortex-data-lake-python/2.0.0-a8
< Accept-Encoding: gzip, deflate
< Accept: application/json
< Connection: keep-alive
< x-envoy-force-trace:
< Authorization: Bearer ******
< Content-Length: 140
< Content-Type: application/json
<
< {"params":{"query":"SELECT * FROM `01234567890.firewall.traffic` LIMIT 1"},"clientType":"cortex-sdk-python","clientVersion":"0.1.0"}
> HTTP/1.1 201 Created
> date: Mon, 30 Mar 2020 20:59:43 GMT
> content-type: application/json
> content-length: 108
> x-envoy-upstream-service-time: 1626
> server: istio-envoy
> x-request-id: 4987a807-0553-ae9a-b596-e68df77adaef
>
{"jobId":"188ebe99-2c13-4e09-9680-1a12d7012fff","uri":"/query/v2/jobs/188ebe99-2c13-4e09-9680-1a12d7012fff"}
< GET /query/v2/jobResults/188ebe99-2c13-4e09-9680-1a12d7012fff?resultFormat=valuesDictionary HTTP/1.1
< Host: api.us.cdl.paloaltonetworks.com:443
< User-Agent: cortex-data-lake-python/2.0.0-a8
< Accept-Encoding: gzip, deflate
< Accept: application/json
< Connection: keep-alive
< x-envoy-force-trace:
< Authorization: Bearer ******
<

> HTTP/1.1 200 OK
> date: Mon, 30 Mar 2020 20:59:44 GMT
> content-type: application/json
> content-length: 150
> x-envoy-upstream-service-time: 93
> server: istio-envoy
> x-request-id: 84df1c8f-e512-a1ea-889b-2b1b839f8d17
>
{"jobId":"188ebe99-2c13-4e09-9680-1a12d7012fff","state":"RUNNING","resultFormat":"valuesDictionary","page":{"pageCursor":null,"result":{"data":null}}}
< GET /query/v2/jobResults/188ebe99-2c13-4e09-9680-1a12d7012fff?resultFormat=valuesDictionary HTTP/1.1
< Host: api.us.cdl.paloaltonetworks.com:443
< User-Agent: cortex-data-lake-python/2.0.0-a8
< Accept-Encoding: gzip, deflate
< Accept: application/json
< Connection: keep-alive
< x-envoy-force-trace:
< Authorization: Bearer ******
<

> HTTP/1.1 200 OK
> date: Mon, 30 Mar 2020 20:59:45 GMT
> content-type: application/json
> content-length: 2511
> x-envoy-upstream-service-time: 354
> server: istio-envoy
> x-request-id: 5e38f030-1c0e-a904-831f-5ea6f8817b1b
>
{"jobId":"188ebe99-2c13-4e09-9680-1a12d7012fff","state":"DONE","resultFormat":"valuesDictionary","rowsInPage":1,"rowsInJob":1,"page":{"pageCursor":null,"result":{"data":[{"vendor_name":"Palo Alto Networks","log_source":"firewall","log_source_id":"007251000070976","log_source_name":"gw","customer_id":"117270019","log_time":1570523025000000,"log_type":{"id":0,"value":"traffic"},"sub_type":{"id":0,"value":"start"},"source_ip":{"value":"10.154.1.20","hex":"00000000000000000000ffff0a9a0114"},"source_port":40100,"dest_ip":{"value":"212.180.157.132","hex":"00000000000000000000ffffd4b49d84"},"dest_port":2401,"protocol":{"id":6,"value":"tcp"},"action_source":{"id":1,"value":"from-policy"},"bytes_total":304,"bytes_received":62,"bytes_sent":242,"ep_assoc_id":0,"chunks_total":0,"chunks_received":0,"chunks_sent":0,"packets_total":4,"packets_received":1,"packets_sent":3,"session_start_time":1569715458000000,"total_time_elapsed":0,"session_end_reason":{"id":1,"value":"n-a"},"traffic_flags":0,"url_category":{"id":0,"value":"any"},"action":{"id":0,"value":"allow"},"action_flags":-9223372036854775808,"app":"cvs","app_category":"business-systems","characteristics_of_app":["4","5","8"],"dg_hier_level_1":16,"dg_hier_level_2":0,"dg_hier_level_3":0,"dg_hier_level_4":0,"dest_location":"PL","is_exported":false,"is_forwarded":true,"from_zone":"TapZone","http2_connection":0,"inbound_if":{"value":"ethernet","hex":1138183110656},"inbound_if_details":{"unit":0,"type":{"id":0,"value":"ethernet"},"slot":1,"port":9},"is_saas_app":false,"is_dup_log":false,"is_prisma_branch":false,"is_prisma_mobile":false,"log_set":"LCaaS","nat_dest_port":0,"nat_dest":{"value":"0.0.0.0","hex":"00000000000000000000ffff00000000"},"nat_source_port":0,"nat_source":{"value":"0.0.0.0","hex":"00000000000000000000ffff00000000"},"non_standard_dest_port":0,"outbound_if":{"value":"ethernet","hex":1138183110656},"outbound_if_details":{"unit":0,"type":{"id":0,"value":"ethernet"},"slot":1,"port":9},"parent_session_id":0,"parent_start_time":0,"count_of_repeats":1,"risk_of_app":3,"rule_matched":"taplog","rule_matched_uuid":"1a6b6085-b0fb-4f0b-872a-a5b0f5e7b6cc","sanctioned_state_of_app":false,"sequence_no":483523296,"session_id":694888,"source_location":"10.0.0.0-10.255.255.255","app_sub_category":"general-business","technology_of_app":"client-server","time_generated":1569715459000000,"to_zone":"TapZone","tunnel":{"id":0,"value":"N/A"},"tunneled_app":"untunneled","tunnelid_imsi":0,"users":"10.154.1.20","vsys_id":1,"vsys":"vsys1"}]}}}
```

<img alt="Whoa" src='/img/whoa.jpg' />

### Conclusion

So, there you have it - probably all the debug logging you'll ever need, and somehow more.

## Distributed Tracing

:::info
For more information on Envoy distributed tracing, see the following [documentation](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/observability/tracing).
:::

Distributed tracing allows developers to track call flows in order to better understand serialization, parallelism, sources of latency and, most of all, to aid in troubleshooting. Luckily, the Cortex Data Lake API and the CDL Python SDK come equipped with cross-application tracing capabilities.

The CDL API implements tracing internally, by default. Although it's possible to (painfully?) correlate your client calls with backend calls, sometimes it's preferred to force them to appear in your debug logs so you can refer to them directly. This could, potentially, help speed up the troubleshooting process - should an issue arise that requires our backend engineers to investigate.

### Force Tracing

Ok, let's cut to the chase. Here's how to force tracing using the CDL Python SDK:

```python
qs = QueryService(force_trace=True, credentials=c)
```

That's it, really. Now, you'll notice your response headers all include an `x-request-id`, that can be used to reference a particular call.
