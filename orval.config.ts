import { defineConfig } from 'orval';

export default defineConfig({
  myApi: {
    input: {
      target: './openapi.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/lib/services',
      schemas: './src/lib/schemas',
      client: 'react-query',
      mock: false,
      override: {
        mutator: {
          path: './src/lib/configs/axios-instance.ts',
          name: 'axiosInstance',
        },
      },
    },
  },

  myApiZod: {
    input: {
      target: './openapi.json',
    },
    output: {
      mode: 'tags-split',
      target: './src/lib/zod',
      client: 'zod',
      fileExtension: '.zod.ts',
      mock: false,
      override: {
        zod: {
          generate: {
            param: true,
            body: true,
            response: true,
            query: true,
            header: false,
          },
          coerce: {
            param: true,
            body: true,
            response: true,
            query: true,
            header: false,
          },
        },
      },
    },
  },
});
