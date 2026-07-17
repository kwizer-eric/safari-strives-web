import dns from "node:dns";

/**
 * This dev environment has a broken/unreachable IPv6 default route. Node's
 * default DNS result order races IPv4 and IPv6 (Happy Eyeballs); when the
 * IPv6 attempt hangs instead of failing fast, server-side fetches (image
 * optimizer, next/font) can time out even though IPv4 works fine.
 *
 * Forcing ipv4first here runs in the main server process (unlike
 * NODE_OPTIONS, which Next strips before spawning render/image workers), so
 * it reliably fixes fetch() calls made during SSR and image optimization.
 */
export function register() {
  dns.setDefaultResultOrder("ipv4first");
}
