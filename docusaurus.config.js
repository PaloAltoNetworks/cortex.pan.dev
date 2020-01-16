/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: "Develop security",
  tagline: "using the most advanced cybersecurity data platform",
  url: "https://cortex.pan.dev",
  baseUrl: "/",
  favicon: "img/cortexfavicon.png",
  organizationName: "PaloAltoNetworks", // Usually your GitHub org/user name.
  projectName: "cortex.pan.dev", // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: "cbeca27e98d8a51d98d5163f5c46dd8e",
      appId: "QAP3NZH9FJ",
      indexName: "cortex.pan.dev",
      algoliaOptions: {} // Optional, if provided by Algolia
    },
    sidebarCollapsible: true,
    navbar: {
      title: "",
      logo: {
        alt: "Cortex® for Developers",
        src: "img/cortexfordevelopers.png"
      },
      menus: [
        {
          label: "Quickstart",
          items: [
            { to: "docs/pancloud_python_qs", label: "PAN Cloud Python SDK" }
          ],
          position: "left"
        },
        {
          label: "Docs",
          items: [
            {
              to: "docs/cortex",
              label: "Cortex® APIs"
            }
          ],
          position: "left"
        },
        {
          label: "About Cortex®",
          items: [
            {
              to: "docs/why",
              label: "Why Cortex®"
            },
            {
              to: "docs/what",
              label: "What is Cortex®"
            },
            {
              to: "docs/use",
              label: "Cortex® Use Cases"
            }
          ],
          position: "left"
        }
      ],
      links: [
        {
          href: "https://medium.com/palo-alto-networks-developer-blog",
          label: "Blog",
          position: "left"
        },
        {
          href: "https://github.com/PaloAltoNetworks",
          label: "GitHub",
          position: "left"
        },
        {
          to: "/register",
          label: "Register",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Cortex® APIs",
              to: "docs/cortex"
            }
          ]
        },
        {
          title: "About Cortex®",
          items: [
            {
              label: "Why Cortex®?",
              to: "docs/why"
            },
            {
              label: "What is Cortex®?",
              to: "docs/what"
            },
            {
              label: "Cortex® Use Cases",
              to: "docs/use"
            }
          ]
        },
        {
          title: "Social",
          items: [
            {
              label: "Blog",
              href: "https://medium.com/palo-alto-networks-developer-blog"
            }
          ]
        }
      ],
      logo: {
        alt: "PAN-OS® for Developers",
        src: "img/pandev.png",
        href: "https://pan.dev"
      },
      copyright: `Copyright © ${new Date().getFullYear()} Palo Alto Networks, Inc.`
    }
  },
  themes: ["@docusaurus/theme-live-codeblock"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // editUrl:
          //   "https://github.com/PaloAltoNetworks/panos.pan.dev/tree/master/docs",
          routeBasePath: "docs",
          include: ["**/*.md", "**/*.mdx"], // Extensions to include.
          docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/DocItem",
          remarkPlugins: [],
          rehypePlugins: [],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      }
    ]
  ],
  plugins: [
    "@docusaurus/plugin-sitemap",
    {
      cacheTime: 600 * 1000, // 600 sec - cache purge period
      changefreq: "weekly",
      priority: 0.5
    }
  ],
  scripts: [
    {
      src: "https://app-ab28.marketo.com/js/forms2/js/forms2.min.js",
      async: true
    }
  ]
};
