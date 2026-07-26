"use client";

import Image, { type ImageProps } from "next/image";
import { shouldUnoptimizeCmsImage } from "@/lib/media-url";

/**
 * next/image wrapper for CMS URLs (Cloudinary, etc.).
 * Unoptimized remote https avoids broken optimizer fetches for Cloudinary.
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
