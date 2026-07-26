"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { parseExternalMediaUrl } from "@/lib/media-url";

type HeroBackgroundVideoProps = {
  src: string;
  label: string;
};

/**
 * Heroes: external video only (Cloudflare, Drive, YouTube).
 *
 * Drive share links cannot autoplay inside Google's /preview iframe, and our
 * old pointer-events-none blocked the play button — so Drive looked "broken".
 * We try a direct <video> stream first; if Google blocks it, fall back to the
 * preview iframe with clicks enabled so playback still works.
 */
export function HeroBackgroundVideo({ src, label }: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const parsed = useMemo(() => parseExternalMediaUrl(src), [src]);
  const [driveFallback, setDriveFallback] = useState(false);

  useEffect(() => {
    setDriveFallback(false);
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !parsed) return;

    const shouldPlay =
      parsed.kind === "direct-video" ||
      (parsed.kind === "google-drive" && !driveFallback);
    if (!shouldPlay) return;

    const playAttempt = video.play();
    if (playAttempt !== undefined) {
      playAttempt.catch(() => {
        /* Autoplay can fail; muted + playsInline usually works. */
      });
    }
  }, [parsed, driveFallback]);

  if (!parsed) {
    return (
      <div
        className="h-full w-full bg-dark"
        role="img"
        aria-label={label || "Hero background"}
      />
    );
  }

  if (parsed.kind === "youtube") {
    return (
      <iframe
        src={parsed.embedUrl}
        title={label || "Hero video"}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-full min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 border-0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (parsed.kind === "google-drive") {
    if (driveFallback) {
      return (
        <iframe
          src={parsed.embedUrl}
          title={label || "Hero video"}
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-full min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 border-0"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      );
    }

    return (
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-label={label}
        src={parsed.streamUrl}
        onError={() => setDriveFallback(true)}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      aria-label={label}
      src={parsed.embedUrl}
    />
  );
}
