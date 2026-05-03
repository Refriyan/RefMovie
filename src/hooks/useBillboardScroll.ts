import { RefObject, useEffect } from "react";

export function useBillboardScroll(
    scrollRef: RefObject<HTMLDivElement | null>
) {
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let animationFrame: number;
        const speed = 0.4;

        const autoScroll = () => {
            container.scrollLeft += speed;

            if (
                container.scrollLeft >=
                container.scrollWidth - container.clientWidth
            ) {
                container.scrollLeft = 0;
            }

            animationFrame = requestAnimationFrame(autoScroll);
        };

        animationFrame = requestAnimationFrame(autoScroll);

        const stopScroll = () => {
            cancelAnimationFrame(animationFrame);
        };

        const resumeScroll = () => {
            animationFrame = requestAnimationFrame(autoScroll);
        };

        container.addEventListener("mouseenter", stopScroll);
        container.addEventListener("mouseleave", resumeScroll);

        return () => {
            cancelAnimationFrame(animationFrame);
            container.removeEventListener("mouseenter", stopScroll);
            container.removeEventListener("mouseleave", resumeScroll);
        };
    }, [scrollRef]);
}