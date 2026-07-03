import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
};

export function Logo({ className, imageClassName, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src={site.logo}
        alt={site.name}
        width={200}
        height={60}
        className={cn("h-12 w-auto object-contain md:h-14", imageClassName)}
        priority
      />
    </Link>
  );
}
