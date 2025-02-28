This is a simple [DeepDish](https://deepdish.app) demo app.

## Getting Started

At the monorepo root:

Install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm run dev
```

## Content

The content for the demo is stored in a JSON file located at `/tmp/deepdish.json`. Authentication is handled by the `src/middleware.ts` file, which simply mocks the sign-in and sign-out flows.
