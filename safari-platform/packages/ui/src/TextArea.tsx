import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@safari/shared";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ label, hint, error, className, id, ...rest }, ref) {
    const inputId = id ?? rest.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          className={cn(
            "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30",
            error &&
              "border-red-400 focus:border-red-500 focus:ring-red-500/30",
            className,
          )}
          {...rest}
        />
        {error ? (
          <p className="text-xs text-red-600" role="alert">
            {error}
          </p>
        ) : hint ? (
          <p className="text-xs text-muted">{hint}</p>
        ) : null}
      </div>
    );
  },
);
