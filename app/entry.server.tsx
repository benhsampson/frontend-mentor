import type {EntryContext} from "@remix-run/node"
import {RemixServer} from "@remix-run/react"
import {renderToString} from "react-dom/server"
import {createStitches} from "@stitches/react"

const {getCssText} = createStitches()

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  let markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  )

  const css = getCssText()

  markup = markup.replace("__STYLES__", `<style id="stitches">${css}</style>`)

  responseHeaders.set("Content-Type", "text/html")

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
