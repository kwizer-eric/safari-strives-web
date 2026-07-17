export const AUTH_COOKIE = "safari_session";

export const DEFAULT_BACKEND_URL = "http://localhost:4000";

/** Single dev origin — portals are path prefixes, not separate ports. */
export const APP_ORIGIN = "http://localhost:3000";

export const APP_PATHS = {
  publicWeb: "/",
  adminDashboard: "/admin",
  applicantPortal: "/applicant",
  mentorPortal: "/mentor",
  partnerPortal: "/partner",
} as const;

export const APP_URLS = {
  applicantLogin: `${APP_PATHS.applicantPortal}/login`,
  adminLogin: `${APP_PATHS.adminDashboard}/login`,
  mentorLogin: `${APP_PATHS.mentorPortal}/login`,
  partnerLogin: `${APP_PATHS.partnerPortal}/login`,
} as const;
