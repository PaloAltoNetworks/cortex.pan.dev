---
id: pancloud_python_qs
title: Quickstart
sidebar_label: Quickstart
---

[![GitHub page](https://img.shields.io/badge/GitHub-Repo-brightgreen?style=for-the-badge&logo=github)](https://github.com/PaloAltoNetworks/pancloud) [![GitHub stars](https://img.shields.io/github/stars/PaloAltoNetworks/pancloud?style=for-the-badge)](https://github.com/PaloAltoNetworks/pancloud)

> The following guide will walk you through installing `pancloud`, a powerful SDK capable of supporting your next Cortex app, integration or automation project.

## Installing with pip

To install the Palo Alto Networks Cloud Python SDK, run this command in
your terminal:

```bash
pip install pancloud
```

To upgrade the Palo Alto Networks Cloud Python SDK, run this command in
your terminal:

```bash
pip install pancloud --upgrade
```

If you don't have [pip](https://pip.pypa.io) installed, this [Python
installation
guide](http://docs.python-guide.org/en/latest/starting/installation/)
can guide you through the process.

## Installing with pipenv

To install the Palo Alto Networks Cloud Python SDK using
[pipenv](https://docs.pipenv.org/), start by creating a virtualenv:

```bash
pipenv install
```

You can optionally specify which python version to use in your
virtualenv using the following:

```bash
pipenv --three install
```

or

```bash
pipenv --two install
```

> It's highly recommended to move to python3 as python2 will be
> [retiring](https://pythonclock.org/) soon.

Now it's time to install `pancloud`:

```bash
pipenv install pancloud
```

To upgrade <span class="title-ref">pancloud</span> using pipenv:

```bash
pipenv update pancloud
```

## Installing from source

The sources for the Palo Alto Networks Cloud Python SDK can be
downloaded from the [Github
repo](https://github.com/PaloAltoNetworks/pancloud).

You can either clone the public repository:

```bash
git clone git://github.com/PaloAltoNetworks/pancloud
```

Or download the
[tarball](https://github.com/PaloAltoNetworks/pancloud/tarball/master):

```bash
curl  -OL https://github.com/PaloAltoNetworks/pancloud/tarball/master
```

Once you have a copy of the source, you can install it with:

```bash
python setup.py install
```

## Basic usage

> The examples below assume the existence of a `Developer Token <credentials>` or a `credentials.json` file that has been properly
> `generated <credentials>`. Please see the `Credentials <credentials>`
> page for specific usage details.

### Querying Logging Service

1. Begin by importing `LoggingService` and `Credentials`:

```python
from pancloud import LoggingService
from pancloud import Credentials
```

2. Next, let's construct a `LoggingService` instance:

```python
ls = LoggingService(credentials=Credentials())
```

3. Now, let's define the JSON payload for our query:

```python
payload = {
    "query": "SELECT * FROM panw.traffic LIMIT 5",
    "startTime": 0,  # 1970
    "endTime": 1609459200,  # 2021
    "maxWaitTime": 0  # no logs in initial response
}
```

4. Pass the JSON `payload` to the `query()` method to search for the last 5 traffic logs:

```python
q = ls.query(payload)
```

5. Now, let's print the `query` results:

```python
print(QUERY: {}".format(q.text))
```

Example output:

```json
{
  "queryId": "222a45ff-4f38-4418-be7d-45b511f191db",
  "sequenceNo": 0,
  "queryStatus": "RUNNING",
  "clientParameters": {},
  "result": {
    "esResult": null,
    "esQuery": {
      "table": ["panw.traffic"],
      "query": { "aggregations": {}, "size": 5 },
      "selections": [],
      "params": {}
    }
  }
}
```

### Polling for results

Awesome! So how do we `poll` for results?

```python
p = ls.poll(query_id, 0, params)  # starting with sequenceNo 0
```

Cool. Let's take a peek at the results:

```python
print(RESULTS: {}".format(p.text))
```

Example output:

```json
[
  {
    "queryId": "ddc3e88b-6195-4622-94a5-c769401f743d",
    "sequenceNo": 0,
    "queryStatus": "JOB_FINISHED",
    "clientParameters": {},
    "result": {
      "esResult": {
        "took": 0,
        "hits": {
          "total": 0,
          "maxScore": 0,
          "hits": []
        },
        "from": 0,
        "size": 0,
        "completed": true,
        "response": {
          "resultType": "elasticsearch",
          "result": {
            "took": 7340,
            "timed_out": false,
            "_shards": {
              "total": 1,
              "successful": 1,
              "skipped": 0,
              "failed": 0
            },
            "hits": {
              "total": 5113300,
              "max_score": 0,
              "hits": []
            },
            "aggregations": {
              "1": {
                "doc_count_error_upper_bound": 0,
                "sum_other_doc_count": 0,
                "buckets": [
                  {
                    "key": "taplog",
                    "doc_count": 5084386,
                    "sessions": {
                      "value": 3257777
                    },
                    "ncontent": {
                      "value": 0
                    },
                    "nurlcount": {
                      "value": 1681086
                    },
                    "bytes": {
                      "value": 212740773402
                    },
                    "nunique-of-apps": {
                      "value": 90,
                      "internal_value": {
                        "registers": "50000000A600010000040001841690008009803F8C0A800E8001800C801484058C0480088013800680039C0B840780008004800980118809840480008088028001840580018405840A8815841C800090028C1590128011800D808400880F800C842780008409940E880484048C028022840780840D80019412800281008008840388108402800080118000800490028403800C84802680078012800080038404841C8840488C08811D8400840480038000"
                      }
                    },
                    "nthreats": {
                      "value": 1770866
                    }
                  },
                  {
                    "key": "allow-inbound-rdp",
                    "doc_count": 10379,
                    "sessions": {
                      "value": 124265
                    },
                    "ncontent": {
                      "value": 0
                    },
                    "nurlcount": {
                      "value": 0
                    },
                    "bytes": {
                      "value": 477394867
                    },
                    "nunique-of-apps": {
                      "value": 2,
                      "internal_value": {
                        "registers": "5000000008000100000400415080406B804240"
                      }
                    },
                    "nthreats": {
                      "value": 0
                    }
                  },
                  {
                    "key": "allow-outgoing",
                    "doc_count": 7342,
                    "sessions": {
                      "value": 105808
                    },
                    "ncontent": {
                      "value": 598
                    },
                    "nurlcount": {
                      "value": 76447
                    },
                    "bytes": {
                      "value": 150421960
                    },
                    "nunique-of-apps": {
                      "value": 11,
                      "internal_value": {
                        "registers": "500000001C000100000400409780188C40738019841E84168440DC8035801B80268440B0904078"
                      }
                    },
                    "nthreats": {
                      "value": 128624
                    }
                  },
                  {
                    "key": "RDP 3389 Inbound",
                    "doc_count": 8094,
                    "sessions": {
                      "value": 41889
                    },
                    "ncontent": {
                      "value": 0
                    },
                    "nurlcount": {
                      "value": 0
                    },
                    "bytes": {
                      "value": 141296503
                    },
                    "nunique-of-apps": {
                      "value": 1,
                      "internal_value": {
                        "registers": "500000000500010000040041508042AD"
                      }
                    },
                    "nthreats": {
                      "value": 0
                    }
                  },
                  {
                    "key": "Allow all outbound",
                    "doc_count": 348,
                    "sessions": {
                      "value": 1936
                    },
                    "ncontent": {
                      "value": 0
                    },
                    "nurlcount": {
                      "value": 25
                    },
                    "bytes": {
                      "value": 14006234
                    },
                    "nunique-of-apps": {
                      "value": 4,
                      "internal_value": {
                        "registers": "500000000E00010000040040B780406D804051844130804152"
                      }
                    },
                    "nthreats": {
                      "value": 0
                    }
                  },
                  {
                    "key": "allow-dva-ssh-http",
                    "doc_count": 1597,
                    "sessions": {
                      "value": 1610
                    },
                    "ncontent": {
                      "value": 0
                    },
                    "nurlcount": {
                      "value": 944
                    },
                    "bytes": {
                      "value": 7531721
                    },
                    "nunique-of-apps": {
                      "value": 3,
                      "internal_value": {
                        "registers": "500000000A00010000040041BD80118040858041A6"
                      }
                    },
                    "nthreats": {
                      "value": 17
                    }
                  },
                  {
                    "key": "intrazone-default",
                    "doc_count": 930,
                    "sessions": {
                      "value": 3773
                    },
                    "ncontent": {
                      "value": 0
                    },
                    "nurlcount": {
                      "value": 64
                    },
                    "bytes": {
                      "value": 2997190
                    },
                    "nunique-of-apps": {
                      "value": 28,
                      "internal_value": {
                        "registers": "500000003E00010000040001840684298025802E80078021800690229C2080188816804053802D8C0080404088319023801CA40D800E801580228002840280404284405F884074840B"
                      }
                    },
                    "nthreats": {
                      "value": 0
                    }
                  },
                  {
                    "key": "SSH 221 inbound",
                    "doc_count": 53,
                    "sessions": {
                      "value": 541
                    },
                    "ncontent": {
                      "value": 0
                    },
                    "nurlcount": {
                      "value": 0
                    },
                    "bytes": {
                      "value": 2736104
                    },
                    "nunique-of-apps": {
                      "value": 1,
                      "internal_value": {
                        "registers": "500000000500010000040041D080422D"
                      }
                    },
                    "nthreats": {
                      "value": 0
                    }
                  },
                  {
                    "key": "Allow Inbound Web",
                    "doc_count": 150,
                    "sessions": {
                      "value": 76
                    },
                    "ncontent": {
                      "value": 0
                    },
                    "nurlcount": {
                      "value": 511
                    },
                    "bytes": {
                      "value": 1031478
                    },
                    "nunique-of-apps": {
                      "value": 2,
                      "internal_value": {
                        "registers": "500000000800010000040041BD8040988041A6"
                      }
                    },
                    "nthreats": {
                      "value": 514
                    }
                  },
                  {
                    "key": "Allow all ping",
                    "doc_count": 21,
                    "sessions": {
                      "value": 28
                    },
                    "ncontent": {
                      "value": 0
                    },
                    "nurlcount": {
                      "value": 0
                    },
                    "bytes": {
                      "value": 1734
                    },
                    "nunique-of-apps": {
                      "value": 1,
                      "internal_value": {
                        "registers": "500000000500010000040042329041CB"
                      }
                    },
                    "nthreats": {
                      "value": 0
                    }
                  }
                ]
              },
              "sessions": {
                "value": 3537703
              },
              "ncontent": {
                "value": 598
              },
              "nurlcount": {
                "value": 1759077
              },
              "bytes": {
                "value": 213538191193
              },
              "nunique-of-apps": {
                "value": 110,
                "internal_value": {
                  "registers": "50000000CB000100000400018406840E90008009800C8025800A8C0A800E8001800380078001801184058C04800690008013800680039C0B84078000800480028005801188058002840480008088028001840584018405840380058808840B84098411800090028C1590108C008011800D808400880F800A88008427800084049003940E880484048C02801CA40484078084078004800194128002810080088403880C80028402800080118000800490028403800C84800D841780078012800080038404841C8807903F8C08811D8400840480038000"
                }
              },
              "nthreats": {
                "value": 1900021
              }
            }
          },
          "progressInfo": {
            "byTime": {
              "actualStart": 1554908605621,
              "timeRange": 0,
              "totalCompleted": 0,
              "totalRealTime": 0,
              "totalRunTime": 0,
              "lastInterval": 0,
              "lastRealTime": 0,
              "lastRunTime": 0
            }
          }
        },
        "timed_out": false
      },
      "esQuery": {
        "table": ["panw.trsum"],
        "query": {
          "aggregations": {
            "1": {
              "terms": {
                "field": "rule",
                "order": {
                  "bytes": "desc"
                },
                "missing": "default",
                "size": "100"
              },
              "aggregations": {
                "bytes": {
                  "sum": {
                    "field": "bytes"
                  }
                },
                "sessions": {
                  "sum": {
                    "field": "sessions"
                  }
                },
                "nthreats": {
                  "sum": {
                    "field": "nthreats"
                  }
                },
                "ncontent": {
                  "sum": {
                    "field": "ncontent"
                  }
                },
                "nurlcount": {
                  "sum": {
                    "field": "nurlcount"
                  }
                },
                "nunique-of-apps": {
                  "pancardinality": {
                    "field": "app",
                    "precision_threshold": 128
                  }
                }
              }
            },
            "bytes": {
              "sum": {
                "field": "bytes"
              }
            },
            "sessions": {
              "sum": {
                "field": "sessions"
              }
            },
            "nthreats": {
              "sum": {
                "field": "nthreats"
              }
            },
            "ncontent": {
              "sum": {
                "field": "ncontent"
              }
            },
            "nurlcount": {
              "sum": {
                "field": "nurlcount"
              }
            },
            "nunique-of-apps": {
              "pancardinality": {
                "field": "app",
                "precision_threshold": 128
              }
            }
          },
          "_source": ["rule"],
          "size": 0
        },
        "selections": [
          {
            "column": "bytes",
            "alias": "bytes",
            "function": "SUM",
            "params": ["bytes"],
            "isESFunction": true
          },
          {
            "column": "sessions",
            "alias": "sessions",
            "function": "SUM",
            "params": ["sessions"],
            "isESFunction": true
          },
          {
            "column": "nthreats",
            "alias": "nthreats",
            "function": "SUM",
            "params": ["nthreats"],
            "isESFunction": true
          },
          {
            "column": "ncontent",
            "alias": "ncontent",
            "function": "SUM",
            "params": ["ncontent"],
            "isESFunction": true
          },
          {
            "column": "nurlcount",
            "alias": "nurlcount",
            "function": "SUM",
            "params": ["nurlcount"],
            "isESFunction": true
          },
          {
            "column": "app",
            "alias": "nunique-of-apps",
            "function": "pancardinality",
            "params": ["app", 128],
            "isESFunction": true
          },
          {
            "column": "rule",
            "alias": "1"
          }
        ],
        "params": {}
      }
    }
  }
]
```
