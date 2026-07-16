import { cn } from "@safari/shared";

type StatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
};

export function StatCard({ label, value, hint, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card,1.25rem)] border border-border bg-card p-6",
        className,
      )}
    >
      <p className="mb-2 text-sm font-medium text-muted">{label}</p>
      <p className="mb-1 text-3xl font-bold text-foreground md:text-4xl">
        {value}
      </p>
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}
