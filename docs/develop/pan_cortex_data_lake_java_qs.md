---
id: pan_cortex_data_lake_java_qs
title: Data Lake Quickstart
sidebar_label: Data Lake Quickstart
---

[![GitHub page](https://img.shields.io/badge/GitHub-Repo-brightgreen?style=for-the-badge&logo=github)](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-java) ![JAVA](https://img.shields.io/badge/lang-JAVA-ff69b4?style=for-the-badge)

> The following guide will walk you through installing the package `com.paloaltonetworks.cortex.data_lake`, a powerful class collection capable of supporting your next Cortex™ app, integration or automation project.

## Installing from Maven Central repository

TDB

## Installing from binaries

Pre-compiled binaries are available in the [`/target` folder](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-java/tree/master/target) of the GitHub repo. Check sha512 signature before trusting pre-build binaries.

## Cortex Data Lake API Authorization

The classes in the package `com.paloaltonetworks.cortex.data_lake` require an object that implements the `Function<Boolean, Map.Entry<String, String>>` functional interface.

The `Entry` returned is expected to behave as:
* `getKey()`: Expected to return the Cortex Data Lake API end point (region)
* `getValue()`: Expected to return a valid OAuth2 authorization access_token value.

The functional method (`apply(Boolean force)`) can return `null` instead of an `Entry` object only if `force` is either `null` or `false`. In such a case a `null` response can be interpreted by the caller as a signal that the latest `Entry` returned is still valid.

A collection of objects implementing the interface is available in the package `com.paloaltonetworks.cortex.hub` [See Hub Quickstart](/docs/develop/pan_cortex_hub_java_qs)

#### Getting started with a Developer Token

Maybe the easiest way to get started is by leveraging a Developer Token provided by the API Explorer's Token Redemption Service. Just define the needed environmental variables ...

```bash
export PAN_DEVELOPER_TOKEN=<your_developer_token>
export PAN_DEVELOPER_TOKEN_PROVIDER=https://app.apiexplorer.rocks/request_token
```

...and then instantiate an object of the [`HubCredentialsDevToken`](https://github.com/PaloAltoNetworks/pan-cortex-hub-java/blob/master/src/main/java/com/paloaltonetworks/cortex/hub/HubCredentialsDevToken.java) class.

```java
import com.paloaltonetworks.cortex.hub.HubCredentialsDevToken

var cred = HubCredentialsDevToken.factory();
```

If you want to verify the object is working as expected then just call its `apply(Boolean force)` method with the `true` value and expect it to return a valid API Endpoint and OAuth2 access token.

```java
System.out.println(cred.apply(true));
```

## Basic usage

> The examples below assume the existence of a constant named `cred` containing an object implementing the `Function<Boolean, Map.Entry<String, String>>` functional interface.

### Querying Logging Service

1. Begin by importing the [`QueryServiceClient` class](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-java/blob/master/src/main/java/com/paloaltonetworks/cortex/data_lake/QueryServiceClient.java):

```java
import com.paloaltonetworks.cortex.data_lake.QueryServiceClient
```

2. Next, let's construct an object instance:

```java
var qsc = new QueryServiceClient(cred);
```

3. Now, let's define the SQL sentence we want to execute:

```java
var sqlCmd = "SELECT source_ip, dest_ip from `<tenant_id>.firewall.traffic` LIMIT 5";
```

4. Pass the SQL sentence to the `QueryServiceClient` object to receive an iterator object:

```java
var iter = qsc.iterable(sqlCmd);
```

5. Now, let's print the execution results.

```java
for (var item : iter) System.out.println(item);
```

Example output:

```text
INFO: Updated authentication header for default data lake
paloaltonetworks.com
{"source_ip":{"value":"10.154.3.55","hex":"00000000000000000000ffff0a9a0337"},"dest_ip":{"value":"174.137.113.120","hex":"00000000000000000000ffffae897178"}}
{"source_ip":{"value":"10.154.1.46","hex":"00000000000000000000ffff0a9a012e"},"dest_ip":{"value":"58.19.16.252","hex":"00000000000000000000ffff3a1310fc"}}
{"source_ip":{"value":"10.154.1.46","hex":"00000000000000000000ffff0a9a012e"},"dest_ip":{"value":"58.19.16.252","hex":"00000000000000000000ffff3a1310fc"}}
{"source_ip":{"value":"10.154.1.46","hex":"00000000000000000000ffff0a9a012e"},"dest_ip":{"value":"58.19.16.252","hex":"00000000000000000000ffff3a1310fc"}}
{"source_ip":{"value":"10.154.3.96","hex":"00000000000000000000ffff0a9a0360"},"dest_ip":{"value":"123.138.238.43","hex":"00000000000000000000ffff7b8aee2b"}}
```

### Code reference

Previous example code in just one block (the cred variable is supposed to exist)

```java
import com.paloaltonetworks.cortex.data_lake.QueryServiceClient

var sqlCmd = "SELECT source_ip, dest_ip from `<tenant_id>.firewall.traffic` LIMIT 5";
var qsc = new QueryServiceClient(cred);

for (var item : qsc.iterable(sqlCmd)) System.out.println(item);
``` 