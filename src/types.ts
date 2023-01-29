import type Y from 'yjs';

export type Point = [number, number];
export type Points = Y.Array<Point>;
export interface Element {
    points: Points;
    userId: string;
    color: string;
}
export interface User {
    id: string;
    name: string;
    color: string;
    clientId?: number;
}
