export const isDefined = <T>(t?: T) => {
    if (t === undefined) {
        throw new Error(`typeof t = ${typeof t}, expected value`);
    }
    return t;
};
