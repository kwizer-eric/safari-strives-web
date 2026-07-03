import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function Button({
  href,
  children,
  variant = "primary",
  showArrow = false,
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover",
    secondary:
      "border border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5",
    ghost: "text-foreground hover:text-accent",
  };

  const classes = cn(baseStyles, variants[variant], className);

  const content = (
    <>
      {children}
      {showArrow && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
