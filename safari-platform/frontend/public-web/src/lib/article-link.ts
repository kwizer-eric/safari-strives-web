import type { Article } from "@/types/content";
import {
  venturePosterUrl,
  youtubeIdFromMediaUrl,
} from "@/lib/media-url";

/** True when the article has a parseable YouTube videoUrl. */
export function articleIsVideo(article: Pick<Article, "videoUrl">): boolean {
  return Boolean(articleYoutubeWatchUrl(article));
}

/** Canonical YouTube watch URL, or null if videoUrl is missing/invalid. */
export function articleYoutubeWatchUrl(
  article: Pick<Article, "videoUrl">,
): string | null {
  const raw = article.videoUrl?.trim() ?? "";
  if (!raw) return null;
  const id = youtubeIdFromMediaUrl(raw);
  if (!id) return null;
  return `https://www.youtube.com/watch?v=${id}`;
}

/** Card / CTA destination — YouTube watch URL or in-app article path. */
export function articleHref(article: Pick<Article, "id" | "videoUrl">): string {
  return articleYoutubeWatchUrl(article) ?? `/field-notes/${article.id}`;
}

/** Cover image, falling back to the YouTube thumbnail when needed. */
export function articlePosterUrl(
  article: Pick<Article, "image" | "videoUrl">,
): string {
  return venturePosterUrl(article.image, article.videoUrl);
}
