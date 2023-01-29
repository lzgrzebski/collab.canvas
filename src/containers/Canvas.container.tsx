import * as Y from 'yjs';
import React, { useEffect, useRef } from 'react';
import getStroke from 'perfect-freehand';

import { Point, Points, User } from '../types';
import { get2DPathFromStroke } from '../utils/get2DPathFromStroke';
import { getPosition } from '../utils/getPosition';
import { STROKE_OPTIONS } from '../constants';
import { Button } from '../views/Button/Button.view';
import { useStore } from '../hooks/useSyncedState';
import { useResizeObserver } from '../hooks/useResizeObserver';

export const Canvas: React.FC<{ user: User }> = ({ user }) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const { elements, createElement, createPoints } = useStore();
    const drawings = useRef<WeakMap<Points, string>>(new WeakMap());
    const currentDrawing = useRef<Y.Array<Point>>();
    const [width, height] = useResizeObserver(document.body);

    const handlePointerDown = (e: React.PointerEvent) => {
        e.currentTarget.setPointerCapture(e.pointerId);

        const points = createPoints(getPosition(e));
        const element = createElement(points, user);

        elements.push([element]);
        currentDrawing.current = points;
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (e.buttons !== 1) {
            return;
        }

        const points = currentDrawing.current;
        points?.push([getPosition(e)]);
    };

    useEffect(() => {
        const draw = (editedRef?: Points) => {
            if (!ref.current) {
                return;
            }

            const ctx = ref.current.getContext('2d');
            if (!ctx) {
                return;
            }

            ref.current.width = width;
            ref.current.height = height;

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
        };

        draw();

        const handleObserve = (e: Y.YEvent<Points>[]) => {
            draw(e[0].target);
        };

        elements.observeDeep(handleObserve);

        return () => {
            elements.unobserveDeep(handleObserve);
        };
    }, [elements, width, height]);

    return (
        <>
            <canvas
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                ref={ref}
            ></canvas>
            <Button onPress={() => elements.delete(0, elements.length)}>
                Clear
            </Button>
        </>
    );
};
