/**
 * Normalize and classify external media links for heroes and CMS fields.
 *
 * Primary video hosts: Cloudinary, Cloudflare Stream/R2, YouTube, Google Drive.
 * Cloudinary image/video URLs often have no file extension — detect by path
 * (`/image/upload/` vs `/video/upload/`), not only by `.jpg` / `.mp4`.
 */

export type ExternalMediaKind =
  | "youtube"
  | "google-drive"
  | "direct-video"
  | "image";

export type ParsedExternalMedia = {
  kind: ExternalMediaKind;
  /** URL for <video src>, iframe src, or <img src> */
  embedUrl: string;
  /** Drive-only: HTML5 video stream attempt before iframe fallback */
  streamUrl?: string;
  originalUrl: string;
};

const ALLOWED_HINT =
  "Use an https link from Cloudinary, Cloudflare (Stream/R2), Google Drive, or YouTube.";

export function isHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isCloudinaryHost(hostname: string): boolean {
  const host = hostname.replace(/^www\./, "").toLowerCase();
  return host === "res.cloudinary.com" || host.endsWith(".cloudinary.com");
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

/**
 * True for photo URLs — including Cloudinary `/image/upload/` paths that
 * have no .jpg/.png suffix (common delivery URLs).
 */
export function looksLikeImageUrl(raw: string): boolean {
  const trimmed = raw.trim();
  if (!trimmed) return false;

  if (/\.(jpg|jpeg|png|webp|gif|avif|svg)(\?|#|$)/i.test(trimmed)) {
    return true;
  }

  try {
    const url = new URL(trimmed);
    if (!isCloudinaryHost(url.hostname)) return false;
    const path = url.pathname.toLowerCase();
    if (path.includes("/image/upload/")) return true;
    if (path.includes("/image/fetch/")) return true;
    // Explicit video path is never an image
    if (path.includes("/video/upload/")) return false;
    return false;
  } catch {
    return false;
  }
}

export function isCloudinaryVideoUrl(raw: string): boolean {
  try {
    const url = new URL(raw.trim());
    if (!isCloudinaryHost(url.hostname)) return false;
    return url.pathname.toLowerCase().includes("/video/upload/");
  } catch {
    return false;
  }
}

/** Still frame from a Cloudinary video for cards / posters. */
export function cloudinaryVideoPosterUrl(raw: string): string | null {
  try {
    const url = new URL(raw.trim());
    if (!isCloudinaryHost(url.hostname)) return null;
    if (!url.pathname.toLowerCase().includes("/video/upload/")) return null;

    // Insert so_0 (first frame) after /video/upload/ and force .jpg delivery.
    let path = url.pathname.replace(
      /\/video\/upload\//i,
      "/video/upload/so_0/",
    );
    path = path.replace(/\.(mp4|webm|mov|m3u8)$/i, "");
    if (!/\.jpe?g$/i.test(path)) path = `${path}.jpg`;
    url.pathname = path;
    return url.toString();
  } catch {
    return null;
  }
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

/**
 * Poster for a venturist card. Video is primary — prefer a frame from the
 * video URL (YouTube / Cloudinary), then fall back to a still image.
 */
export function venturePosterUrl(image: string, videoUrl?: string): string {
  const video = videoUrl?.trim() ?? "";
  if (video) {
    const ytId = youtubeIdFromMediaUrl(video);
    if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    const cloudPoster = cloudinaryVideoPosterUrl(video);
    if (cloudPoster) return cloudPoster;
  }
  if (image.trim()) return image.trim();
  return "";
}

/** Skip next/image optimizer for remote https (avoids server-side fetch timeouts). */
export function shouldUnoptimizeCmsImage(src: string): boolean {
  const trimmed = src.trim();
  if (!trimmed || trimmed.startsWith("/")) return false;
  try {
    const url = new URL(trimmed);
    return isCloudinaryHost(url.hostname) || url.protocol === "https:";
  } catch {
    return false;
  }
}

function googleDriveFileId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "drive.google.com" && host !== "docs.google.com") return null;

  const fileMatch = url.pathname.match(/\/file\/d\/([^/]+)/);
  if (fileMatch?.[1]) return fileMatch[1];

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

  // Photos first — Cloudinary image URLs must not be fed into <video>.
  if (looksLikeImageUrl(originalUrl)) {
    return {
      kind: "image",
      embedUrl: originalUrl,
      originalUrl,
    };
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
      streamUrl: `https://drive.google.com/uc?export=download&confirm=t&id=${driveId}`,
      embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      originalUrl,
    };
  }

  // Cloudinary video, Cloudflare Stream/R2, and other direct https video URLs
  return {
    kind: "direct-video",
    embedUrl: originalUrl,
    originalUrl,
  };
}
