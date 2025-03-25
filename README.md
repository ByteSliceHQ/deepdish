# DeepDish

DeepDish enables developers to build web applications without integrating a CMS, allowing content managers to make edits directly on each page.

Specifically designed for [Next.js](https://nextjs.org/), DeepDish leverages the capabilities of [React Server Components](https://react.dev/reference/rsc/server-components).

🍕 Built by the team at [ByteSlice](https://byteslice.co).

## Installation

To get started, install the DeepDish package using your preferred package manager.

```sh
npm install @deepdish/cms
# or
yarn add @deepdish/cms
# or
pnpm add @deepdish/cms
# or
bun add @deepdish/cms
```

## Creating an account

We are actively building out the DeepDish platform. To request access, please join the [waitlist](https://www.deepdish.app).

## Getting Started

Follow the guide below to get up-and-running with DeepDish.

### Step 1: Set up your environment

Set the following environment variables in your local `.env.local` file:

- `DEEPDISH_SECRET_KEY`: Your DeepDish secret key.
- `DEEPDISH_PROJECT_ALIAS`: Your DeepDish project alias.
- `DEEPDISH_MODE`: Set to `draft` to enable the DeepDish Workbench.
- `BASE_URL`: Your base URL.

```sh
DEEPDISH_SECRET_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
DEEPDISH_PROJECT_ALIAS=project-alias
DEEPDISH_MODE=draft
BASE_URL=http://localhost:3000
```

#### Vercel helpers

If you're using Vercel, you can omit the `BASE_URL` environment variable and use the `getBaseUrl` helper instead.

```ts
import { getBaseUrl } from "@deepdish/cms/vercel"

const baseUrl = getBaseUrl()
```

That helper function will return the base URL of the Vercel environment (or your local development endpoint if you're running the app locally). This is particularly useful when using the Vercel preview feature.

### Step 2: Configure your project

Create a `deepdish.ts` file in the `app` directory of your Next.js project. Import the `deepdish` function from `@deepdish/cms` and initialize it with your configuration.

> [!Note]
> The `deepdish` function creates components and middleware based on your configuration. Ensure you export them so they can be used within your application.

```ts
import { deepdish } from '@deepdish/cms'

// Draft mode is dependent upon your environment.
// Set to `true` to enable the DeepDish Workbench, or `false` to disable it.
// We recommend using an environment variable for this.
const draft = process.env.DEEPDISH_MODE === "draft"

export const { components, middleware } = await deepdish({
  draft,
  baseUrl: process.env.BASE_URL, // or getBaseUrl() if using Vercel
  secretKey: process.env.DEEPDISH_SECRET_KEY,
  projectAlias: process.env.DEEPDISH_PROJECT_ALIAS,
})
```

### Step 3: Add the provider

Import the `DeepDishProvider` component from `@deepdish/cms` and wrap the subtree where DeepDish components will be rendered.

```tsx
import { DeepDishProvider } from "@deepdish/cms"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <DeepDishProvider>
          {props.children}
        </DeepDishProvider>
      </body>
    </html>
  )
}
```

### Step 4: Add the middleware

In your `middleware.ts` file—where [Next.js middleware](https://nextjs.org/docs/app/api-reference/file-conventions/middleware) is defined—add the configured DeepDish middleware.

```ts
import type { NextResponse } from 'next/server'
import * as deepdish from "@/deepdish"

export default function (request: NextRequest) {
  return deepdish.middleware(request)
}
```

### Step 5: Add a DeepDish Component

To add a DeepDish component to your page, import one that has been created based on your configuration. Pass it a `deepdish` prop with a `key` unique to the data you want to render. The `render` prop will be given a strongly-typed `value` that you can use to render whatever you'd like!

```tsx
import * as deepdish from "@/deepdish"

const { Text } = deepdish.components

function Home() {
  return (
    <div>
      <Text
        deepdish={{ key: 'headline' }}
        fallback="Grab a slice!"
        render={async (value) => <p className="text-xl font-bold">{value}</p>}
      />
    </div>
  )
}
```

### Step 6: Editing content on the page

When `draft` mode is enabled, you will be able to interact with the DeepDish Workbench to edit content directly on the page.
Simply right click on the component and select "Edit" to modify the contents, then click "Save" to save your changes.

https://github.com/user-attachments/assets/ab3e113b-476f-4722-a4e6-6ad13f5a5634

> [!Note]
> The DeepDish Workbench is only available when `draft` mode is enabled.

### The DeepDish prop

All DeepDish components accept a `deepdish` prop, which is an object with a `key` property.
The `key` value is a unique identifier for the component, and it is used to retrieve the value from the CMS when the component is rendered.

> [!TIP]
> All DeepDish components are editable in the browser when `draft` mode is enabled, enabling you and your team to make changes directly in the page.

## Contribution Guidelines

We welcome contributions from the community! If you're interested in helping improve DeepDish, here are ways you can contribute:

- **Reporting Bugs**: Report bugs by opening issues.
- **Feature Suggestions**: Have ideas for new features? Open an issue to suggest them.
- **Code Contributions**: Submit a pull request with new features or bug fixes.
- **Documentation**: Help improve our docs for better understanding and usage.

### How to Contribute

Please refer to this [contribution guide](./CONTRIBUTE.md) for more details.

## License

See the [LICENSE.md](LICENSE.md) file for details.
