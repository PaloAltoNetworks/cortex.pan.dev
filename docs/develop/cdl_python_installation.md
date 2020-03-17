---
id: cdl_python_installation
title: Installation
sidebar_label: Installation
---

[![GitHub page](https://img.shields.io/badge/GitHub-Repo-brightgreen?style=for-the-badge&logo=github)](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-python) [![GitHub stars](https://img.shields.io/github/stars/PaloAltoNetworks/pan-cortex-data-lake-python?style=for-the-badge)](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-python)

:::note
The following guide will walk you through installing `pan-cortex-data-lake`, a powerful SDK capable of supporting your next Cortex Data Lake app, integration or automation project.
:::

## Installing with pip

To install the Cortex Data Lake Python SDK, run this command in
your terminal:

```bash
pip install pan-cortex-data-lake
```

If you don't have [pip](https://pip.pypa.io) installed, this [Python
installation
guide](http://docs.python-guide.org/en/latest/starting/installation/)
can guide you through the process.

:::tip
It's highly recommended to move to python3 as python2 was officially [retired](https://pythonclock.org/) and is no longer maintained.
:::

## Installing from source

The source for the Cortex Data Lake Python SDK can be downloaded from the [Github repo](https://github.com/PaloAltoNetworks/pan-cortex-data-lake-python).

You can clone the public repository:

```bash
git clone git://github.com/PaloAltoNetworks/pan-cortex-data-lake-python
```

Or download the [tarball](https://github.com/PaloAltoNetworks/pancloud/tarball/master):

```bash
curl  -OL https://github.com/PaloAltoNetworks/pan-cortex-data-lake-python/tarball/master
```

Once you have a copy of the source, you can install it with the following command:

```bash
python setup.py install
```

:::tip
Create and work within a `venv` to keep your system and project dependencies separate. The following tutorial explains how to set one up: https://docs.python.org/3/tutorial/venv.html
:::

## Basic usage

Now that you've successfully installed the Cortex Data Lake Python SDK, visit the [Quickstart](/docs/develop/quickstart) for a step-by-step tutorial on making your first API request.
