// src/components/UI/GlassButton.tsx

import { ReactNode } from "react";

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

export default function GlassButton({
  children,
  onClick,
  href,
  icon,
  variant = "primary",
}: GlassButtonProps) {
  const baseClass = `
    inline-flex
    items-center
    justify-center
    gap-3
    px-6
    py-3
    rounded-2xl
    font-semibold
    transition-all
    duration-300
    backdrop-blur-xl
    border
  `;

  const variants = {
    primary: `
      bg-red-500
      hover:bg-red-600
      text-white
      border-red-500
      shadow-lg
      hover:shadow-red-500/30
    `,
    secondary: `
      bg-white/10
      hover:bg-white/15
      text-white
      border-white/10
    `,
  };

  if (href) {
    return (
      <a href={href} className={`${baseClass} ${variants[variant]}`}>
        {icon}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClass} ${variants[variant]}`}>
      {icon}
      {children}
    </button>
  );
}
