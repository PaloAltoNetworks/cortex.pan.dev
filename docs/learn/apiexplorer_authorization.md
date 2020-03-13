---
id: apiexplorer_authorization
title: Authorization
hide_title: true
sidebar_label: Authorization
description: Authorizing API Explorer
keywords:
  - apiexplorer
  - api
  - explorer
  - authorization
  - oauth2
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::info
API Explorer ships with full OAuth2 support, enabling you to easily delegate access to _your_ CDL. The following will guide you through the steps needed to complete the authorization flow so you can start exploring your data.
:::

## Activation

:::note
The following assumes the user has gone through the steps of [activating a Cortex Data Lake](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/cortex-data-lake-getting-started/get-started-with-cortex-data-lake/license-activation.html).
:::

### Login to Cortex hub

1. Navigate to https://apps.paloaltonetworks.com.
2. Authenticate (via SSO) using your Palo Alto Networks support credentials.

### Activate API Explorer

1. Locate API Explorer in the "Explore Apps from Partners" section.
2. Click the `Activate` button and complete the steps.

<img alt="Activate API Explorer" src={useBaseUrl('img/cortex_activation.gif')} />

## Authorize API Explorer

1. Click the API Explorer app tile which will redirect you to API Explorer.
2. Complete SSO authentication.
3. Click the **"New Instance Available!"** ⚠️ button in the navigation bar.
4. Click the `Authorize` button next to your app instance.
5. After reviewing the selected options, click the `Authorize` button to execute the OAuth2 exchange.
6. At the **"Request for Approval"** page, click `Allow` if you consent to granting API Explorer access to your CDL. Doing so will complete the authorization flow and redirect you back to API Explorer.

<img alt="Authorize API Explorer" src={useBaseUrl('img/cortex_authorization.gif')} />
<br></br><br></br>

:::tip
Now that you've granted API Explorer access to your CDL, use Query Explorer to begin your exploration!
:::
