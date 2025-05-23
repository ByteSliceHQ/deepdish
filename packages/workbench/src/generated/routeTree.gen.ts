/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './../routes/__root'
import { Route as ToneImport } from './../routes/tone'
import { Route as LogsImport } from './../routes/logs'
import { Route as I18nImport } from './../routes/i18n'
import { Route as IndexImport } from './../routes/index'
import { Route as CatalogIndexImport } from './../routes/catalog/index'
import { Route as CatalogContractImport } from './../routes/catalog/$contract'
import { Route as CatalogContractIndexImport } from './../routes/catalog/$contract/index'
import { Route as CatalogContractNewImport } from './../routes/catalog/$contract/new'
import { Route as CatalogContractKeyImport } from './../routes/catalog/$contract/$key'

// Create/Update Routes

const ToneRoute = ToneImport.update({
  id: '/tone',
  path: '/tone',
  getParentRoute: () => rootRoute,
} as any)

const LogsRoute = LogsImport.update({
  id: '/logs',
  path: '/logs',
  getParentRoute: () => rootRoute,
} as any)

const I18nRoute = I18nImport.update({
  id: '/i18n',
  path: '/i18n',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const CatalogIndexRoute = CatalogIndexImport.update({
  id: '/catalog/',
  path: '/catalog/',
  getParentRoute: () => rootRoute,
} as any)

const CatalogContractRoute = CatalogContractImport.update({
  id: '/catalog/$contract',
  path: '/catalog/$contract',
  getParentRoute: () => rootRoute,
} as any)

const CatalogContractIndexRoute = CatalogContractIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => CatalogContractRoute,
} as any)

const CatalogContractNewRoute = CatalogContractNewImport.update({
  id: '/new',
  path: '/new',
  getParentRoute: () => CatalogContractRoute,
} as any)

const CatalogContractKeyRoute = CatalogContractKeyImport.update({
  id: '/$key',
  path: '/$key',
  getParentRoute: () => CatalogContractRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/i18n': {
      id: '/i18n'
      path: '/i18n'
      fullPath: '/i18n'
      preLoaderRoute: typeof I18nImport
      parentRoute: typeof rootRoute
    }
    '/logs': {
      id: '/logs'
      path: '/logs'
      fullPath: '/logs'
      preLoaderRoute: typeof LogsImport
      parentRoute: typeof rootRoute
    }
    '/tone': {
      id: '/tone'
      path: '/tone'
      fullPath: '/tone'
      preLoaderRoute: typeof ToneImport
      parentRoute: typeof rootRoute
    }
    '/catalog/$contract': {
      id: '/catalog/$contract'
      path: '/catalog/$contract'
      fullPath: '/catalog/$contract'
      preLoaderRoute: typeof CatalogContractImport
      parentRoute: typeof rootRoute
    }
    '/catalog/': {
      id: '/catalog/'
      path: '/catalog'
      fullPath: '/catalog'
      preLoaderRoute: typeof CatalogIndexImport
      parentRoute: typeof rootRoute
    }
    '/catalog/$contract/$key': {
      id: '/catalog/$contract/$key'
      path: '/$key'
      fullPath: '/catalog/$contract/$key'
      preLoaderRoute: typeof CatalogContractKeyImport
      parentRoute: typeof CatalogContractImport
    }
    '/catalog/$contract/new': {
      id: '/catalog/$contract/new'
      path: '/new'
      fullPath: '/catalog/$contract/new'
      preLoaderRoute: typeof CatalogContractNewImport
      parentRoute: typeof CatalogContractImport
    }
    '/catalog/$contract/': {
      id: '/catalog/$contract/'
      path: '/'
      fullPath: '/catalog/$contract/'
      preLoaderRoute: typeof CatalogContractIndexImport
      parentRoute: typeof CatalogContractImport
    }
  }
}

// Create and export the route tree

interface CatalogContractRouteChildren {
  CatalogContractKeyRoute: typeof CatalogContractKeyRoute
  CatalogContractNewRoute: typeof CatalogContractNewRoute
  CatalogContractIndexRoute: typeof CatalogContractIndexRoute
}

