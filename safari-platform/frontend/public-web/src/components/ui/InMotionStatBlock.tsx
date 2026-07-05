type InMotionStatBlockProps = {
  value: string;
  label: string;
};

export function InMotionStatBlock({ value, label }: InMotionStatBlockProps) {
  return (
    <div className="flex flex-col justify-center bg-white px-8 py-6 md:px-10 md:py-8">
      <p className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
        {label}
      </p>
    </div>
  );
}
