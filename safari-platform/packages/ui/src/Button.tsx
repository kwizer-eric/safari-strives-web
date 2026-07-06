import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@safari/shared";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  showArrow = false,
  className,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
  };

  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover",
    secondary:
      "border border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5",
    ghost: "text-foreground hover:text-accent",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const classes = cn(baseStyles, sizes[size], variants[variant], className);

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
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
