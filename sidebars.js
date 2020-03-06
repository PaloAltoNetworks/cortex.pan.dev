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
      id: "develop"
    },
    {
      type: "category",
      label: "PAN Cloud Python SDK",
      items: ["develop/pancloud_python_qs"]
    },
    {
      type: "category",
      label: "PAN Cortex NodeJS libs",
      items: [
        "develop/pan_cortex_data_lake_nodejs_qs",
        "develop/pan_cortex_hub_nodejs_qs"
      ]
    },
    {
      type: "category",
      label: "PAN Cortex JAVA libs",
      items: [
        "develop/pan_cortex_data_lake_java_qs",
        "develop/pan_cortex_hub_java_qs"
      ]
    }
  ],
  partner: [
    {
      type: "category",
      label: "Partner",
      items: ["partner/why", "partner/what", "partner/use"]
    }
  ],
  learn: [
    {
      type: "doc",
      id: "learn"
    },
    {
      type: "category",
      label: "About Cortex",
      items: ["learn"]
    }
  ],
  contrib: [
    {
      type: "doc",
      id: "contributing"
    }
  ]
};
