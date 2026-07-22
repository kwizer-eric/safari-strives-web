/**
 * This dev environment has a broken/unreachable IPv6 default route. Node's
 * default DNS result order races IPv4 and IPv6 (Happy Eyeballs); when the
 * IPv6 attempt hangs instead of failing fast, server-side fetches (image
 * optimizer, next/font) can time out even though IPv4 works fine.
 *
 * Load the Node-only fix only for the Node.js runtime — Edge cannot use
 * `node:dns`, and Turbopack will warn if that import lives in this file.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  await import("./instrumentation.node");
}
