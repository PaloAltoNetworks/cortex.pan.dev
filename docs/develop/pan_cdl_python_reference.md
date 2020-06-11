---
id: pan_cdl_python_reference
title: API Reference
sidebar_label: API Reference
description: Getting started with the Java CDL library
keywords:
  - cortex data lake
  - cortex
  - api
  - hub
  - java
---

<a name=".pan_cortex_data_lake"></a>

## pan_cortex_data_lake

Main package for cortex.

<a name=".pan_cortex_data_lake.httpclient"></a>

## pan_cortex_data_lake.httpclient

HTTP client wrapper for the **excellent** `requests` library.

<a name=".pan_cortex_data_lake.httpclient.HTTPClient"></a>

### HTTPClient

```python
class HTTPClient(object)
```

HTTP client for the Cortex™ REST API

<a name=".pan_cortex_data_lake.httpclient.HTTPClient.__init__"></a>

#### \_\_init\_\_

```python
 | __init__(**kwargs)
```

Persist Session() attributes and implement connection-pooling.

Built on top of the `Requests` library, `HTTPClient` is an
abstraction layer for preparing and sending HTTP `requests` to the
Application Framework REST APIs and handling `responses`. All
`Requests` are prepared as `Session` objects, with the option
to persist certain attributes such as `cert`, `headers`,
`proxies`, etc. `HTTPAdapter` is implemented to enable more
granular performance and reliability tuning.

**Arguments**:

- `auto_refresh` _bool_ - Perform token refresh prior to request if `access_token` is `None` or expired. Defaults to `True`.
- `auto_retry` _bool_ - Retry last failed HTTP request following a token refresh. Defaults to `True`.
- `credentials` _Credentials_ - :class:`~pan_cortex_data_lake.credentials.Credentials` object. Defaults to `None`.
- `enforce_json` _bool_ - Require properly-formatted JSON or raise :exc:`~pan_cortex_data_lake.exceptions.CortecError`. Defaults to `False`.
- `force_trace` _bool_ - If `True`, forces trace and forces `x-request-id` to be returned in the response headers. Defaults to `False`.
- `port` _int_ - TCP port to append to URL. Defaults to `443`.
- `raise_for_status` _bool_ - If `True`, raises :exc:`~pan_cortex_data_lake.exceptions.HTTPError` if status_code not in 2XX. Defaults to `False`.
- `url` _str_ - URL to send API requests to - gets combined with `port` and :meth:`~request` `path` parameter. Defaults to `None`.

**Arguments**:

- `**kwargs` - Supported :class:`~requests.Session` and :class:`~requests.adapters.HTTPAdapter` parameters.

<a name=".pan_cortex_data_lake.httpclient.HTTPClient.request"></a>

#### request

```python
 | request(**kwargs)
```

Generate HTTP request using given parameters.

The request method prepares HTTP requests using class or
method-level attributes/variables. Class-level attributes may be
overridden by method-level variables offering greater
flexibility and efficiency.

**Arguments**:

- `enforce_json` _bool_ - Require properly-formatted JSON or raise :exc:`~pan_cortex_data_lake.exceptions.HTTPError`. Defaults to `False`.
- `path` _str_ - URI path to append to URL. Defaults to `empty`.
- `raise_for_status` _bool_ - If `True`, raises :exc:`~pan_cortex_data_lake.exceptions.HTTPError` if status_code not in 2XX. Defaults to `False`.

**Arguments**:

- `**kwargs` - Supported :class:`~requests.Session` and :class:`~requests.adapters.HTTPAdapter` parameters.

**Returns**:

- `requests.Response` - Requests Response() object

<a name=".pan_cortex_data_lake.quer"></a>

## pan_cortex_data_lake.quer

Interact with the Cortex Query Service API.

The Query Service is a Palo Alto Networks cloud service which allows
for the storage and retrieval of data stored in the Cortex Data Lake.
Any type of textual data can be stored in the Cortex Data Lake. Palo
Alto Networks firewalls and software can write data to this service, as
can the software and services created by Palo Alto Network's various
partners.

