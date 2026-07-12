import Image from "next/image";
import Link from "next/link";
import { cn } from "@safari/shared";

type LogoProps = {
  src?: string;
  alt?: string;
  href?: string;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
};

export function Logo({
  src = "/logo/logo.png",
  alt = "Safari Strives",
  href = "/",
  className,
  imageClassName,
  onClick,
}: LogoProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn("inline-flex shrink-0 items-center", className)}
    >
      <Image
        src={src}
        alt={alt}
        width={156}
        height={122}
        className={cn("h-11 w-auto object-contain md:h-12", imageClassName)}
        priority
      />
    </Link>
  );
}
