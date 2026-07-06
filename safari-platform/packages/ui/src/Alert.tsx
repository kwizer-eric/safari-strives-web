import { cn } from "@safari/shared";

type AlertProps = {
  tone?: "info" | "success" | "warning" | "danger";
  title?: string;
  children: React.ReactNode;
  className?: string;
};

const toneStyles: Record<NonNullable<AlertProps["tone"]>, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-900",
  success: "border-green-200 bg-green-50 text-green-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  danger: "border-red-200 bg-red-50 text-red-900",
};

export function Alert({
  tone = "info",
  title,
  children,
  className,
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-lg border px-4 py-3 text-sm",
        toneStyles[tone],
        className,
      )}
    >
      {title && <p className="mb-1 font-semibold">{title}</p>}
      <div>{children}</div>
    </div>
  );
}