**Examples**:

Refer to the examples provided with this library.

<a name=".pan_cortex_data_lake.quer.QueryService"></a>

### QueryService

```python
class QueryService(object)
```

A Cortex™ Query Service instance.

<a name=".pan_cortex_data_lake.quer.QueryService.__init__"></a>

#### \_\_init\_\_

```python
 | __init__(**kwargs)
```

**Arguments**:

- `session` _HTTPClient_ - :class:`~cortex.httpclient.HTTPClient` object. Defaults to `None`.
- `url` _str_ - URL to send API requests to. Later combined with `port` and :meth:`~request` `endpoint` parameter.

**Arguments**:

- `**kwargs` - Supported :class:`~cortex.httpclient.HTTPClient` parameters.

<a name=".pan_cortex_data_lake.quer.QueryService.cancel_job"></a>

#### cancel_job

```python
 | cancel_job(job_id=None, **kwargs)
```

Cancel a query job.

**Arguments**:

- `job_id` _str_ - Specifies the ID of the query job.
- `**kwargs` - Supported :meth:`~pan_cortex_data_lake.httpclient.HTTPClient.request` parameters.

**Returns**:

- `requests.Response` - Requests Response() object.

<a name=".pan_cortex_data_lake.quer.QueryService.create_query"></a>

#### create_query

```python
 | create_query(job_id=None, query_params=None, **kwargs)
```

Create a search request.

When submission is successful, http status code of 201 (Created)
is returned with a 'jobId' in response. Specifying a 'jobId' is
optional.

**Arguments**:

- `job_id` _str_ - Specifies the ID of the query job. (optional)
- `query_params` _dict_ - Query parameters.
- `**kwargs` - Supported :meth:`~pan_cortex_data_lake.httpclient.HTTPClient.request` parameters.

**Returns**:

- `requests.Response` - Requests Response() object.

<a name=".pan_cortex_data_lake.quer.QueryService.get_job"></a>

#### get_job

```python
 | get_job(job_id=None, **kwargs)
```

Get specific job matching criteria.

**Arguments**:

- `job_id` _str_ - Specifies the ID of the query job.
- `params` _dict_ - Payload/request dictionary.
- `**kwargs` - Supported :meth:`~pan_cortex_data_lake.httpclient.HTTPClient.request` parameters.

**Returns**:

- `requests.Response` - Requests Response() object.

<a name=".pan_cortex_data_lake.quer.QueryService.get_job_results"></a>

#### get_job_results

```python
 | get_job_results(job_id=None, max_wait=None, offset=None, page_cursor=None, page_number=None, page_size=None, result_format=None, **kwargs)
```

Get results for a specific job_id.

**Arguments**:

- `job_id` _str_ - Specifies the ID of the query job.
- `max_wait` _int_ - How long to wait in ms for a job to complete. Max 2000.
- `offset` _int_ - Along with pageSize, offset can be used to page through result set.
- `page_cursor` _str_ - Token/handle that can be used to fetch more data.
- `page_number` _int_ - Return the nth page from the result set as specified by this parameter.
- `page_size` _int_ - If specified, limits the size of a batch of results to the specified value. If un-specified, backend picks a size that may provide best performance.
- `result_format` _str_ - valuesArray or valuesJson.
- `**kwargs` - Supported :meth:`~pan_cortex_data_lake.httpclient.HTTPClient.request` parameters.

**Returns**:

- `requests.Response` - Requests Response() object.

<a name=".pan_cortex_data_lake.quer.QueryService.iter_job_results"></a>

#### iter_job_results

```python
 | iter_job_results(job_id=None, max_wait=None, offset=None, page_cursor=None, page_number=None, page_size=None, result_format=None, **kwargs)
```

Retrieve results iteratively in a non-greedy manner using scroll token.

**Arguments**:

