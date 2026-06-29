interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
  wide?: boolean;
}

export function SectionHeader({
  title,
  description,
  className = "",
  align = "center",
  wide = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const widthClass = wide ? "max-w-4xl" : "max-w-3xl";

  return (
    <div className={`${widthClass} ${alignClass} ${className}`}>
      <h2 className="section-title">{title}</h2>
      {description && (
        <p
          className={`section-description mt-4 sm:mt-5 text-sm sm:text-base md:text-lg px-1 ${wide ? "max-w-none" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
