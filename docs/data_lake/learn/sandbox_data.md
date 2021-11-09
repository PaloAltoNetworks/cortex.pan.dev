---
id: sandbox_data
title: Sandbox
hide_title: true
sidebar_label: Sandbox
description: Available data in CDL sandbox
keywords:
  - sandbox
  - apiexplorer
---

:::info
The following list represents the data available in the API Explorer Developer Relations sandbox. The sample, simulated data is derived from the following sources:

- Traffic generators
- Replayed PCAP files
- User-ID scripts

The Developer Relations team curates and maintains the available data with the goal of (eventually) reaching 100% coverage.

:::

## firewall.traffic

Traffic logs contain entries for the end of each network session, as well as (optionally) the start of a network session. A network session can contain multiple messages sent and received by two communicating
endpoints.

```sql
firewall.traffic
```

## firewall.threat

Threat logs contain entries for when network traffic matches one of the security profiles attached to a next-
generation firewall security rule.

```sql
firewall.threat
```

## firewall.eal

EALs are Enhanced Application Logs. The data contained in these logs provide deeper analysis of network
traffic than is available from ordinary traffic logs.

```sql
firewall.eal
```

## firewall.file_data

Represents a file transfer across the network. These log records can represent either a successful transfer,
or an attempted transfer that was blocked by the firewall.

```sql
firewall.file_data
```

## firewall.url

URL logs are written by next-generation firewalls whenever network traffic matches a URL Filtering Profile
attached to one or more security rules. For example, the firewall generates a log if a rule blocks access to
specific web sites or web site categories, or the firewall is configured with a rule to generate an alert when a user accesses a web site.

```sql
firewall.url
```

## firewall.userid

User ID logs contain IP address-to-username mappings, authentication timestamps, the sources of the IP-
to-username mappings, and so forth.

```sql
firewall.userid
```
