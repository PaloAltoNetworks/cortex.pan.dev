---
id: tutorial_retries_python
title: CDL Python SDK Retries
sidebar_label: Retry Strategies
hide_title: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::info
With [requests](https://requests.readthedocs.io/en/master/) and [urllib3](https://urllib3.readthedocs.io/en/latest/) under the hood, the Cortex Data Lake Python SDK offers access to a variety of powerful features, adapters and design patterns, that developers can use to extend the base functionality. The following tutorial presents a recipe for overridding the default `Retry` strategy in order to handle situations where API rate limits are exceeded.
:::

:::note
The Query Service API currently implements a sliding window rate limit of **5,000 queries/hour**.
:::

## Overview

Before we begin, it's important to note that the base CDL Python SDK `HTTPClient` class implements a general case transport adapter, configured with the following settings:

```python
HTTPAdapter (
    pool_connections: int=10,
    pool_maxsize: int=10,
    max_retries: int=0,  # Default behavior is *NOT* to retry failed connections
    pool_block: bool=False
)
```

Although good enough for the majority of cases, there are situations where you could implement a retry strategy to handle specific error conditions. One such case is when the Query Service API returns an HTTP status [429](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429) code, also known as a "Too Many Requests" error. This can occur when your client exceeds the Query Service API rate limit of _5,000 queries/hour_.

With the default `HTTPClient`, you'd be forced to code your own retry strategy, complete with a retry interval and backoff algorithm.

Yeah...well...

<img alt="Morpheus" src={useBaseUrl('img/morpheus_retries.jpg')} />

## The Recipe

As you might have guessed by now, there's a way to configure the CDL Python SDK to automatically retry after receiving an HTTP `429` response code ("Too Many Requests" error). Moreover, we can define a retry strategy that also implements [exponential backoff](https://en.wikipedia.org/wiki/Exponential_backoff), all with a few lines of code!

```python
# example reduced to relevant ingredients

from pan_cortex_data_lake import QueryService
from requests.packages.urllib3.util.retry import Retry


# Retry intervals:
# 1   2    3    4    5     6     7     8     9      10
# 0s, 14s, 28s, 56s, 112s, 224s, 448s, 896s, 1792s, 3584s
retry_strategy = Retry(
    total=10, status_forcelist=[429], method_whitelist=["GET", "POST"], backoff_factor=7
)

qs = QueryService(max_retries=retry_strategy)
```

So let's break down what's happening here:

- Import the `urllib3` `Retry` class.
- Define a retry strategy to handle HTTP `429` errors for `GET` and `POST` requests.
- Pass the `retry_strategy` to our `QueryService()` class constructor using the `max_retries` key-word argument.

Now, if we exceed the Query Service API rate limit, the CDL Python SDK will automatically implement the retry strategy with a retry interval of `0s, 14s, 28s, 56s, 112s, 224s, 448s, 896s, 1792s, 3584s`, more than enough time for the rate limiting window to reset.

:::note
Although `Retry` can work in conjunction with `timeout`, connection/read timeouts can only be applied on a per-request basis.
:::

For more information see the official [reference documentation](https://urllib3.readthedocs.io/en/latest/reference/urllib3.util.html#module-urllib3.util.retry) for the `Retry` module.