- `job_id` _str_ - Specifies the ID of the query job.
- `max_wait` _int_ - How long to wait in ms for a job to complete. Max 2000.
- `offset` _int_ - Along with pageSize, offset can be used to page through result set.
- `page_cursor` _str_ - Token/handle that can be used to fetch more data.
- `page_number` _int_ - Return the nth page from the result set as specified by this parameter.
- `page_size` _int_ - If specified, limits the size of a batch of results to the specified value. If un-specified, backend picks a size that may provide best performance.
- `result_format` _str_ - valuesArray or valuesJson.
- `**kwargs` - Supported :meth:`~pan_cortex_data_lake.httpclient.HTTPClient.request` parameters.

**Yields**:

- `requests.Response` - Requests Response() object.

<a name=".pan_cortex_data_lake.quer.QueryService.list_jobs"></a>

#### list_jobs

```python
 | list_jobs(max_jobs=None, created_after=None, state=None, job_type=None, tenant_id=None, **kwargs)
```

Get all jobs matching criteria.

**Arguments**:

- `limit` _int_ - Max number of jobs.
- `created_after` _int_ - List jobs created after this unix epoch UTC datetime.
- `state` _str_ - Job state, e.g. 'RUNNING', 'PENDING', 'FAILED', 'DONE'.
- `job_type` _str_ - Query type hint.
- `tenant_id` _str_ - Tenant ID.
- `**kwargs` - Supported :meth:`~pan_cortex_data_lake.httpclient.HTTPClient.request` parameters.

**Returns**:

- `requests.Response` - Requests Response() object.

<a name=".pan_cortex_data_lake.credentials"></a>

## pan_cortex_data_lake.credentials

Access, store and refresh credentials.

<a name=".pan_cortex_data_lake.credentials.Credentials"></a>

### Credentials

```python
class Credentials(object)
```

An Application Framework credentials object.

<a name=".pan_cortex_data_lake.credentials.Credentials.__init__"></a>

#### \_\_init\_\_

```python
 | __init__(access_token=None, auth_base_url=None, cache_token=True, client_id=None, client_secret=None, developer_token=None, developer_token_provider=None, instance_id=None, profile=None, redirect_uri=None, region=None, refresh_token=None, scope=None, storage_adapter=None, storage_params=None, token_url=None, **kwargs)
```

Persist Session() and credentials attributes.

The `Credentials` class is an abstraction layer for accessing,
storing and refreshing credentials needed for interacting with
the Application Framework.

`Credentials` resolves credentials from the following locations,
in the following order:

1. Class instance variables
2. Environment variables
3. Credentials store

**Arguments**:

- `access_token` _str_ - OAuth2 access token. Defaults to `None`.
- `auth_base_url` _str_ - IdP base authorization URL. Default to `None`.
- `cache_token` _bool_ - If `True`, stores `access_token` in token store. Defaults to `True`.
- `client_id` _str_ - OAuth2 client ID. Defaults to `None`.
- `client_secret` _str_ - OAuth2 client secret. Defaults to `None`.
- `developer_token` _str_ - Developer Token. Defaults to `None`.
- `developer_token_provider` _str_ - Developer Token Provider URL. Defaults to `None`.
- `instance_id` _str_ - Instance ID. Defaults to `None`.
- `profile` _str_ - Credentials profile. Defaults to `'default'`.
- `redirect_uri` _str_ - Redirect URI. Defaults to `None`.
- `region` _str_ - Region. Defaults to `None`.
- `refresh_token` _str_ - OAuth2 refresh token. Defaults to `None`.
- `scope` _str_ - OAuth2 scope. Defaults to `None`.
- `storage_adapter` _str_ - Namespace path to storage adapter module. Defaults to "pan_cortex_data_lake.adapters.tinydb_adapter.TinyDBStore".
  storage_params (dict) = Storage adapter parameters. Defaults to `None`.
- `token_url` _str_ - Refresh URL. Defaults to `None`.
- `token_revoke_url` _str_ - Revoke URL. Defaults to `None`.
- `**kwargs` - Supported :class:`~requests.Session` parameters.

