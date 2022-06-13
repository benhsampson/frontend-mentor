import type {MetaFunction} from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import {globalCss} from "@stitches/react"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
})

const globalStyles = globalCss({
  "*, *::before, *::after": {
    boxSizing: "border-box",
  },
  "*": {
    margin: 0,
    padding: 0,
    border: 0,
    fontSize: 1,
    font: "inherit",
    verticalAlign: "baseline",
  },
  "article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section":
    {
      display: "block",
    },
  body: {lineHeight: 1},
  "ol, ul": {listStyle: "none"},
  "blockquote, q": {quotes: "none"},
  "blockquote:before, blockquote:after, q:before, q:after": {
    content: "none",
  },
  table: {
    borderCollapse: "collapse",
    borderSpacing: 0,
  },
})

export default function App() {
  globalStyles()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
