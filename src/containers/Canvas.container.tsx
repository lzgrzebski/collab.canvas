import * as Y from 'yjs';
import React, { useEffect, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import getStroke from 'perfect-freehand';

import { Point, Points, User } from '../types';
import { Store } from '../state';
import { get2DPathFromStroke } from '../utils/get2DPathFromStroke';
import { getPosition } from '../utils/getPosition';
import { STROKE_OPTIONS } from '../constants';
import { Button } from '../views/Button/Button.view';

export const Canvas: React.FC<{ user: User }> = ({ user }) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const { doc, elements } = useLoaderData() as Store;
    const drawings = useRef<WeakMap<Points, string>>(new WeakMap());
    const currentDrawing = useRef<Y.Array<Point>>();

    const handlePointerDown = (e: React.PointerEvent) => {
        e.currentTarget.setPointerCapture(e.pointerId);

        const points = new Y.Array<Point>();
        points.push([getPosition(e)]);

        const element = new Y.Map<Y.Array<Point> | string>();

        doc.transact(() => {
            element.set('points', points);
            element.set('userId', user.id);
            element.set('color', user.color);
        });

        elements.push([element]);

        currentDrawing.current = points;
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (e.buttons !== 1) {
            return;
        }

        const points = currentDrawing.current;
        if (points && typeof points !== 'string') {
            points.push([getPosition(e)]);
        }
    };

    useEffect(() => {
        const draw = (e: Y.YEvent<Points>[]) => {
            const ctx = ref.current?.getContext('2d');
            if (!ctx) {
                return;
            }

            if (ref.current) {
                ref.current.width = 1920;
                ref.current.height = 1080;
            }

            elements.forEach((element) => {
                const points = element.get('points') as Points;
                const color = element.get('color') as string;

                const drawing =
                    (points !== e[0].target && drawings.current?.get(points)) ||
                    get2DPathFromStroke(
                        getStroke(points.toArray(), STROKE_OPTIONS)
                    );

                ctx.beginPath();
                ctx.fillStyle = color;
                const myPath = new Path2D(drawing);
                ctx.fill(myPath);

                drawings.current?.set(points, drawing);
            });
        };
        elements.observeDeep(draw);

        return () => {
            elements.unobserveDeep(draw);
        };
    }, []);

    return (
        <>
            <canvas
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                ref={ref}
                width={1920}
                height={1080}
                style={{ display: 'block' }}
            ></canvas>
            <Button onPress={() => elements.delete(0, elements.length)}>
                Clear
            </Button>
        </>
    );
};