<a name=".pan_cortex_data_lake.credentials.Credentials.access_token"></a>

#### access_token

```python
 | @access_token.setter
 | access_token(access_token)
```

Set access_token.

<a name=".pan_cortex_data_lake.credentials.Credentials.cache_token"></a>

#### cache_token

```python
 | @property
 | cache_token()
```

Get cache_token setting.

<a name=".pan_cortex_data_lake.credentials.Credentials.client_id"></a>

#### client_id

```python
 | @client_id.setter
 | client_id(client_id)
```

Set client_id.

<a name=".pan_cortex_data_lake.credentials.Credentials.client_secret"></a>

#### client_secret

```python
 | @client_secret.setter
 | client_secret(client_secret)
```

Set client_secret.

<a name=".pan_cortex_data_lake.credentials.Credentials.developer_token"></a>

#### developer_token

```python
 | @developer_token.setter
 | developer_token(developer_token)
```

Set developer token.

<a name=".pan_cortex_data_lake.credentials.Credentials.developer_token_provider"></a>

#### developer_token_provider

```python
 | @developer_token_provider.setter
 | developer_token_provider(developer_token_provider)
```

Set developer token provider.

<a name=".pan_cortex_data_lake.credentials.Credentials.jwt_exp"></a>

#### jwt_exp

```python
 | @jwt_exp.setter
 | jwt_exp(jwt_exp)
```

Set jwt_exp.

<a name=".pan_cortex_data_lake.credentials.Credentials.refresh_token"></a>

#### refresh_token

```python
 | @refresh_token.setter
 | refresh_token(refresh_token)
```

Set refresh_token.

<a name=".pan_cortex_data_lake.credentials.Credentials.decode_jwt_payload"></a>

#### decode_jwt_payload

```python
 | decode_jwt_payload(access_token=None)
```

Extract payload field from JWT.

**Arguments**:

- `access_token` _str_ - Access token to decode. Defaults to `None`.

**Returns**:

- `dict` - JSON object that contains the claims conveyed by the JWT.

<a name=".pan_cortex_data_lake.credentials.Credentials.fetch_tokens"></a>

#### fetch_tokens

```python
 | fetch_tokens(client_id=None, client_secret=None, code=None, redirect_uri=None, **kwargs)
```

Exchange authorization code for token.

**Arguments**:

- `client_id` _str_ - OAuth2 client ID. Defaults to `None`.
- `client_secret` _str_ - OAuth2 client secret. Defaults to `None`.
- `code` _str_ - Authorization code. Defaults to `None`.
- `redirect_uri` _str_ - Redirect URI. Defaults to `None`.

**Returns**:

- `dict` - Response from token URL.

<a name=".pan_cortex_data_lake.credentials.Credentials.get_authorization_url"></a>

#### get_authorization_url

```python
 | get_authorization_url(client_id=None, instance_id=None, redirect_uri=None, region=None, scope=None, state=None)
```

Generate authorization URL.

**Arguments**:

- `client_id` _str_ - OAuth2 client ID. Defaults to `None`.
- `instance_id` _str_ - App Instance ID. Defaults to `None`.
- `redirect_uri` _str_ - Redirect URI. Defaults to `None`.
- `region` _str_ - App Region. Defaults to `None`.
- `scope` _str_ - Permissions. Defaults to `None`.
- `state` _str_ - UUID to detect CSRF. Defaults to `None`.

**Returns**:

str, str: Auth URL, state

<a name=".pan_cortex_data_lake.credentials.Credentials.get_credentials"></a>

#### get_credentials

```python
 | get_credentials()
```

Get read-only credentials.

**Returns**:

- `class` - Read-only credentials.

<a name=".pan_cortex_data_lake.credentials.Credentials.jwt_is_expired"></a>

#### jwt_is_expired

```python
 | jwt_is_expired(access_token=None, leeway=0)
```

Validate JWT access token expiration.

**Arguments**:

