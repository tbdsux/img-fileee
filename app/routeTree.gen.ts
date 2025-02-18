/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as TermsServiceIndexImport } from './routes/terms-service/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TermsServiceIndexRoute = TermsServiceIndexImport.update({
  id: '/terms-service/',
  path: '/terms-service/',
  getParentRoute: () => rootRoute,
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
    '/terms-service/': {
      id: '/terms-service/'
      path: '/terms-service'
      fullPath: '/terms-service'
      preLoaderRoute: typeof TermsServiceIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/terms-service': typeof TermsServiceIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/terms-service': typeof TermsServiceIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/terms-service/': typeof TermsServiceIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/terms-service'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/terms-service'
  id: '__root__' | '/' | '/terms-service/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  TermsServiceIndexRoute: typeof TermsServiceIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  TermsServiceIndexRoute: TermsServiceIndexRoute,
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
        "/terms-service/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/terms-service/": {
      "filePath": "terms-service/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
