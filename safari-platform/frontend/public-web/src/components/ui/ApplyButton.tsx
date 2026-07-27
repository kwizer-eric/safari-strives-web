"use client";

import { Button } from "@safari/ui";
import { isExternalApplyUrl, useApplyUrl } from "@/lib/apply-url";

type ApplyButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  showArrow?: boolean;
};

/** Sitewide Apply CTA — href comes from admin Partner Application settings. */
export function ApplyButton({
  children,
  className,
  variant = "primary",
  size = "md",
  showArrow,
}: ApplyButtonProps) {
  const href = useApplyUrl();
  const external = isExternalApplyUrl(href);

  return (
    <Button
      href={href || undefined}
      disabled={!href}
      variant={variant}
      size={size}
      showArrow={showArrow}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </Button>
  );
}
