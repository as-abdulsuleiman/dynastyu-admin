
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://dynastyu-9de03.appspot.com/": {
        headers: {
          "X-Hasura-Admin-Secret": "",
          "X-Hasura-Role": "user",
        },
      },
    },
  ],
  documents:["./src/services/graphql/queries/*.graphql"],
  generates: {
    "./src/services/graphql/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      // preset: "client",
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactHooksImportFrom: "@apollo/client",
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
