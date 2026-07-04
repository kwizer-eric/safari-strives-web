import { cn } from "@safari/shared";

type TopBarProps = {
  children?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
};

export function TopBar({ children, right, className }: TopBarProps) {
  return (
    <header
      className={cn(
        "flex h-16 items-center justify-between border-b border-border bg-background px-6",
        className,
      )}
    >
      <div className="flex items-center gap-4">{children}</div>
      {right && <div className="flex items-center gap-3">{right}</div>}
    </header>
  );
}
