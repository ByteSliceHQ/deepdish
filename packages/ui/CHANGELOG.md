# @deepdish/ui

## 0.15.0

### Minor Changes

- 6af4b8e: Replaced bun with pnpm for better workspace and monorepo support.

### Patch Changes

- Updated dependencies [6af4b8e]
  - @deepdish/stylesheet@0.5.0
  - @deepdish/resolvers@0.13.0
  - @deepdish/core@0.4.0

## 0.14.0

### Minor Changes

- a667382: Implemented type module for all packages.

### Patch Changes

- Updated dependencies [a667382]
  - @deepdish/stylesheet@0.4.0
  - @deepdish/resolvers@0.12.0
  - @deepdish/core@0.3.0

## 0.13.0

### Minor Changes

- 074e85d: Added esnext build to ui tsup.
- 074e85d: Ensured tsup target is esnext.

### Patch Changes

- Updated dependencies [074e85d]
- Updated dependencies [074e85d]
  - @deepdish/stylesheet@0.3.0
  - @deepdish/resolvers@0.11.0

## 0.12.1

### Patch Changes

- Updated dependencies [77200b9]
  - @deepdish/stylesheet@0.2.0

## 0.12.0

### Minor Changes

- bb99318: Removed dependency workspace prefix before publishing.

### Patch Changes

- 6c5105f: Improved error logging message.
- Updated dependencies [6c5105f]
  - @deepdish/core@0.2.0

## 0.11.1

### Patch Changes

- edd3954: Conditionally rendered context menu based on mode state.
- 142e359: Added "edit" mode styling.
- Updated dependencies [142e359]
  - @deepdish/core@0.1.1

## 0.11.0

### Minor Changes

- d9f40bd: Wrapped fetch with withResult.

## 0.10.0

### Minor Changes

- 0dbba28: Added `deriveKey` resolver option.

### Patch Changes

- 0dbba28: Downgraded `react-shadow-scope` dependency.

## 0.9.1

### Patch Changes

- a081592: Removed implicit environment dependencies.
- 0e2846c: Upgraded react-shadow-scope dependency.

## 0.9.0

### Minor Changes

- 3aeded1: Implemented initial dynamic collections.
- 79a5a52: Added authentication request memoization.
- 54b4a38: Wrapped "slotted" server components with client component "shell".

### Patch Changes

- 23ad29e: Upgraded React version.
- Updated dependencies [54b4a38]
- Updated dependencies [54b4a38]
- Updated dependencies [54b4a38]
  - @deepdish/core@0.1.0

## 0.8.0

### Minor Changes

- 0044589: Refactored authentication check.

## 0.7.0

### Minor Changes

- d1453b8: Added static collections.

## 0.6.7

### Patch Changes

- 9abb6a3: Included error in applicable log statements.
- 61ed2d1: Added log to indicate that a missing resolver prevents content updates.

## 0.6.6

### Patch Changes

- b6b988f: Exported configuration type.

## 0.6.5

### Patch Changes

- 0bde9ac: Added token introspection flow.

## 0.6.4

### Patch Changes

- df264ca: Exported ES modules only.

## 0.6.3

### Patch Changes

- ad024b1: Exported CommonJS for config and schemas.

## 0.6.2

### Patch Changes

- 378a8e0: Included CommonJS format for config and schemas.

## 0.6.1

### Patch Changes

- b61ca70: Added authentication callbacks to draft mode config.

## 0.6.0

### Minor Changes

- f8f4e4e: Enabled editing of missing content.
- bdb541d: Subsumed configuration into ui package.

## 0.5.6

### Patch Changes

- c144cf3: Fixed context menu editor accessibility controls.
- 6df662b: Implemented logger.

## 0.5.5

### Patch Changes

- 0f7596f: Added the context menu with content editing capabilities.

## 0.5.4

### Patch Changes

- f0f0635: Fixed configuration singleton issue.

## 0.5.3

### Patch Changes

- 88a2137: Added draft mode.
- 01c9add: Moved internal dependencies to dev dependency list.

## 0.5.2

### Patch Changes

- Updated dependencies [5f4b22b]
- Updated dependencies [e6014aa]
  - @deepdish/config@0.2.1

## 0.5.1

### Patch Changes

- 2db9038: Conditionally rendered fallback content when unable to retrieve contract.
- e230409: Conditionally rendered fallback content during read failure.
- Updated dependencies [2db9038]
  - @deepdish/config@0.2.0

## 0.5.0

### Minor Changes

- 3cceffd: Added Markdown and HTML formatting to the typography components.

## 0.4.0

### Minor Changes

- c7a2377: Consolidated configuration and schemas into separate package.

### Patch Changes

- Updated dependencies [c7a2377]
  - @deepdish/config@0.1.0

## 0.3.3

### Patch Changes

- f7b88d9: Partitioned configuration into distinct, configurable sections.

## 0.3.2

### Patch Changes

- cbdd36f: Added package bundling.
- Updated dependencies [27036ce]
- Updated dependencies [cbdd36f]
  - @deepdish/resolvers@0.3.0

## 0.3.1

### Patch Changes

- 4930f8e: Marked configuration attributes as read-only.

## 0.3.0

### Minor Changes

- 74b1043: Established configuration singleton pattern.

## 0.2.0

### Minor Changes

- 5bd74b5: Enabled declarative resolver mapping.
- 71aaf3c: Preferentially loaded resolver data into components.

### Patch Changes

- 562f976: Defined component schemas and inferred their types.
- Updated dependencies [6702635]
- Updated dependencies [562f976]
  - @deepdish/resolvers@0.2.0

## 0.1.0

### Minor Changes

- 77dce7e: Enforced typography components to render text only.
- ec618cc: Added individual heading components.
- 77dce7e: Added additional typography components.
- cc557ea: Initialized "drop-in" components of basic UI modules: link, media, typography.
