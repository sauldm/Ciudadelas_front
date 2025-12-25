export const scrollLeft = (ref, amount = 240) => {
    if (!ref?.current) return;
    ref.current.scrollBy({
        left: -amount,
        behavior: "smooth",
    });
};

export const scrollRight = (ref, amount = 240) => {
    if (!ref?.current) return;
    ref.current.scrollBy({
        left: amount,
        behavior: "smooth",
    });
};
