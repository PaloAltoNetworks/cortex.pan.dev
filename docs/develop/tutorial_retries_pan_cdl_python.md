---
id: tutorial_retries_python
title: CDL Python SDK Retries
sidebar_label: Retry Strategies
hide_title: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::info
With [requests](https://requests.readthedocs.io/en/master/) under the hood, the Cortex Data Lake Python SDK offers access to a variety of powerful features, extensions, adapters and design patterns, that developers can use to extend the base functionality. The following tutorial presents a recipe for adapting the connection retry strategy in order to handle situations where API rate limits are breached.
:::

:::note
The Query Service API implements a sliding window rate limit of **5,000 queries/hour**.
:::

## Overview

Before we begin, it's important to note that the base `HTTPClient` class implements a general case transport adapter configured with the following settings:

```python
HTTPAdapter (
    pool_connections: int=10,
    pool_maxsize: int=10,
    max_retries: int=0,
    pool_block: bool=False
)
```

Although good enough for the majority of cases, there are situations where you could implement a retry strategy to handle specific error conditions. One such case is when the Query Service API returns an HTTP status [429](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) code, also known as a "Too Many Requests" error. This can occur when your client exceeds the Query Service API rate limit of _5,000 queries/hour_.

With the default `HTTPClient`, you'd be forced to code your own retry strategy, complete with a retry interval and backoff algorithm.

Yeah...well...

<img alt="Morpheus" src={useBaseUrl('img/morpheus_retries.jpg')} />

As you might have guessed by now, there's a way to configure the CDL Python SDK to automatically retry after receiving a `429` response code. Moreover, we can implement a retry strategy that also implements [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff), all with a few lines of code!

## The Recipe

(example reduced to relevant ingredients)

```python
from pan_cortex_data_lake import QueryService
from requests.packages.urllib3.util.retry import Retry


# Retry interval (seconds):
# 0s, 14s, 28s, 56s, 112s, 224s, 448s, 896s, 1792s, 3584s
retry_strategy = Retry(
    total=10, status_forcelist=[429], method_whitelist=["GET", "POST"], backoff_factor=7
)

qs = QueryService(max_retries=retry_strategy)
```

So let's break down what's happening here?

- We imported the `urllib3` `Retry` class.
- A retry strategy is defined to handle `429` responses for `GET` and `POST` requests.
- The retry strategy is passed to our `QueryService()` class constructor using the `max_retries` key-word argument.

Now, if we exceed the Query Service API rate limit, the CDL Python SDK will automatically implement the retry strategy with a retry interval of `0s, 14s, 28s, 56s, 112s, 224s, 448s, 896s, 1792s, 3584s`
(thanks to the backoff algorithm), more than enough time for the rate limiting window to reset.

:::note
Although `Retry` works in conjunction with `timeout`, timeout can only be applied on a per-request basis.
:::
