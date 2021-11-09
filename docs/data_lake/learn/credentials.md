---
id: credentials
title: Overview
hide_title: true
sidebar_label: Overview
description: Overview of Credentials
keywords:
  - credentials
  - oauth2
---

:::info
The Cortex Data Lake API implements OAuth 2.0 for delegating access to the Query Service.

The libraries and SDKs published by DevRel come equipped with OAuth 2.0 support to ease the process of:

- **Generating** the authorization URL
- **Exchanging** and authorization code for tokens (authorization code grant)
- **Refreshing** tokens
- **Revoking** tokens
- **Token** caching
- **Using** a custom credentials store or provider

:::

## Credentials Overview

Today, there are two types of credentials supported:

- OAuth 2.0 credentials (`client_id`, `client_secret` and `refresh_token`)
- Developer Tokens (obtained from API Explorer)

The primary difference between the two is that the first requires a user-agent (web app) capable of performing the OAuth 2.0 authorization code grant flow, whereas the second empowers developers to quickly get started, by leveraging [API Explorer’s](/docs/data_lake/learn/apiexplorer_intro) built-in token redemption service.

## OAuth 2.0 Credentials

If you are looking to build your own multi-tenant web application, work with the Developer Relations team to register your app manifest in order to receive the credentials needed to perform the authorization flow: `client_id` and `client_secret`.

A successful authorization will return a `refresh_token` that can be combined with the `client_id` and `client_secret` to refresh your `access_token` whenever necessary. The CDL libraries and SDKs are capable of abstracting the refresh process, such that auto-refresh is performed, as needed, prior to each API request.

## Developer Tokens

Developer Tokens is a new concept that enables developers to quickly get started by offloading the OAuth 2.0 authorization code grant flow to API Explorer, in exchange for a `Developer Token`. You can think of Developer Tokens as "temporary access tokens."

<a className="button button--outline button--primary" href="/docs/data_lake/learn/developer_tokens">
Learn More
</a>
