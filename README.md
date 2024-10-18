# DeepDish CMS

Welcome to DeepDish CMS, a flexible and feature-rich content management system designed to empower developers and content creators alike.

DeepDish is built on top of React server components.
<!-- Next.js is one of the only frameworks that supports server components out of the box with their app router.
We are temporarily only focused on Next.js apps, but this will change as server components become more widely adopted. -->
We are temporarily only focused on Next.js apps—they are one of the only frameworks that supports server components out-of-the-box—but this will change as server components become more widely adopted.

## Features

- **Preview URLs**: Share links to unpublished content for review and collaboration before going live.
- **Admin Portal**: A user-friendly admin portal for seamless content management.
- **Authorization**: Robust security features to keep your content safe.
- **Persistent Storage of Assets**: Reliable storage solutions for your digital assets.
- **Next.js Templates**: Jump-start your project with our Next.js frontend template examples.

## Installation

The easiest way to get started is by using the [DeepDish Cloud](https://dashboard.deepdish.app) hosted service for free. Alternatively, you can build your own resolver pattern and deploy it to your own infrastructure.

```sh
bun add @deepdish-cloud/config @deepdish/ui @deepdish/workbench
```

## Configure your project

Once installed, you can configure your project to use the [DeepDish Cloud](https://dashboard.deepdish.app) hosted resolvers.
In your `app/layout.tsx` file, import the `cms` function and configure it with your project alias and secret key from the [DeepDish Cloud](https://dashboard.deepdish.app) dashboard.

```ts
import { cms } from "@deepdish-cloud/config";
import { init } from "@deepdish-cloud/config/client";

cms({
	secretKey: process.env.DEEPDISH_SECRET_KEY,
	projectAlias: process.env.DEEPDISH_PROJECT_ALIAS,
});
```

## Add a DeepDish Workbench

To enable the DeepDish Workbench, import the `Workbench` component and include it at the bottom of your `body` tag.
Workbench can be passed an `onInit` callback that can handle the initial authentication flow.
For this example, we're using the `init` function from the `@deepdish-cloud/config/client` package.

```tsx
import { Workbench } from "@deepdish/workbench";
import { init } from "@deepdish-cloud/config/client";

function App() {
  return (
    <html>
      <body>
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
      <Header1 deepdish={{ key: "title", value: "Home" }} />
    </div>
  );
}
```

## Editing Content

Content creators can edit content directly on the page by selecting the content they want to edit, after authenticating with the DeepDish Workbench.

## Active Development

The team at [ByteSlice](https://byteslice.co) is working hard to bring you a stable and feature-rich open-source content management system. We would love to hear your feedback and suggestions. Please feel free to open an issue or [reach out to us directly](https://byteslice.co/contact).

## Contribution Guidelines

We welcome contributions from the community! If you're interested in helping improve DeepDish CMS, here are ways you can contribute:

- **Reporting Bugs**: Report bugs by opening issues.
- **Feature Suggestions**: Have ideas for new features? Open an issue to suggest them.
- **Code Contributions**: Submit a pull request with new features or bug fixes.
- **Documentation**: Help improve our docs for better understanding and usage.

### How to Contribute

Please refer to this [contribution guide](./CONTRIBUTE.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
