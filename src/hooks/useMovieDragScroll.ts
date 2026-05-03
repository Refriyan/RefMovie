import { RefObject, useState } from "react";

export function useMovieDragScroll(
    scrollRef: RefObject<HTMLDivElement | null>
) {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        if (!scrollRef.current) return;

        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const onMouseLeave = () => {
        setIsDragging(false);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        if (!isDragging || !scrollRef.current) return;

        e.preventDefault();

        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;

        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return {
        isDragging,
        dragHandlers: {
            onMouseDown,
            onMouseLeave,
            onMouseUp,
            onMouseMove,
        },
    };
}