interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8 md:mb-10">
      <h2
        className="
          text-2xl
          md:text-4xl
          font-extrabold
          tracking-tight
          text-white
          flex
          items-center
          gap-3
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="
            text-slate-400
            mt-3
            text-sm
            md:text-base
            max-w-2xl
          "
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
