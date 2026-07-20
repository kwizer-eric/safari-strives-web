"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type HeroBackgroundVideoProps = {
  src: string;
  posterSrc: string;
  label: string;
};

export function HeroBackgroundVideo({
  src,
  posterSrc,
  label,
}: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setUseFallback(false);
    let cancelled = false;

    const fallback = () => {
      if (!cancelled) setUseFallback(true);
    };

    const onError = () => fallback();

    video.addEventListener("error", onError);

    if (src.startsWith("/")) {
      fetch(src, { method: "HEAD" })
        .then((res) => {
          if (!res.ok) fallback();
        })
        .catch(fallback);
    }

    const playAttempt = video.play();
    if (playAttempt !== undefined) {
      playAttempt.catch(() => {
        if (video.readyState < 2) fallback();
      });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("error", onError);
    };
  }, [src]);

  if (useFallback) {
    return (
      <Image
        src={posterSrc}
        alt={label}
        fill
        priority
        className="object-cover"
        sizes="100vw"
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
      poster={posterSrc}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
