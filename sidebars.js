/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  develop: [
    {
      type: "doc",
      id: "develop",
    },
    {
      type: "doc",
      id: "develop/quickstart",
    },
    {
      type: "category",
      label: "PAN CDL Python SDK",
      items: [
        "develop/cdl_python_installation",
        {
          type: "category",
          label: "Tutorials",
          items: [
            "develop/tutorial_retries_python",
            "develop/handling_json_python",
            "develop/debugging_python",
          ],
        },
      ],
    },
    {
      type: "category",
      label: "PAN Cortex NodeJS libs",
      items: [
        "develop/pan_cortex_data_lake_nodejs_qs",
        "develop/pan_cortex_hub_nodejs_qs",
        "develop/pan_cortex_xdr_nodejs_qs",
        "develop/pan_cortex_xdr_nodejs_reference",
      ],
    },
    {
      type: "category",
      label: "PAN Cortex JAVA libs",
      items: [
        "develop/pan_cortex_data_lake_java_qs",
        "develop/pan_cortex_hub_java_qs",
      ],
    },
  ],
  partner: [
    {
      type: "category",
      label: "Partner",
      items: ["partner/why", "partner/what", "partner/use"],
    },
  ],
  learn: [
    {
      type: "doc",
      id: "learn",
    },
    {
      type: "doc",
      id: "learn/about_cdl",
    },
    {
      type: "doc",
      id: "learn/oauth2",
    },
    {
      type: "category",
      label: "Credentials",
      items: ["learn/credentials"],
    },
    {
      type: "category",
      label: "API Explorer",
      items: [
        "learn/apiexplorer_intro",
        "learn/apiexplorer_authorization",
        "learn/sandbox_data",
        "learn/developer_tokens",
      ],
    },
  ],
  docs: [
    {
      type: "doc",
      id: "_index",
    },
    {
      type: "doc",
      id: "contributing",
    },
  ],
};
