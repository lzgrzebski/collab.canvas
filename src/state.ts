import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';
import { v4 as uuid } from 'uuid';

import { COLORS, PROVIDER_URL } from './constants';
import type { Element } from './types';

export const getInitialState = (id: string) => {
    const doc = new Y.Doc();
    const elements = doc.getArray<Element>('elements');

    const provider = new WebsocketProvider(PROVIDER_URL, id, doc, {
        connect: false,
    });

    return { awareness: provider.awareness, doc, elements, provider };
};

export const generateUser = (name: string) => {
    const id = uuid();
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    return { color, id, name };
};

export type Store = ReturnType<typeof getInitialState>;
