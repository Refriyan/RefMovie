import { RefObject } from "react";

export function useMovieRowControls(
  scrollRef: RefObject<HTMLDivElement | null>,
  scrollAmount: number = 500
) {
  const scrollLeft = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return {
    scrollLeft,
    scrollRight,
  };
}