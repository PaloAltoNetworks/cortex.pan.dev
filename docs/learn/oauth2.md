---
id: oauth2
title: OAuth 2.0
hide_title: true
sidebar_label: OAuth 2.0
description: OAuth 2.0
keywords:
  - oauth2
  - credentials
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::info
The OAuth 2.0 authorization code flow is recommended for multi-tenant, SaaS applications capable of storing and maintaining secrets. It is the only OAuth 2.0 flow supported by Cortex hub today. For more information, visit the following resource: https://oauth.net/2/grant-types/authorization-code
:::

## Overview

The OAuth 2.0 authorization code flow is a commonly employed protocol for allowing owners to delegate access to their protected resources (typically to a third-party application). Applications available on the [Cortex hub](https://apps.paloaltonetworks.com) are required to implement this authorization flow, such that users are prompted to consent to allow access to their Cortex Data Lake.

See the [API Explorer Authorization](apiexplorer_authorization.md#authorize-api-explorer) guide for a practical example.

## Registration

As you develop your Cortex Data Lake application/integration, you will work with Palo Alto Networks
personnel to _register_ your app. Registration is a manual process in which you describe your app to Palo Alto Networks, in what is known as an app manifest. The app manifest includes (but is not limited to) the following:

- App name and description
- Marketing material and logo
- Support and legal URLs
- Base URL and Redirect URIs

:::info
Found in the manifest file, the app `name`, `app_base_url`, `scopes` and `auth_redirect_uris` are essential components of the OAuth 2.0 authorization code flow.
:::

## Considerations

Minimally, the app should provide two public URLs:

- `app_base_url` – primary URL for accessing the application
- `auth_redirect_uris` – One or more OAuth 2.0 redirect URLs (wildcards are supported)

Additionally, the app should be capable of storing its `client_id` and `client_secret`, privately and securely.

:::warning
End users should not, by any means, be able to access/read the `client_id` and `client_secret`.

- The `client_id` and `client_secret` should not be shared with end users.
- Apps or agents deployed on-premise should not store, or make available to end users, the `client_id` and `client_secret`.

:::

## High-level Overview

0. The application is registered and activated.
1. The application redirects the browser to the authorization page, where the user authenticates with the authorization server.
1. The user consents to granting the third-party app access to their CDL.
1. The browser receives an authorization `code` from the authorization server.
1. The application receives the authorizatino `code` from the browser (via callback)
1. The application uses the authorizaion `code` to request a `refresh_token` and `access_token` from the authorization server.
1. The application securely stores the `refresh_token` and `access_token` until the end user needs them to perform authenticated API requests.

## Detailed Overview

### Registration

1. App developer authors an application manifest file.
2. Palo Alto Networks registers the application manifest into the Cortex hub.
3. Palo Alto Networks shares the `client_id` and `client_secret` with the app developer.

### Activation

The user initiates and completes the activation process by clicking the `Activate` button on the Cortex hub. This creates an instance of the app and assigns a unique `instance_id`.

<img alt="Activation" src={useBaseUrl('img/cortex_activation.gif')} />

### Redirect to `app_base_url`

When a user clicks on an app icon/tile they will be redirected to the URL specified as the `app_base_url` value in the manifest file. The Cortex hub will automatically append a URL query argument named `params` to the base URL, which will include fields needed to initiate and complete the OAuth 2.0 exchange.

**App URL format**: `app_base_url?params=<base64-encoded URL query arguments>`

Example:

```console
https://app.apiexplorer.rocks/login?params=aW5zdGFuY2VfaWQ9MzE0Mzg2MzY5MzcwNjI1NzEzNyZpbnN0YW5jZV9uYW1lPUFub3RoZXIlMjB1c2VsZXNzJTIwaW5zdGFuY2UmcmVnaW9uPWFtZXJpY2FzJmxzbj0wMTc5MDAwNDUyOSZkZXNjcmlwdGlvbj1Bbm90aGVyJTIwdXNlbGVzcyUyMGluc3RhbmNl
```

The base64-encoded `params` value is an encoded URL query argument structure that contains the following fields and values:

- `instance_id`
- `instance_name`
- `region`
- `lsn`
- `description`

:::note
If the application manifest included developer-defined fields, those fields will also appear in the base64-encoded `params`.
:::

### Authorization

:::note
This step assumes the user has already authenticated with the application (if required). It is up to the app developer to decide whether the authorization flow should be triggered manually (by the user) or occur immediately following authentication.
:::

(repeat of high-level overview in greater detail)

1. The application redirects the browser to the authorization page, where the user authenticates with the authorization server.

Example authorization redirect URL:

```console
https://identity.paloaltonetworks.com/as/authorization.oauth2?response_type=code&client_id=<app client id>&scope=<app scopes>&redirect_uri=<URL>&instance_id=<instance id>&state=<nonce>
```

The parameters will include:

- `response_type` – This should typically be "code"
- `client_id` – The app `client_id` assigned by Palo Alto Networks when app is registered
- `scope` – The permissions requested by the user/app
- `redirect_uri` – The callback URL the browser should redirect to after the user consents
- `instance_id` – The app instance ID
- `state` – An opaque value used by the client to help detect/prevent cross-site request forgery

2. The user consents to granting the third-party app access to their CDL.
3. The browser receives an authorization `code` from the authorization server.
4. The application receives the authorizatino `code` from the browser (via callback).

**Callback URL format**: `https://<redirect_uri>/?code=<authorization code>&state=<state from request>`

The callback query arguments will include:

- `code` – The authorization code the app can exchange for a `refresh_token` and `access_token`. Note that the lifetime of the authorization code is limited.
- `state` – The value of the original state passed in the request. Always verify this value matches the value passed in the original request.

5. The application uses the authorizaion `code` to request a `refresh_token` and `access_token` from the authorization server.

**The app/client supplies:**

- The authorizatrion `code` returned by the AppFramework OAuth2 authorization server
- `client_id` and `client_secret` provided by Palo Alto Networks when the app is registered

**`RequestToken` API returns:**

- `access_token` – Used to access the Cortex Data Lake API
- `refresh_token` – Used to refresh the `access_token`

6. The application securely stores the `refresh_token` and `access_token` until the end user needs them to perform authenticated API requests.

<img alt="Authorization" src={useBaseUrl('img/cortex_authorization.gif')} />
