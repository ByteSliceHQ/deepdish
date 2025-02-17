# DeepDish

Welcome to DeepDish. DeepDish allows you to build Next.js apps without integrating a CMS.
DeepDish is built on top of React server components and specifically designed for Next.js.

Created by the [ByteSlice](https://byteslice.co) team for devs and marketing teams.

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

We are actively building out the DeepDish platform. To get started, join the [DeepDish waitlist](https://www.deepdish.app).
We are sending out invites to our waitlist every Friday to gain access to the platform.

## Getting Started

Follow the guide below to get started with DeepDish.

### Step 1: Setup your environment

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

If you're using Vercel, you can omit the `BASE_URL` environment variable and use the following helpers to get the base URL based on the Vercel environment.

```ts
import { getBaseUrl } from "@deepdish/cms/vercel";
const baseUrl = getBaseUrl();
```

The `getBaseUrl` function will return the base URL based on the Vercel environment, or your local development endpoint if you're running the app locally.
This is handy when using the Vercel preview feature.

### Step 2: Add a deepdish.ts file

Create a `deepdish.ts` file in the `app` directory of your Next.js project.

`app/deepdish.ts`:

```ts
import type { DeepDishConfig } from '@deepdish/cms';

// If you're using Vercel, use the following helpers to get the base URL.
// import { getBaseUrl } from "@deepdish/cms/vercel";
// const baseUrl = getBaseUrl();
const baseUrl = process.env.BASE_URL;

// Draft mode is dependent upon your environment.
// Set to `true` to enable the DeepDish Workbench, or `false` to disable it.
// We recommend using an environment variable for this.
const draft = process.env.DEEPDISH_MODE === "draft";

export const config: DeepDishConfig = {
  draft,
  baseUrl,
  secretKey: process.env.DEEPDISH_SECRET_KEY,
  projectAlias: process.env.DEEPDISH_PROJECT_ALIAS,
};
```

### Step 3: Configure your project

In your `app/layout.tsx` file, import the `deepdish` function from `@deepdish/cms` and initialize it with your `config` object.
Additionally, import the `DeepDishProvider` component from `@deepdish/cms` and wrap your app with it.

```tsx
import { deepdish, DeepDishProvider } from "@deepdish/cms";
import { config } from "@/deepdish";

await deepdish(config);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <DeepDishProvider>
          {children}
        </DeepDishProvider>
      </body>
    </html>
  );
}
```

### Step 4: Add the DeepDish Middleware

In your `middleware.ts` file, import the `deepdishMiddleware` function from `@deepdish/cms` and initialize it with your `config` object.

```ts
import { deepdishMiddleware } from "@deepdish/cms";
import { config } from "@/deepdish";

export default deepdishMiddleware(config);
```

### Step 5: Add a DeepDish Component

To add a DeepDish component to your page, import the `Header1` component and pass it a `deepdish` object with the `key` property set to a unique identifier for the component.

```tsx
import { Header1 } from "@deepdish/cms/typography";

function Home() {
  return (
    <div>
      <Header1 deepdish={{ key: "title" }}>Default value</Header1>
    </div>
  );
}
```

See a full list of available components [here](#typography-components) and how to use them.

### Step 6: Editing content on the page

When `draft` mode is enabled, you will be able to interact with the DeepDish Workbench to edit content directly on the page.
Simply right click on the component and select "Edit" to modify the contents, then click "Save" to save your changes.

https://github.com/user-attachments/assets/ab3e113b-476f-4722-a4e6-6ad13f5a5634

> [!Note]
> The DeepDish Workbench is only available when `draft` mode is enabled.

## Typography components

The `@deepdish/cms/typography` package provides a set of typography components for use in your app.
These components are completely customizable and can replace the default HTML tags, in order to enable the CMS functionality.

| Component | Renders as |
| --- | --- |
| BlockQuote | blockquote |
| Bold | strong |
| Div | div |
| Emphasize | em |
| Heading1 | h1 |
| Heading2 | h2 |
| Heading3 | h3 |
| Heading4 | h4 |
| Heading5 | h5 |
| Heading6 | h6 |
| Italicize | i |
| Paragraph | p |
| Span | span |
| Strong | strong |
| Underline | u |

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
