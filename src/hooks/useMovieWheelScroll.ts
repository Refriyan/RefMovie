import { RefObject, useEffect } from "react";

export function useMovieWheelScroll(
    scrollRef: RefObject<HTMLDivElement | null>
) {
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();

                container.scrollBy({
                    left: e.deltaY,
                    behavior: "smooth",
                });
            }
        };

        container.addEventListener("wheel", handleWheel, {
            passive: false,
        });

        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    }, [scrollRef]);
}