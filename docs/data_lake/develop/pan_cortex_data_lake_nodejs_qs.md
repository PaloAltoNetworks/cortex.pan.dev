---
id: pan_cortex_data_lake_nodejs_qs
title: Data Lake Quickstart
sidebar_label: Data Lake Quickstart
description: Getting started with the NodeJS CDL library
keywords:
  - cortex data lake
  - cortex
  - api
  - hub
  - nodejs
---

[![GitHub page](https://img.shields.io/badge/GitHub-Repo-brightgreen?style=for-the-badge&logo=github)](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs) ![TypeScript](https://img.shields.io/badge/lang-TypeScript-blue?style=for-the-badge) ![JavaScript](https://img.shields.io/badge/lang-JavaScript-orange?style=for-the-badge)

> The following guide will walk you through installing `@paloaltonetworks/pan-cortex-data-lake`, a powerful package capable of supporting your next Cortex™ app, integration or automation project.

## Installing with npm

You can add the `@paloaltonetworks/pan-cortex-data-lake` dependency in your project directly from the NPMJS repository

```bash
npm i @paloaltonetworks/pan-cortex-data-lake
```

## Installing from source

In case you need to play with a pre-release version of the package then you can add dependencies from the GitHub public repo.

```bash
npm i git://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs.git
```

Source code is written in TypeScript and the build process produces type
definition files which means you can leverage strongly type and code
auto-complete features.

```ts
import * as cortex from "@paloaltonetworks/pan-cortex-data-lake";
```

## Cortex Data Lake API Authorization

The classes in the package `@paloaltonetworks/pan-cortex-data-lake` require an object that implements the [Credentials Interface](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/doc/interfaces/credentials.md).

A collection of objects implementing the interface is available in the package `@paloaltonetworks/pan-cortex-hub` [See Hub Quickstart](/docs/data_lake/develop/pan_cortex_hub_nodejs_qs)

#### Getting started with a Developer Token

Maybe the easiest way to get started is by leveraging a Developer Token provided by the API Explorer's Token Redemption Service. Just define the needed environmental variables ...

```bash
export PAN_DEVELOPER_TOKEN=<your_developer_token>
export PAN_DEVELOPER_TOKEN_PROVIDER=https://app.apiexplorer.rocks/request_token
```

...and then instantiate an object of the [`DevTokenCredentials`](https://github.com/PaloAltoNetworks/pan-cortex-hub-nodejs/blob/master/doc/classes/devtokencredentials.md) class.

```javascript
const hub = require("@paloaltonetworks/pan-cortex-hub");
const cred = hub.DevTokenCredentials.factory();
```

If you want to verify the object is working as expected then just call its `getToken()` method with the `true` value and expect it to return a valid OAuth2 access token.

```javascript
cred.getToken().then(console.log);
```

## Basic usage

> The examples below assume the existence of a constant named `cred` containing an object implementing the [Credentials Interface](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/doc/interfaces/credentials.md).

### Querying Logging Service

1. Begin by importing the package `@paloaltonetworks/pan-cortex-data-lake`:

```javascript
const dl = require("@paloaltonetworks/pan-cortex-data-lake");
```

2. Next, let's construct a [`QueryServiceClient`](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-nodejs/blob/master/doc/classes/queryserviceclient.md) instance:

```javascript
const qsc = dl.QueryServiceClient.factory({ cortexDefCredentials: cred });
```

3. Now, let's define the SQL sentence we want to execute:

```javascript
const sqlCmd =
  "SELECT source_ip, dest_ip from `<tenant_id>.firewall.traffic` LIMIT 5";
```

4. Pass the SQL sentence to the `QueryServiceClient` object to receive an iterator object:

```javascript
const iter = qsc.iterator(sqlCmd);
```

5. Now, let's print the execution results (notice the ES2018 `for await` syntax executed inside an async lambda expression)

```javascript
(async () => {
  for await (const page of iter2) console.log(page);
})();
```

Example output:

```text
2/25/2020, 13:17:28 CORTEX_SDK initial autorization header for default data lake
2/25/2020, 13:17:29 CORTEX_SDK Created new HTTP2 session to cortex-prd1-api.us.cdl.paloaltonetworks.com
[
  {
    source_ip: {
      value: '192.168.110.131',
      hex: '00000000000000000000ffffc0a86e83'
    },
    dest_ip: { value: '70.48.1.139', hex: '00000000000000000000ffff4630018b' }
  },
  {
    source_ip: { value: '10.154.1.5', hex: '00000000000000000000ffff0a9a0105' },
    dest_ip: { value: '124.43.145.45', hex: '00000000000000000000ffff7c2b912d' }
  },
  {
    source_ip: {
      value: '10.154.246.167',
      hex: '00000000000000000000ffff0a9af6a7'
    },
    dest_ip: { value: '69.63.176.188', hex: '00000000000000000000ffff453fb0bc' }
  },
  {
    source_ip: { value: '10.154.9.40', hex: '00000000000000000000ffff0a9a0928' },
    dest_ip: {
      value: '123.193.27.118',
      hex: '00000000000000000000ffff7bc11b76'
    }
  },
  {
    source_ip: {
      value: '10.154.196.169',
      hex: '00000000000000000000ffff0a9ac4a9'
    },
    dest_ip: {
      value: '121.243.224.142',
      hex: '00000000000000000000ffff79f3e08e'
    }
  }
]
```

### Code reference

Previous example code in just one block (the cred variable is supposed to exist)

```javascript
const dl = require("@paloaltonetworks/pan-cortex-data-lake");
const sqlCmd =
  "SELECT source_ip, dest_ip from `<tenant_id>.firewall.traffic` LIMIT 5";

async function worker(iter) {
  for await (const page of iter) console.log(page);
}

const qsc = dl.QueryServiceClient.factory({ cortexDefCredentials: cred });
worker(qsc.iterator(sqlCmd));
```
