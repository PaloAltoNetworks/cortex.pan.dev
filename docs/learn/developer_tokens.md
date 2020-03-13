---
id: developer_tokens
title: Developer Tokens
hide_title: true
sidebar_label: Developer Tokens
description: Overview of developer tokens
keywords:
  - developer tokens
  - apiexplorer
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::warning
A `Developer Token` can be potentially used to access your sensitive CDL data. It it your responsibility to take the necessary precautions to keep it safe, private and secure.

It it not recommended to set the expiration to "Never."
:::

:::info
Developer Tokens is an authentication mechanism that enables developers to quickly get started by offloading the OAuth 2.0 authorization code grant flow to API Explorer.
:::

## Overview

What exactly is a `Developer Token` anyway? In a nutshell, a `Developer Token` is used to authenticate with API Explorer’s built-in token redemption service. It’s intended to eliminate the need to acquire and store a `client_id`, `client_secret` and `refresh_token` in your own credentials store, which could be risky without implementing the proper security best practices.

## Generating a Developer Token

:::note
The following guide assumes the existence of an authorized API Explorer instance. For details, see the [authorization guide](apiexplorer_authorization.md).
:::

1. Click the key icon corresponding with your authorized instance.

<img alt="Generate Developer Token Button" src={useBaseUrl('img/generate_devtoken_button.png')} />

2. Review the **NOTICE** and select an appropriate expiration for your `Developer Token`.
3. Click the `Generate` button to generate your `Developer Token`. Note that it will only be displayed once, so be sure to copy and keep it safe.

<img alt="Developer Token" src={useBaseUrl('img/developer_token.gif')} />

## Using a Developer Token

### cURL

The following snippet will return an `access_token` that can be used to send authenticated requests to the Cortex Data Lake API.

```bash
export PAN_DEVELOPER_TOKEN=<your_developer_token>

curl -H "Authorization: Bearer $PAN_DEVELOPER_TOKEN" -X POST https://app.apiexplorer.rocks/request_token
```

For examples on how to programmatically use a `Developer Token` see the [Cortex Data Lake Quickstart](/docs/develop/quickstart) guide.
