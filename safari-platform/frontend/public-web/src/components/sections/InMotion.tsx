import Image from "next/image";
import { home } from "@/data/home";
import { InMotionStatBlock } from "@/components/ui/InMotionStatBlock";

export function InMotion() {
  const { inMotion } = home;

  return (
    <section
      id="in-motion"
      aria-label="In Motion"
      className="relative z-10 overflow-hidden md:-mt-[100vh] md:-mb-[100vh]"
    >
      <div className="grid min-h-[min(100vh,720px)] md:grid-cols-[1.45fr_1fr]">
        <div className="relative min-h-[280px] md:min-h-0">
          <Image
            src={inMotion.image}
            alt={inMotion.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 65vw"
          />
        </div>

        <div className="grid h-full grid-rows-4 divide-y divide-border bg-white">
          {inMotion.stats.map((stat) => (
            <InMotionStatBlock
              key={stat.label}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
