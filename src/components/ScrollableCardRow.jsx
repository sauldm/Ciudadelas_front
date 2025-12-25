import { useEffect, useRef, useState } from "react";
import { scrollLeft, scrollRight } from "../utils/horizontalScroll";

export default function ScrollableCardRow({ children }) {
    const rowRef = useRef(null);
    const [hasOverflow, setHasOverflow] = useState(false);

    useEffect(() => {
        const el = rowRef.current;
        if (!el) return;

        setHasOverflow(el.scrollWidth > el.clientWidth);
    }, [children]);

    return (
        <div className="relative w-full max-w-full">
            <div
                ref={rowRef}
                className="
          flex gap-4
          overflow-x-auto
          scroll-smooth
          no-scrollbar
          px-10
        "
            >
                {children}
            </div>

            {hasOverflow && (
                <button
                    onClick={() => scrollLeft(rowRef)}
                    className="
            absolute left-0 top-1/2 -translate-y-1/2 z-10
            bg-black/60 text-white
            w-8 h-8 flex items-center justify-center
            rounded-full hover:bg-black
          "
                >
                    ◀
                </button>
            )}

            {hasOverflow && (
                <button
                    onClick={() => scrollRight(rowRef)}
                    className="
            absolute right-0 top-1/2 -translate-y-1/2 z-10
            bg-black/60 text-white
            w-8 h-8 flex items-center justify-center
            rounded-full hover:bg-black
          "
                >
                    ▶
                </button>
            )}
        </div>
    );
}
