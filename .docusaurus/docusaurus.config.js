export default {
  "plugins": [
    "@docusaurus/plugin-sitemap",
    {
      "cacheTime": 600000,
      "changefreq": "weekly",
      "priority": 0.5
    }
  ],
  "themes": [
    "@docusaurus/theme-live-codeblock"
  ],
  "customFields": {},
  "themeConfig": {
    "sidebarCollapsible": true,
    "navbar": {
      "title": "",
      "logo": {
        "alt": "Cortex® for Developers",
        "src": "img/cortexfordevelopers.png"
      },
      "menus": [
        {
          "label": "Quickstart",
          "items": [
            {
              "to": "docs/pancloud_python_qs",
              "label": "PAN Cloud Python SDK"
            }
          ],
          "position": "left"
        },
        {
          "label": "Docs",
          "items": [
            {
              "to": "docs/cortex",
              "label": "Cortex® APIs"
            }
          ],
          "position": "left"
        }
      ],
      "links": [
        {
          "href": "https://medium.com/palo-alto-networks-developer-blog",
          "label": "Blog",
          "position": "left"
        },
        {
          "href": "https://github.com/PaloAltoNetworks",
          "label": "GitHub",
          "position": "left"
        }
      ]
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "Docs",
          "items": [
            {
              "label": "Cortex® APIs",
              "to": "docs/cortex"
            }
          ]
        },
        {
          "title": "Community",
          "items": [
            {
              "label": "Automation and API",
              "href": "https://live.paloaltonetworks.com/t5/Automation-API/ct-p/automation"
            }
          ]
        },
        {
          "title": "Social",
          "items": [
            {
              "label": "Blog",
              "href": "https://medium.com/palo-alto-networks-developer-blog"
            }
          ]
        }
      ],
      "logo": {
        "alt": "PAN-OS® for developers",
        "src": "img/panosfordevelopers.png"
      },
      "copyright": "Copyright © 2019 Palo Alto Networks, Inc."
    }
  },
  "title": "Develop security",
  "tagline": "using the most advanced cybersecurity data platform",
  "url": "https://cortex.pan.dev",
  "baseUrl": "/",
  "favicon": "img/panospeelable.png",
  "organizationName": "PaloAltoNetworks",
  "projectName": "cortex.pan.dev",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/Users/sserrata/projects/cortex.pan.dev/sidebars.js",
          "routeBasePath": "docs",
          "include": [
            "**/*.md",
            "**/*.mdx"
          ],
          "docLayoutComponent": "@theme/DocPage",
          "docItemComponent": "@theme/DocItem",
          "remarkPlugins": [],
          "rehypePlugins": [],
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true
        },
        "theme": {
          "customCss": "/Users/sserrata/projects/cortex.pan.dev/src/css/custom.css"
        }
      }
    ]
  ],
  "scripts": [
    {
      "src": "//app-ab28.marketo.com/js/forms2/js/forms2.min.js",
      "async": true
    }
  ]
};