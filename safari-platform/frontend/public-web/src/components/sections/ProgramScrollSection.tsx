"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@safari/shared";
import { Container } from "@safari/ui";
import { ProgramHorizontalCard, PROGRAM_CARD_WIDTH_CLASS } from "@/components/ui/ProgramHorizontalCard";

const CARD_GAP_PX = 12;
const CARD_COVER_MIN_SCALE = 0.84;

type ProgramPillar = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
};

type ProgramScrollSectionProps = {
  title: string;
  pillars: readonly ProgramPillar[];
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getCardOffset(
  cardIndex: number,
  progress: number,
  cardWidth: number,
  totalCards: number,
) {
  if (cardIndex === 0) return 0;

  const step = cardWidth + CARD_GAP_PX;
  const transitions = totalCards - 1;

  return Math.max(0, (cardIndex - progress * transitions) * step);
}

function getCardScale(
  cardIndex: number,
  progress: number,
  totalCards: number,
) {
  const transitions = totalCards - 1;
  if (cardIndex >= transitions) return 1;

  const segmentSize = 1 / transitions;
  const segmentStart = cardIndex * segmentSize;
  const segmentEnd = (cardIndex + 1) * segmentSize;

  if (progress <= segmentStart) return 1;
  if (progress >= segmentEnd) return CARD_COVER_MIN_SCALE;

  const t = (progress - segmentStart) / segmentSize;
  return 1 - t * (1 - CARD_COVER_MIN_SCALE);
}

export function ProgramScrollSection({
  title,
  pillars,
}: ProgramScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollLinked, setScrollLinked] = useState(false);
  const [stackHeight, setStackHeight] = useState<number | undefined>();

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    if (!section || !viewport) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px)");

    const isScrollLinked = () =>
      desktopQuery.matches && !motionQuery.matches;

    const getCardWidth = () =>
      Math.max(...cardRefs.current.map((card) => card?.offsetWidth ?? 0), 0);

    const resetCardTransforms = () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.transform = "";
        card.style.transformOrigin = "";
        card.style.visibility = "";
      });
    };

    const setSectionHeight = () => {
      if (!isScrollLinked()) {
        section.style.height = "";
        resetCardTransforms();
        setStackHeight(undefined);
        setScrollLinked((prev) => (prev ? false : prev));
        return;
      }

      const transitions = Math.max(pillars.length - 1, 1);
      const coverScrollSpan = window.innerHeight;
      section.style.height = `${window.innerHeight * transitions + coverScrollSpan}px`;
      setScrollLinked((prev) => (prev ? prev : true));
    };

    const scheduleLayoutUpdate = () => {
      requestAnimationFrame(() => {
        updateStackHeight();
        updateScroll();
      });
    };

    const updateStackHeight = () => {
      const heights = cardRefs.current.map((card) => card?.offsetHeight ?? 0);
      const maxHeight = Math.max(...heights, 0);
      if (maxHeight > 0) setStackHeight(maxHeight);
    };

    const updateScroll = () => {
      if (!isScrollLinked()) {
        resetCardTransforms();
        return;
      }

      const cardWidth = getCardWidth();
      if (cardWidth === 0) return;

      const coverScrollSpan = window.innerHeight;
      const cardScrollSpan =
        section.offsetHeight - window.innerHeight - coverScrollSpan;
      if (cardScrollSpan <= 0) return;

      const progress = clamp(
        (window.scrollY - section.offsetTop) / cardScrollSpan,
        0,
        1,
      );

      const frontCardIndex = pillars.length - 1;

      pillars.forEach((_, index) => {
        const card = cardRefs.current[index];
        if (!card) return;

        if (progress >= 1) {
          card.style.transform = "";
          card.style.transformOrigin = "";
          card.style.visibility =
            index < frontCardIndex ? "hidden" : "";
          return;
        }

        card.style.visibility = "";

        const offsetX = getCardOffset(index, progress, cardWidth, pillars.length);
        const scale = getCardScale(index, progress, pillars.length);
        card.style.transform = `translate3d(${offsetX}px, 0, 0) scale(${scale})`;
        card.style.transformOrigin = "left center";
      });
    };

    const onChange = () => {
      setSectionHeight();
      scheduleLayoutUpdate();
    };

    setSectionHeight();
    scheduleLayoutUpdate();

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", onChange);
    motionQuery.addEventListener("change", onChange);
    desktopQuery.addEventListener("change", onChange);

    const resizeObserver = new ResizeObserver(() => {
      scheduleLayoutUpdate();
    });
    resizeObserver.observe(viewport);
    cardRefs.current.forEach((card) => {
      if (card) resizeObserver.observe(card);
    });

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", onChange);
      motionQuery.removeEventListener("change", onChange);
      desktopQuery.removeEventListener("change", onChange);
      resizeObserver.disconnect();
      section.style.height = "";
      resetCardTransforms();
    };
  }, [pillars, scrollLinked]);

  return (
    <section
      ref={sectionRef}
      id="explore"
      aria-labelledby="explore-heading"
      className="relative z-0 isolate bg-background"
    >
      <div className="sticky top-20 z-0 bg-background">
        <div className="flex min-h-[calc(100vh-5rem)] items-center overflow-hidden py-14 md:py-20">
        <Container className="w-full">
          <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-4 md:gap-10">
            <h2
              id="explore-heading"
              className="text-sm font-semibold uppercase tracking-widest text-muted md:col-span-1 md:pt-2"
            >
              {title}
            </h2>

            {scrollLinked ? (
              <div
                ref={viewportRef}
                className="relative isolate min-w-0 overflow-hidden pb-2 md:col-span-3"
                style={stackHeight ? { height: stackHeight } : undefined}
              >
                {pillars.map((pillar, index) => (
                  <div
                    key={pillar.id}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className={cn(
                      "absolute top-0 left-0",
                      PROGRAM_CARD_WIDTH_CLASS,
                    )}
                    style={{
                      zIndex: index + 1,
                      ...(stackHeight
                        ? { height: stackHeight, minHeight: stackHeight }
                        : undefined),
                    }}
                  >
                    <ProgramHorizontalCard
                      title={pillar.title}
                      description={pillar.description}
                      image={pillar.image}
                      imageAlt={pillar.imageAlt}
                      href={pillar.href}
                      fillHeight
                      className="h-full"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                ref={viewportRef}
                className="min-w-0 snap-x snap-mandatory overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:col-span-3 [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex gap-3">
                  {pillars.map((pillar) => (
                    <ProgramHorizontalCard
                      key={pillar.id}
                      title={pillar.title}
                      description={pillar.description}
                      image={pillar.image}
                      imageAlt={pillar.imageAlt}
                      href={pillar.href}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
        </div>
      </div>
    </section>
  );
}
