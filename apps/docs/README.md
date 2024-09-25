# DeepDish CMS

Welcome 🍕 to the DeepDish documentation.

## Getting started

DeepDish is an open-source set of React components that are specifically designed to work with server side rendering (SSR) frameworks, and are built with the Next.js framework in mind.

### Installation

To get started with DeepDish, you'll need to install the `@deepdish/ui` package.

```bash
npm install @deepdish/ui
```

### Usage

Once installed, you can import the components you need from the `@deepdish/ui` package.

```tsx
import { Heading1 } from "@deepdish/ui/typography";

function LandingPage() {
  return (
    <div>
      <Heading1 className="text-4xl font-semibold">DeepDish</Heading1>
    </div>
  );
}
```

These components act as wrappers around the corresponding HTML elements, allowing you to easily implement them into your existing application. For example, the `Heading1` component would be rendered as a `<h1>` element in the browser.

## Dynamic content

The magic of DeepDish componets is that they can be used to render dynamic content from any data source based on a resolver pattern.
In order to initialize the resolver, create a `cms.ts` file in the `src` of your project.

```bash
touch src/cms.ts
```

We are using the DeepDish Cloud Resolver which handles all the heavy lifting for you, or you can [create your own resolver](https://docs.deepdish.app/docs/resolvers/create-resolver).

```ts
import { createTypographyResolver } from "@deepdish-cloud/resolvers/typography";
import { configure } from "@deepdish/config";

export function cms(url: string, apiKey: string) {
  configure({
    contracts: {
      typography: {
        resolver: createTypographyResolver(url, apiKey),
      },
    },
  });
}
```

In your `app/layout.tsx` file, import the `cms` function and call it with your DeepDish API URL and API key.
You can find your API key in the [DeepDish Cloud Dashboard](https://dashboard.deepdish.app/).

```tsx
import { cms } from "@/cms";

cms("https://api.deepdish.app/", "YOUR_API_KEY");
```

### Using dynamic content

Now that you have initialized the resolver, you can use the components to render dynamic content.

```tsx
import { Heading1, Paragraph } from "@deepdish/ui/typography";

function LandingPage() {
  return (
    <div>
      <Heading1 className="text-4xl font-semibold" deepdish="product-name">
        DeepDish
      </Heading1>
    </div>
  );
}
```

The DeepDish components will render fetch the data from the resolver and render the content based on the `deepdish` prop.
If the `deepdish` prop is not provided, the component will render the content as is.
