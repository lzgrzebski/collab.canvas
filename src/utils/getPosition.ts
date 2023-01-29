export const getPosition = (e: React.PointerEvent, zoom: number) => {
    const x = e.nativeEvent.offsetX / zoom / window.devicePixelRatio;
    const y = e.nativeEvent.offsetY / zoom / window.devicePixelRatio;
    return [x, y] as [number, number];
};
