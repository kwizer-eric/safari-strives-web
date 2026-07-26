/**
 * Normalize and classify external media links for heroes and CMS fields.
 * Local paths (/videos/...), data URLs, and relative uploads are rejected.
 *
 * Why: heroes need muted autoplay. YouTube and direct Cloudflare URLs support
 * that natively. Google Drive share links do not — we convert them to a
 * streamable URL for <video>, with /preview iframe as a last resort.
 */

export type ExternalMediaKind = "youtube" | "google-drive" | "direct-video";

export type ParsedExternalMedia = {
  kind: ExternalMediaKind;
  /** URL for <video src> or iframe src (primary render target) */
  embedUrl: string;
  /** Drive-only: HTML5 video stream attempt before iframe fallback */
  streamUrl?: string;
  originalUrl: string;
};

const ALLOWED_HINT =
  "Use an https link from Cloudflare (Stream/R2), Google Drive, or YouTube.";

export function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Reject local public paths, data URLs, and non-https links. */
export function isAllowedExternalMediaUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("/") || trimmed.startsWith("data:")) return false;
  return isHttpsUrl(trimmed);
}

export function mediaUrlValidationMessage(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "URL is required.";
  if (trimmed.startsWith("/") || trimmed.startsWith("data:")) {
    return `Local files are not allowed. ${ALLOWED_HINT}`;
  }
  if (!isHttpsUrl(trimmed)) {
    return `Enter a valid https URL. ${ALLOWED_HINT}`;
  }
  return null;
}

function youtubeIdFromUrl(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host === "youtu.be") {
    return url.pathname.split("/").filter(Boolean)[0] || null;
  }
  if (
    host === "youtube.com" ||
    host === "m.youtube.com" ||
    host === "youtube-nocookie.com"
  ) {
    if (url.pathname.startsWith("/embed/")) {
      return url.pathname.split("/")[2] || null;
    }
    if (url.pathname.startsWith("/shorts/")) {
      return url.pathname.split("/")[2] || null;
    }
    return url.searchParams.get("v");
  }
  return null;
}

/** Extract a YouTube video id from a full URL or a bare id string. */
export function youtubeIdFromMediaUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  if (/^[\w-]{6,}$/.test(trimmed) && !trimmed.includes(".")) return trimmed;
  try {
    return youtubeIdFromUrl(new URL(trimmed));
  } catch {
    return null;
  }
}

/** Poster image for a venturist card from video URL or existing image. */
export function venturePosterUrl(image: string, videoUrl?: string): string {
  if (image.trim()) return image.trim();
  const ytId = videoUrl ? youtubeIdFromMediaUrl(videoUrl) : null;
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  return "";
}

function googleDriveFileId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "drive.google.com" && host !== "docs.google.com") return null;

  // https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.pathname.match(/\/file\/d\/([^/]+)/);
  if (fileMatch?.[1]) return fileMatch[1];

  // https://drive.google.com/open?id=FILE_ID
  // https://drive.google.com/uc?id=FILE_ID&export=download
  const idParam = url.searchParams.get("id");
  if (idParam) return idParam;

  return null;
}

/**
 * Parse a CMS media URL into something the hero can render.
 * Returns null if the URL is not an allowed external link.
 */
export function parseExternalMediaUrl(raw: string): ParsedExternalMedia | null {
  const originalUrl = raw.trim();
  if (!isAllowedExternalMediaUrl(originalUrl)) return null;

  let url: URL;
  try {
    url = new URL(originalUrl);
  } catch {
    return null;
  }

  const ytId = youtubeIdFromUrl(url);
  if (ytId) {
    return {
      kind: "youtube",
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${ytId}&playsinline=1&rel=0`,
      originalUrl,
    };
  }

  const driveId = googleDriveFileId(url);
  if (driveId) {
    return {
      kind: "google-drive",
      // confirm=t skips the large-file virus-scan interstitial when possible
      streamUrl: `https://drive.google.com/uc?export=download&confirm=t&id=${driveId}`,
      embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      originalUrl,
    };
  }

  // Cloudflare Stream/R2 and other direct https video URLs
  return {
    kind: "direct-video",
    embedUrl: originalUrl,
    originalUrl,
  };
}
