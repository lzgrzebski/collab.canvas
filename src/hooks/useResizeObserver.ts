import { useEffect, useRef, useState } from 'react';

export const useResizeObserver = (el: HTMLElement) => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

    const observer = useRef(
        new ResizeObserver(([entry]) => {
            setSize([entry.contentRect.width, entry.contentRect.height]);
        })
    );

    useEffect(() => {
        const ref = observer.current;
        ref.observe(el);

        return () => {
            ref.unobserve(el);
        };
    }, [observer, el]);

    return size;
};
