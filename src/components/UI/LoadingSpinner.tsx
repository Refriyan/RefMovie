// src/components/UI/LoadingSpinner.tsx

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function LoadingSpinner({
  size = "md",
  text = "Loading...",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8 border-2",
    md: "w-14 h-14 border-4",
    lg: "w-20 h-20 border-4",
  };

  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-16
        text-white
      "
    >
      <div
        className={`
          ${sizeClasses[size]}
          border-red-500
          border-t-transparent
          rounded-full
          animate-spin
          mb-5
        `}
      />

      <p
        className="
          text-slate-300
          text-sm
          md:text-base
          font-medium
          tracking-wide
        "
      >
        {text}
      </p>
    </div>
  );
}
