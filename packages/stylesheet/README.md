# @deepdish/stylesheet

A bare-bones CSS-in-TS solution that gives full control over the resultant CSS string. This package was developed in order to easily add CSS to shadow DOM elements.

## API

### Initializing a `Stylesheet`

A `Stylesheet` is a simple class that collects CSS rules. The `makeStyleSheet` function accepts a name, which is used to prefix generated CSS classes.

```ts
import { makeStyleSheet } from "@deepdish/stylesheet";

export const stylesheet = makeStyleSheet("amazing-stylesheet");
```

### Creating a style

```ts
// the stylesheet we created above
import { stylesheet } from "./stylesheet"

export const button = stylesheet.style({
  color: 'red';
  // ... other CSS styles (these properties are fully typed)

  '&': {
    ':hover': {
      color: 'blue'
      // ... pseudo CSS styles (these properties are fully typed as well)
    }
  }
})
```

The `button` variable from the above example is a string representing a unique CSS class. The CSS rule generated from `stylesheet.style` is automatically collected in the `Stylesheet`'s rules. The class selector can be applied like you'd expect:

```tsx
// a collection of button styles co-located in a separate file
import { button } from "./button-styles";

export function Button({ children }: { children: React.ReactNode }) {
  return <button className={button}>{children}</button>;
}
```

### Creating an element

You can quickly create a UI primitive using the `.element` method on a `Stylesheet`. The method supports [Class Variance Authority](https://cva.style/docs), which makes it trivial to create UI variants.

```tsx
import { cva } from "class-variance-authority";

// the stylesheet we created above
import { stylesheet } from "./stylesheet";
import * as styles from "./button-styles";

export const Button = stylesheet.element(
  "button",
  cva(styles.base, {
    variants: {
      intent: {
        primary: styles.primary,
        secondary: styles.secondary,
      },
      size: {
        small: styles.small,
        medium: styles.medium,
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  })
);
```

The `Button` in the above example accepts all of the normal `<button>` props in addition to the variants `intent` and `size`, e.g.:

```tsx
// the Button primitive we just created
import { Button } from "./button";

function Demo() {
  return (
    // these props are fully typed
    <Button type="submit" size="medium" intent="secondary">
      Secondary Button
    </Button>
  );
}
```

### Generate the CSS

You can generate the CSS by simply invoking the `.toString()` method on a `Stylesheet` instance:

```ts
// the stylesheet we created above
import { stylesheet } from "./stylesheet";

const css = stylesheet.toString();
```