const CatalogContractRouteChildren: CatalogContractRouteChildren = {
  CatalogContractKeyRoute: CatalogContractKeyRoute,
  CatalogContractNewRoute: CatalogContractNewRoute,
  CatalogContractIndexRoute: CatalogContractIndexRoute,
}

const CatalogContractRouteWithChildren = CatalogContractRoute._addFileChildren(
  CatalogContractRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/i18n': typeof I18nRoute
  '/logs': typeof LogsRoute
  '/tone': typeof ToneRoute
  '/catalog/$contract': typeof CatalogContractRouteWithChildren
  '/catalog': typeof CatalogIndexRoute
  '/catalog/$contract/$key': typeof CatalogContractKeyRoute
  '/catalog/$contract/new': typeof CatalogContractNewRoute
  '/catalog/$contract/': typeof CatalogContractIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/i18n': typeof I18nRoute
  '/logs': typeof LogsRoute
  '/tone': typeof ToneRoute
  '/catalog': typeof CatalogIndexRoute
  '/catalog/$contract/$key': typeof CatalogContractKeyRoute
  '/catalog/$contract/new': typeof CatalogContractNewRoute
  '/catalog/$contract': typeof CatalogContractIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/i18n': typeof I18nRoute
  '/logs': typeof LogsRoute
  '/tone': typeof ToneRoute
  '/catalog/$contract': typeof CatalogContractRouteWithChildren
  '/catalog/': typeof CatalogIndexRoute
  '/catalog/$contract/$key': typeof CatalogContractKeyRoute
  '/catalog/$contract/new': typeof CatalogContractNewRoute
  '/catalog/$contract/': typeof CatalogContractIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/i18n'
    | '/logs'
    | '/tone'
    | '/catalog/$contract'
    | '/catalog'
    | '/catalog/$contract/$key'
    | '/catalog/$contract/new'
    | '/catalog/$contract/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/i18n'
    | '/logs'
    | '/tone'
    | '/catalog'
    | '/catalog/$contract/$key'
    | '/catalog/$contract/new'
    | '/catalog/$contract'
  id:
    | '__root__'
    | '/'
    | '/i18n'
    | '/logs'
    | '/tone'
    | '/catalog/$contract'
    | '/catalog/'
    | '/catalog/$contract/$key'
    | '/catalog/$contract/new'
    | '/catalog/$contract/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  I18nRoute: typeof I18nRoute
  LogsRoute: typeof LogsRoute
  ToneRoute: typeof ToneRoute
  CatalogContractRoute: typeof CatalogContractRouteWithChildren
  CatalogIndexRoute: typeof CatalogIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  I18nRoute: I18nRoute,
  LogsRoute: LogsRoute,
  ToneRoute: ToneRoute,
  CatalogContractRoute: CatalogContractRouteWithChildren,
  CatalogIndexRoute: CatalogIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/i18n",
        "/logs",
        "/tone",
        "/catalog/$contract",
        "/catalog/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/i18n": {
      "filePath": "i18n.tsx"
    },
    "/logs": {
      "filePath": "logs.tsx"
    },
    "/tone": {
      "filePath": "tone.tsx"
    },
    "/catalog/$contract": {
      "filePath": "catalog/$contract.tsx",
      "children": [
        "/catalog/$contract/$key",
        "/catalog/$contract/new",
        "/catalog/$contract/"
      ]
    },
    "/catalog/": {
      "filePath": "catalog/index.tsx"
    },
    "/catalog/$contract/$key": {
      "filePath": "catalog/$contract/$key.tsx",
      "parent": "/catalog/$contract"
    },
    "/catalog/$contract/new": {
      "filePath": "catalog/$contract/new.tsx",
      "parent": "/catalog/$contract"
    },
    "/catalog/$contract/": {
      "filePath": "catalog/$contract/index.tsx",
      "parent": "/catalog/$contract"
    }
  }
}
ROUTE_MANIFEST_END */
