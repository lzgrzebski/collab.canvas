export const getPosition = (e: React.PointerEvent) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    return [x, y] as [number, number];
};
