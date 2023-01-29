import * as Y from 'yjs';
import React, { useEffect, useRef, useState } from 'react';
import getStroke from 'perfect-freehand';
import throttle from 'raf-throttle';

import { Point, Points, User } from '../types';
import { get2DPathFromStroke } from '../utils/get2DPathFromStroke';
import { getPosition } from '../utils/getPosition';
import { STROKE_OPTIONS } from '../constants';
import { useStore } from '../hooks/useSyncedState';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { BottomBar } from '../views/BottomBar/BottomBar.view';
import { Zoom } from '../views/Zoom/Zoom.view';
import { Toolkit } from '../views/Toolkit/Toolkit.view';
import { TestId } from '../testIds';

export const Canvas: React.FC<{ user: User }> = ({ user }) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const { elements, createElement, createPoints } = useStore();
    const drawings = useRef<WeakMap<Points, string>>(new WeakMap());
    const currentDrawing = useRef<Y.Array<Point>>();
    const [width, height] = useResizeObserver(document.body);
    const [zoom, setZoom] = useState(1);

    const handlePointerDown = (e: React.PointerEvent) => {
        e.currentTarget.setPointerCapture(e.pointerId);

        const points = createPoints(getPosition(e, zoom));
        const element = createElement(points, user);

        elements.push([element]);
        currentDrawing.current = points;
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (e.buttons !== 1) {
            return;
        }

        const points = currentDrawing.current;
        points?.push([getPosition(e, zoom)]);
    };

    const clear = () => elements.delete(0, elements.length);

    useEffect(() => {
        const draw = throttle((editedRef?: Points) => {
            if (!ref.current) {
                return;
            }

            const ctx = ref.current.getContext('2d');
            if (!ctx) {
                return;
            }

            ref.current.width = width;
            ref.current.height = height;

            const ratio = window.devicePixelRatio;
            ctx.imageSmoothingEnabled = false;
            ctx.scale(ratio * zoom, ratio * zoom);

            elements.forEach((element) => {
                const points = element.get('points');
                const color = element.get('color');

                const drawing =
                    (points !== editedRef && drawings.current?.get(points)) ||
                    get2DPathFromStroke(
                        getStroke(points.toArray(), STROKE_OPTIONS)
                    );

                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.fill(new Path2D(drawing));

                drawings.current?.set(points, drawing);
            });
        });

        draw();

        const handleObserve = (e: Y.YEvent<Points>[]) => {
            draw(e[0].target);
        };

        elements.observeDeep(handleObserve);

        return () => {
            elements.unobserveDeep(handleObserve);
        };
    }, [elements, width, height, zoom]);

    return (
        <>
            <canvas
                data-testid={TestId.Canvas}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                ref={ref}
            ></canvas>
            <BottomBar>
                <Zoom setZoom={setZoom} zoom={zoom} />
                <Toolkit clear={clear} />
            </BottomBar>
        </>
    );
};
