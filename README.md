# DeepDish

Welcome to DeepDish, a flexible and feature-rich data management system designed to empower developers and content creators alike.

DeepDish is built on top of React server components and specifically designed for Next.js.

## Features

- **Flexible Architecture**: Adaptable to various content structures and management needs.
- **Intuitive Interface**: Seamless integration with the Next.js app router, leveraging server-side rendering capabilities.
- **Developer Experience**: Built with performance and scalability in mind.

## Installation

To get started, create an account on [DeepDish](https://dashboard.deepdish.app), and then install the DeepDish packages using your preferred package manager.

```sh
npm install @deepdish/ui @deepdish/workbench @deepdish-cloud/config
# or
yarn add @deepdish/ui @deepdish/workbench @deepdish-cloud/config
# or
bun add @deepdish/ui @deepdish/workbench @deepdish-cloud/config
```

## Configure your project

Once installed, you can configure your project to use [DeepDish Cloud](https://dashboard.deepdish.app).
In your `app/layout.tsx` file, import `cloudConfig` from `@deepdish-cloud/config` and `configure` from `@deepdish/ui/config` and initialize the configuration with your project alias and secret key from the [DeepDish Cloud](https://dashboard.deepdish.app) dashboard.

```ts
import { cloudConfig } from "@deepdish-cloud/config";
import { configure } from "@deepdish/ui/config";

configure(
  cloudConfig({
    secretKey: process.env.DEEPDISH_SECRET_KEY,
    projectAlias: process.env.DEEPDISH_PROJECT_ALIAS,
  }),
)
```

## Add the DeepDish Workbench

To enable the DeepDish Workbench, import the `Workbench` component and include it at the bottom of your `body` tag.
Workbench can be passed an `onInit` callback that can handle the initial authentication flow.
For this example, we're using the `init` function from the `@deepdish-cloud/config/client` package.

A full example of the `app/layout.tsx` file with the DeepDish Workbench:

```tsx
import { Workbench } from "@deepdish/workbench";
import { init } from "@deepdish-cloud/config/client";

import { cloudConfig } from "@deepdish-cloud/config";
import { configure } from "@deepdish/ui/config";

configure(
  cloudConfig({
    secretKey: process.env.DEEPDISH_SECRET_KEY,
    projectAlias: process.env.DEEPDISH_PROJECT_ALIAS,
  }),
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {children}
        <Workbench onInit={init} />
      </body>
    </html>
  );
}
```

## Add a DeepDish Component

To add a DeepDish component to your page, import the `Header1` component and pass it a `deepdish` object with the `key` and `value` properties.

```tsx
import { Header1 } from "@deepdish/ui/typography";

function Home() {
  return (
    <div>
      <Header1 deepdish={{ key: "title" }}>Default value</Header1>
    </div>
  );
}
```

## Editing Content

Content creators can edit content directly on the page by selecting the content they want to edit, after authenticating with DeepDish.

## Active Development

The team at [ByteSlice](https://byteslice.co) is working hard to bring you a stable and feature-rich data management system. We would love to hear your feedback and suggestions. Please feel free to open an issue or [reach out to us directly](https://byteslice.co/contact).

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
