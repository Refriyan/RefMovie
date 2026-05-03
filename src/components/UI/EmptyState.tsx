// src/components/UI/EmptyState.tsx

interface EmptyStateProps {
  title: string;
  description: string;
}

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        text-center
        py-20
        px-6
      "
    >
      <div
        className="
          w-24
          h-24
          rounded-full
          bg-slate-800
          flex
          items-center
          justify-center
          text-4xl
          mb-6
        "
      >
        🎬
      </div>

      <h2
        className="
          text-2xl
          md:text-3xl
          font-bold
          text-white
          mb-3
        "
      >
        {title}
      </h2>

      <p
        className="
          text-slate-400
          max-w-md
          leading-relaxed
        "
      >
        {description}
      </p>
    </div>
  );
}