- `access_token` _str_ - Access token to validate. Defaults to `None`.
- `leeway` _float_ - Time in seconds to adjust for local clock skew. Defaults to 0.

**Returns**:

- `bool` - `True` if expired, otherwise `False`.

<a name=".pan_cortex_data_lake.credentials.Credentials.remove_profile"></a>

#### remove_profile

```python
 | remove_profile(profile)
```

Remove profile from credentials store.

**Arguments**:

- `profile` _str_ - Credentials profile to remove.

**Returns**:

Return value of self.storage.remove_profile()

<a name=".pan_cortex_data_lake.credentials.Credentials.refresh"></a>

#### refresh

```python
 | refresh(access_token=None, **kwargs)
```

Refresh access and refresh tokens.

**Arguments**:

- `access_token` _str_ - Access token to refresh. Defaults to `None`.

**Returns**:

- `str` - Refreshed access token.

<a name=".pan_cortex_data_lake.credentials.Credentials.revoke_access_token"></a>

#### revoke_access_token

```python
 | revoke_access_token(**kwargs)
```

Revoke access token.

<a name=".pan_cortex_data_lake.credentials.Credentials.revoke_refresh_token"></a>

#### revoke_refresh_token

```python
 | revoke_refresh_token(**kwargs)
```

Revoke refresh token.

<a name=".pan_cortex_data_lake.credentials.Credentials.write_credentials"></a>

#### write_credentials

```python
 | write_credentials()
```

Write credentials.

Write credentials to credentials store.

**Returns**:

Return value of self.storage.write_credentials()

<a name=".pan_cortex_data_lake.adapters"></a>

## pan_cortex_data_lake.adapters

Adapters package.

<a name=".pan_cortex_data_lake.adapters.adapter"></a>

## pan_cortex_data_lake.adapters.adapter

Base adapter class.

<a name=".pan_cortex_data_lake.adapters.adapter.StorageAdapter"></a>

### StorageAdapter

```python
class StorageAdapter(ABC)
```

A storage adapter abstract base class.

<a name=".pan_cortex_data_lake.adapters.adapter.StorageAdapter.fetch_credential"></a>

#### fetch_credential

```python
 | @abstractmethod
 | fetch_credential(credential=None, profile=None)
```

Fetch credential from store.

**Arguments**:

- `credential` _str_ - Credential to fetch.
- `profile` _str_ - Credentials profile. Defaults to `'default'`.

<a name=".pan_cortex_data_lake.adapters.adapter.StorageAdapter.init_store"></a>

#### init_store

```python
 | @abstractmethod
 | init_store()
```

Initialize credentials store.

<a name=".pan_cortex_data_lake.adapters.adapter.StorageAdapter.remove_profile"></a>

#### remove_profile

```python
 | @abstractmethod
 | remove_profile(profile=None)
```

Remove profile from store.

**Arguments**:

- `profile` _str_ - Credentials profile to remove.

<a name=".pan_cortex_data_lake.adapters.adapter.StorageAdapter.write_credentials"></a>

#### write_credentials

```python
 | @abstractmethod
 | write_credentials(credentials=None, profile=None, cache_token=None)
```

Write credentials.

Write credentials to store.

**Arguments**:

- `cache_token` _bool_ - If `True`, stores `access_token` in token store. Defaults to `True`.
- `credentials` _class_ - Read-only credentials.
- `profile` _str_ - Credentials profile. Defaults to `'default'`.

<a name=".pan_cortex_data_lake.adapters.tinydb_adapter"></a>

## pan_cortex_data_lake.adapters.tinydb_adapter

TinyDB storage adapter.

<a name=".pan_cortex_data_lake.adapters.tinydb_adapter.TinyDBStore.fetch_credential"></a>

#### fetch_credential

```python
 | fetch_credential(credential=None, profile=None)
```

Fetch credential from credentials file.

**Arguments**:

- `credential` _str_ - Credential to fetch.
- `profile` _str_ - Credentials profile. Defaults to `'default'`.

