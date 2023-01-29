import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';
import { v4 as uuid } from 'uuid';
import randomColor from 'randomcolor';

import { PROVIDER_URL } from './constants';
import type { Element, Point, Points, User } from './types';

export const createInitialState = (id: string) => {
    const doc = new Y.Doc();
    const elements = doc.getArray<Element>('elements');

    const provider = new WebsocketProvider(PROVIDER_URL, id, doc, {
        connect: false,
    });

    const createPoints = (point: Point) => {
        const points = new Y.Array<Point>();
        points.push([point]);

        return points;
    };

    const createElement = (points: Points, user: User) => {
        // FIXME: override yjs Map types to make them stronger
        const element = new Y.Map() as Element;

        doc.transact(() => {
            element.set('points', points);
            element.set('userId', user.id);
            element.set('color', user.color);
        });

        return element;
    };

    return {
        awareness: provider.awareness,
        createElement,
        createPoints,
        elements,
        provider,
    };
};

export const createUser = (name: string) => {
    const id = uuid();
    const color = randomColor({
        luminosity: 'dark',
    });

    return { color, id, name };
};

export type Store = ReturnType<typeof createInitialState>;
