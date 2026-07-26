"use client";

import Image, { type ImageProps } from "next/image";
import { shouldUnoptimizeCmsImage } from "@/lib/media-url";

/**
 * next/image wrapper for CMS / remote https URLs.
 * Unoptimized avoids Next's image optimizer proxy (often ETIMEDOUT on Unsplash/Cloudinary).
 */
export function CmsImage({ src, alt, ...rest }: ImageProps) {
  const source = typeof src === "string" ? src : "";
  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={shouldUnoptimizeCmsImage(source)}
      {...rest}
    />
  );
}
