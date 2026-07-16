import { cn } from "@safari/shared";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

export function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-[var(--radius-card,1.25rem)] border border-border bg-card p-6",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
