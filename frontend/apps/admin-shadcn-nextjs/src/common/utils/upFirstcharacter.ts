export const upFirstcharacter = (str: string) => {
    return str.replace(/^\S/, (s) => s.toUpperCase());
};
