---
id: about_cdl
title: About Cortex Data Lake
hide_title: true
sidebar_label: CDL API
description: Overview of Cortex Data Lake
keywords:
  - cortex data lake
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note
Please consult the official [Cortex Data Lake Getting Started Guide](https://drive.google.com/drive/u/0/folders/1dGCi69qYOTDPwr4pqd8slaMs3vINfao_) for additional background, details and explanations.
:::

## Overview

The Cortex Data Lake API is a REST API with services and endpoints capable of accepting and returning `JSON` payloads/responses. The first of these services, `Query Service`, can be used to store and query logging service data. See the [CDL Schema Reference](#) guide for detailed descriptions of available log types.

**Example endpoint**: `/query/v2/jobs`

The format for API endpoints is:

```console
/<service>/<version>/<resource>[/<action>]
```

where:

- `service` is the relevant service's URI name. For example, `query`.
- `version` identifies the API's version number, e.g. `v2`.
- `resource` is one or more path elements that identify the resource the API operates upon.
- `action` is optionally used whenever the request's HTTP method is not sufficient to identify the
  operation you want to perform on the resource.

## Region Base URLs

<Tabs
defaultValue='americas'
values={[
{ label: 'americas', value: 'americas', },
{ label: 'europe', value: 'europe', },
{ label: 'uk', value: 'uk', },
]
}>
<TabItem value="americas">

```bash
https://api.us.cdl.paloaltonetworks.com
```

</TabItem>

<TabItem value="europe">

```bash
https://api.nl.cdl.paloaltonetworks.com
```

</TabItem>

<TabItem value="uk">

```bash
https://api.uk.cdl.paloaltonetworks.com
```

\* Limited availability

</TabItem>
</Tabs>
