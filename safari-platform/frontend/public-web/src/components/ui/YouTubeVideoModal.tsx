"use client";

import { useCallback, useEffect } from "react";
import { X } from "lucide-react";

function buildVideoSrc(
  videoId: string,
  videoStart: number,
  autoplay: boolean,
) {
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    start: String(videoStart),
    controls: "1",
    rel: "0",
    cc_load_policy: "0",
    modestbranding: "1",
    playsinline: "1",
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

type YouTubeVideoModalProps = {
  open: boolean;
  onClose: () => void;
  videoId: string;
  videoStart?: number;
  title?: string;
  autoplay?: boolean;
};

export function YouTubeVideoModal({
  open,
  onClose,
  videoId,
  videoStart = 0,
  title = "Video player",
  autoplay = true,
}: YouTubeVideoModalProps) {
  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      onClick={close}
    >
      <div
        className="relative aspect-video w-full max-w-5xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          className="absolute -right-2 -top-12 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:-right-3 md:-top-12"
          aria-label="Close video"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <iframe
          src={buildVideoSrc(videoId, videoStart, autoplay)}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          className="absolute inset-0 h-full w-full rounded-lg border-0"
        />
      </div>
    </div>
  );
}