**Returns**:

str, None: Fetched credential or `None`.

<a name=".pan_cortex_data_lake.adapters.tinydb_adapter.TinyDBStore.remove_profile"></a>

#### remove_profile

```python
 | remove_profile(profile=None)
```

Remove profile from credentials file.

**Arguments**:

- `profile` _str_ - Credentials profile to remove.

**Returns**:

- `list` - List of affected document IDs.

<a name=".pan_cortex_data_lake.adapters.tinydb_adapter.TinyDBStore.write_credentials"></a>

#### write_credentials

```python
 | write_credentials(credentials=None, profile=None, cache_token=None)
```

Write credentials.

Write credentials to credentials file. Performs `upsert`.

**Arguments**:

- `cache_token` _bool_ - If `True`, stores `access_token` in token store. Defaults to `True`.
- `credentials` _class_ - Read-only credentials.
- `profile` _str_ - Credentials profile. Defaults to `'default'`.

**Returns**:

- `int` - Affected document ID.

<a name=".pan_cortex_data_lake.utils"></a>

## pan_cortex_data_lake.utils

PAN Cloud Python SDK utilities.

<a name=".pan_cortex_data_lake.utils.ApiStats"></a>

### ApiStats

```python
class ApiStats(dict):
 |  ApiStats(*args, **kwargs)
```

Object for storing, updating and retrieving API stats.

<a name=".pan_cortex_data_lake.exceptions"></a>

## pan_cortex_data_lake.exceptions

Exceptions raised by PAN Cloud library.

This module provides base classes for all errors raised by the PAN Cloud
library. All other exceptions are raised and maintained by Python
standard or nonstandard libraries.

<a name=".pan_cortex_data_lake.exceptions.CortexError"></a>

### CortexError

```python
class CortexError(Exception)
```

Base class for all exceptions raised by PAN Cloud library.

<a name=".pan_cortex_data_lake.exceptions.CortexError.__init__"></a>

#### \_\_init\_\_

```python
 | __init__(message)
```

Override the base class message attribute.

**Arguments**:

- `message` _str_ - Exception message.

<a name=".pan_cortex_data_lake.exceptions.HTTPError"></a>

### HTTPError

```python
class HTTPError(CortexError)
```

A pancloud HTTP error occurred.

<a name=".pan_cortex_data_lake.exceptions.HTTPError.__init__"></a>

#### \_\_init\_\_

```python
 | __init__(inst)
```

Convert exception instance to string.

**Arguments**:

- `inst` _class_ - Exception instance.

<a name=".pan_cortex_data_lake.exceptions.PartialCredentialsError"></a>

### PartialCredentialsError

```python
class PartialCredentialsError(CortexError)
```

The required credentials were not supplied.

<a name=".pan_cortex_data_lake.exceptions.PartialCredentialsError.__init__"></a>

#### \_\_init\_\_

```python
 | __init__(inst)
```

Convert exception instance to string.

**Arguments**:

- `inst` _class_ - Exception instance.

<a name=".pan_cortex_data_lake.exceptions.RequiredKwargsError"></a>

### RequiredKwargsError

```python
class RequiredKwargsError(CortexError)
```

A required keyword argument was not passed.

<a name=".pan_cortex_data_lake.exceptions.RequiredKwargsError.__init__"></a>

#### \_\_init\_\_

```python
 | __init__(kwarg)
```

Capture missing key-word argument.

**Arguments**:

- `kwarg` _str_ - Key-word argument.

<a name=".pan_cortex_data_lake.exceptions.UnexpectedKwargsError"></a>

### UnexpectedKwargsError

```python
class UnexpectedKwargsError(CortexError)
```

An unexpected keyword argument was passed.

<a name=".pan_cortex_data_lake.exceptions.UnexpectedKwargsError.__init__"></a>

#### \_\_init\_\_

```python
 | __init__(kwargs)
```

Convert kwargs to CSV string.

**Arguments**:

- `kwargs` _dict_ - Key-word arguments.
