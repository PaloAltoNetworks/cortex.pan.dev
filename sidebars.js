/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  docs: [
    {
      type: "doc",
      id: "data_lake/home",
    },
    {
      type: "category",
      label: "Develop",
      items: [
        {
          type: "doc",
          id: "data_lake/develop",
        },
        {
          type: "doc",
          id: "data_lake/develop/quickstart",
        },
        {
          type: "category",
          label: "PAN CDL Python SDK",
          items: [
            "data_lake/develop/cdl_python_installation",
            require("./docs/develop/reference/sidebar.json"),
            {
              type: "category",
              label: "Tutorials",
              items: [
                "data_lake/develop/tutorial_retries_python",
                "data_lake/develop/handling_json_python",
                "data_lake/develop/debugging_python",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "PAN Cortex NodeJS libs",
          items: [
            "data_lake/develop/pan_cortex_data_lake_nodejs_qs",
            "data_lake/develop/pan_cortex_hub_nodejs_qs",
            "data_lake/develop/pan_cortex_xdr_nodejs_qs",
            "data_lake/develop/pan_cortex_xdr_nodejs_reference",
          ],
        },
        {
          type: "category",
          label: "PAN Cortex JAVA libs",
          items: [
            "data_lake/develop/pan_cortex_data_lake_java_qs",
            "data_lake/develop/pan_cortex_hub_java_qs",
          ],
        },
        {
          type: "category",
          label: "PAN CDL Python SDK",
          items: ["data_lake/tutorials/xdr_alert_ingestion"],
        },
      ],
    },
    {
      type: "category",
      label: "Play and Learn",
      items: [
        {
          type: "doc",
          id: "data_lake/learn",
        },
        {
          type: "doc",
          id: "data_lake/learn/about_cdl",
        },
        {
          type: "doc",
          id: "data_lake/learn/oauth2",
        },
        {
          type: "category",
          label: "Credentials",
          items: ["data_lake/learn/credentials"],
        },
        {
          type: "category",
          label: "API Explorer",
          items: [
            "data_lake/learn/apiexplorer_intro",
            "data_lake/learn/apiexplorer_authorization",
            "data_lake/learn/sandbox_data",
            "data_lake/learn/developer_tokens",
          ],
        },
      ],
    },
  ],
  partner: [
    {
      type: "category",
      label: "Partner",
      items: [
        "data_lake/partner/why",
        "data_lake/partner/what",
        "data_lake/partner/use",
      ],
    },
  ],
  doc: [
    {
      type: "doc",
      id: "contributing",
    },
  ],
};
