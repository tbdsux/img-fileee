import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import * as React from "react";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import AppFooter from "~/components/footer";
import AppHeader from "~/components/header";
import { NotFound } from "~/components/NotFound";
import Providers from "~/components/providers";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "img-fileee",
        description: `A free image hosting. Upload / host images anonymously. No account required.`,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Providers>
        <div className="w-5/6 mx-auto">
          <AppHeader />

          <Outlet />

          <AppFooter />
        </div>
      </Providers>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? (
          <TanStackRouterDevtools position="bottom-right" />
        ) : (
          <>
            {/*  */}
            <script
              defer
              src="https://analytics.tbdh.dev/script.js"
              data-website-id="069aaef2-af0c-4f75-842b-34ad6bdfa518"
            ></script>
          </>
        )}

        <Scripts />
      </body>
    </html>
  );
}
