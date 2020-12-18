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
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/oceanicNext"),
    },
    algolia: {
      apiKey: "db858a08864c153ecd30398595881683",
      indexName: "pan_cortex",
      algoliaOptions: { typoTolerance: false }, // Optional, if provided by Algolia
    },
    sidebarCollapsible: true,
    navbar: {
      title: "",
      logo: {
        alt: "Cortex for Developers",
        src: "img/Cortex_Tagline_Logo_RGB_K.png",
        srcDark: "img/Cortex_Tagline_Logo_RGB_KO.png",
      },
      links: [
        {
          to: "/docs",
          label: "Docs",
          position: "left",
        },
        {
          href: "https://medium.com/palo-alto-networks-developer-blog",
          label: "Blog",
          position: "right",
        },
        {
          href: "https://github.com/PaloAltoNetworks",
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
      menus: [
        {
          label: "Partners",
          items: [
            {
              to: "docs/partner/why",
              label: "Why Cortex",
            },
            {
              to: "docs/partner/what",
              label: "What is Cortex",
            },
            {
              to: "docs/partner/use",
              label: "Cortex Use Cases",
            },
            {
              to: "register",
              label: "Register",
            },
          ],
          position: "right",
        },
      ],
      sites: [
        {
          label: "Products",
          items: [
            {
              href: "https://cortex.pan.dev",
              label: "Cortex",
              logo: "/img/cortexfavicon.png",
            },
            {
              href: "https://xsoar.pan.dev",
              label: "Cortex XSOAR",
              logo: "/img/Cortex-XSOAR-product-green.svg",
            },
            {
              href: "https://panos.pan.dev",
              label: "PAN-OS",
              logo: "/img/strata_favicon.png",
            },
            {
              href: "https://prisma.pan.dev",
              label: "Prisma",
              logo: "/img/prismafavicon.png",
            },
          ],
          position: "products",
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
          title: "Partners",
          items: [
            {
              label: "Why Cortex?",
              to: "docs/partner/why",
            },
            {
              label: "What is Cortex?",
              to: "docs/partner/what",
            },
            {
              label: "Cortex Use Cases",
              to: "docs/partner/use",
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
          homePageId: "_index",
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
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  plugins: [
    "@docusaurus/plugin-sitemap",
    {
      cacheTime: 600 * 1000, // 600 sec - cache purge period
      changefreq: "weekly",
      priority: 0.5,
    },
  ],
  scripts: [
    {
      src: "https://app-ab28.marketo.com/js/forms2/js/forms2.min.js",
      async: true,
    },
  ],
  customFields: {
    docbar: {
      options: [
        {
          label: "Docs Home",
          to: "docs",
        },
        {
          label: "Learn & Play",
          to: "docs/learn",
        },
        {
          label: "Develop",
          to: "docs/develop",
        },
      ],
    },
  },
};
