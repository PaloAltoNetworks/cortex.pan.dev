[![Netlify Status](https://api.netlify.com/api/v1/badges/f73eff08-3be7-4f77-b6d1-84e03c7ba83c/deploy-status)](https://app.netlify.com/sites/silly-shannon-6360a4/deploys) [![CircleCI](https://circleci.com/gh/PaloAltoNetworks/cortex.pan.dev.svg?style=svg&circle-token=28f02ab6dfab3b46c8ccb9551fb4e2ba6452e8dd)](https://circleci.com/gh/PaloAltoNetworks/cortex.pan.dev)

# Cortex™ for Developers

This website is built using Docusaurus 2, a modern static website generator.

> URL: https://cortex.pan.dev

### Installation

```shell-session
yarn
```

### Local Development

```shell-session
yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```shell-session
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

The `upstream/master` branch is linked to a Netlify site and will auto-deploy when changes are merged into `master`.

Build previews will be automatically generated for merges into the `upstream/develop` branch and pull requests. Build previews can be used to review changes to determine if they are ready to be merged into `upstream/develop` or `upstream/master`.

### Contributing

Contributing guidelines can be found [here](https://cortex.pan.dev/docs/contributing).
