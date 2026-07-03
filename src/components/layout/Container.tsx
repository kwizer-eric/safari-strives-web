import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full px-[var(--site-gutter)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
