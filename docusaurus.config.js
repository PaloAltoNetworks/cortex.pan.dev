/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: "Develop security",
  tagline: "using the most advanced cybersecurity data platform",
  url: process.env.CI_PAGES_URL
    ? process.env.CI_PAGES_URL
    : "https://cortex.pan.dev",
  baseUrl: process.env.CI_MERGE_REQUEST_IID
    ? `/-/${process.env.CI_PROJECT_NAME}/-/jobs/${process.env.CI_JOB_ID}/artifacts/public/`
    : "/",
  favicon: "img/cortexfavicon.png",
  organizationName: "PaloAltoNetworks", // Usually your GitHub org/user name.
  projectName: "cortex.pan.dev", // Usually your repo name.
  themeConfig: {
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/oceanicNext"),
    },
    algolia: {
      apiKey: "cc0f2da5c80d2fb8dedb7ef9b56b52f2",
      indexName: "pan",
      searchParameters: {
        typoTolerance: false,
        facetFilters: ["tags:cortex"],
      }, // Optional, if provided by Algolia
    },
    navbar: {
      title: "",
      logo: {
        alt: "Cortex for Developers",
        src: "img/PAN_Cortex_Light.svg",
        srcDark: "img/PAN_Cortex_Dark.svg",
      },
      items: [
        {
          to: "/docs",
          label: "Docs",
          position: "left",
        },
        {
          label: "API Reference",
          items: [
            {
              to: "/api/expander/annotations-api",
              label: "Expander API",
            },
          ],
          position: "left",
        },
        {
          label: "Products",
          items: [
            {
              href: "https://xsoar.pan.dev",
              label: "Cortex XSOAR",
              className: "xsoarItem",
              target: "_self",
            },
            {
              href: "https://prisma.pan.dev",
              label: "Prisma",
              className: "prismaItem",
              target: "_self",
            },
            {
              href: "https://strata.pan.dev",
              label: "Strata",
              className: "panosItem",
              target: "_self",
            },
          ],
          position: "right",
        },
        {
          href: "https://medium.com/palo-alto-networks-developer-blog",
          position: "right",
          className: "header-medium-link",
          "aria-label": "Palo Alto Networks Developer Blog",
        },
        {
          href: "https://github.com/PaloAltoNetworks",
          position: "right",
          className: "header-github-link",
          "aria-label": "Palo Alto Networks Github Org",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Cortex for Developers",
              to: "docs",
            },
          ],
        },
        {
          title: "Social",
          items: [
            {
              label: "Blog",
              href: "https://medium.com/palo-alto-networks-developer-blog",
            },
          ],
        },
      ],
      logo: {
        alt: "Palo Alto Networks for Developers",
        src: "img/pandev.png",
        href: "https://pan.dev",
      },
      copyright: `Copyright © ${new Date().getFullYear()} Palo Alto Networks, Inc.`,
    },
  },
  themes: ["@docusaurus/theme-live-codeblock"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/PaloAltoNetworks/cortex.pan.dev/tree/master",
          routeBasePath: "docs",
          include: ["**/*.md", "**/*.mdx"], // Extensions to include.
          docLayoutComponent: "@theme/DocPage",
          docItemComponent: "@theme/DocItem",
          remarkPlugins: [],
          rehypePlugins: [],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarCollapsible: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-sitemap",
      {
        id: "cortex-sitemap",
        changefreq: "weekly",
        priority: 0.5,
      },
    ],
    [
      require.resolve("./docusaurus-plugin-gtm/index.js"),
      {
        gtm: "GTM-WF39F3P", //GTM-XXXXXX
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "api",
        sidebarPath: require.resolve("./api.sidebars.js"),
        editUrl:
          "https://github.com/PaloAltoNetworks/cortex.pan.dev/tree/master/",
        routeBasePath: "api",
        include: ["**/*.md", "**/*.mdx"], // Extensions to include.
        docLayoutComponent: "@theme/DocPage",
        docItemComponent: "@theme/APIDocItem",
        remarkPlugins: [],
        rehypePlugins: [],
        path: "api",
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
  ],
  onBrokenLinks: "warn",
  onDuplicateRoutes: "warn",
  stylesheets: [
    {
      href: "https://use.fontawesome.com/releases/v5.15.0/css/all.css",
      type: "text/css",
      rel: "stylesheet",
    },
  ],
  themes: [require.resolve("./docusaurus-plugin-webpack/src/index.cjs")],
};
