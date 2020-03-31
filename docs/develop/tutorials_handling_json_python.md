---
id: handling_json_python
title: Handling JSON
sidebar_label: Handling JSON
description: Handling JSON with the CDL Python SDK
keywords:
  - cortex data lake
  - cortex
  - api
  - python
  - cdl python sdk
  - sdk
  - pan-cortex-data-lake-python
---

:::info
Where appropriate, the Cortex Data Lake REST API accepts and returns JSON payloads/responses, a format that pairs well with the Python programming language.
:::

## The Basics

So you want to convert your JSON response into a python object? With `requests` under the hood, it’s downright easy:

```python
q = qs.create_query(query_params={"query": SQL})
raw = q.text
dictionary = q.json()
```

Let's take a look at the difference between `raw` and `dictionary` shall we?

`raw` (formatted for display):

```json
{
  "jobId": "15075d1e-059f-475b-89c2-6aae23483059",
  "uri": "/query/v2/jobs/15075d1e-059f-475b-89c2-6aae23483059"
}
```

`dictionary`:

```python
{'jobId': '15075d1e-059f-475b-89c2-6aae23483059', 'uri': '/query/v2/jobs/15075d1e-059f-475b-89c2-6aae23483059'}
```

Easy right?

## Enforce JSON

What if you want to enforce proper JSON encoding on all responses?

```python
qs = QueryService(
    credentials=Credentials(),
    enforce_json=True  # Attempts json.dumps() on responses
)
```

Now, if a response returns something not JSON-serializable, the CDL Python SDK will raise a `CortexError` that can be handled, appropriately, in your client code.

## UltraJSON

Looking for an easy, cheap way to boost your JSON encoder/decoder? Install `ujson` and the CDL Python SDK will automatically use it in place of the standard library `json` module.

:::info
Visit the [UltraJSON GitHub Repo](https://github.com/ultrajson/ultrajson) for more details on installation and usage.
:::

### Installation

```bash
pip install ujson
```

So what's happening under the hood? Basically, something similar to this:

```python
import requests
import ujson


requests.models.json = ujson
```

If you have [debug logging](/docs/develop/debugging_python) enabled then you'll see the following message logged to your console:

```console
DEBUG:pan_cortex_data_lake.httpclient:Monkey patched requests with ujson
```
