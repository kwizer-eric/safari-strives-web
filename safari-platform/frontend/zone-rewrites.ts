/** Internal dev ports for portal apps (accessed via public-web rewrites on :3000). */
export const ZONE_DEV_PORTS = {
  admin: 3001,
  applicant: 3002,
  mentor: 3003,
  partner: 3004,
} as const;

export const ZONE_BASE_PATHS = {
  admin: "/admin",
  applicant: "/applicant",
  mentor: "/mentor",
  partner: "/partner",
} as const;

type ZoneKey = keyof typeof ZONE_DEV_PORTS;

const ZONES: { key: ZoneKey; basePath: string; port: number }[] = [
  { key: "admin", basePath: ZONE_BASE_PATHS.admin, port: ZONE_DEV_PORTS.admin },
  {
    key: "applicant",
    basePath: ZONE_BASE_PATHS.applicant,
    port: ZONE_DEV_PORTS.applicant,
  },
  { key: "mentor", basePath: ZONE_BASE_PATHS.mentor, port: ZONE_DEV_PORTS.mentor },
  {
    key: "partner",
    basePath: ZONE_BASE_PATHS.partner,
    port: ZONE_DEV_PORTS.partner,
  },
];

/** Proxy portal routes to their dev servers (Next.js multi-zones). */
export function zoneRewrites() {
  return ZONES.flatMap(({ basePath, port }) => [
    {
      source: basePath,
      destination: `http://localhost:${port}${basePath}`,
    },
    {
      source: `${basePath}/:path*`,
      destination: `http://localhost:${port}${basePath}/:path*`,
    },
  ]);
}
