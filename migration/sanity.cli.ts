import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'bj34pdbp',
    dataset: 'production',
  },
  server: {
    port: 8080,
    hostname: '0.0.0.0',
  },
  // project: {
  //   basePath: '/'
  // }
})
