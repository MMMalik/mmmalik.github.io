export const clsx = (...classes: (string | boolean | null | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
};
