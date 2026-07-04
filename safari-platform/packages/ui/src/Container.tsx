import { cn } from "@safari/shared";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("w-full px-[var(--site-gutter,32px)]", className)}>
      {children}
    </div>
  );
}
