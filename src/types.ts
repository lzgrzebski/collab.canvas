import type Y from 'yjs';

export interface ExtendsYMap<
    Data extends Record<string, unknown>,
    Keys extends keyof Data & string = keyof Data & string
> extends Y.Map<unknown> {
    clone(): ExtendsYMap<Data, Keys>;

    delete(key: Keys & string): void;

    set<Key extends Keys>(key: Key, value: Data[Key]): Data[Key];

    get<Key extends Keys>(key: Key): Data[Key];

    has<Key extends Keys>(key: Key): boolean;

    clear(): void;
}

export type Point = [number, number];
export type Points = Y.Array<Point>;
export type Element = ExtendsYMap<{
    points: Points;
    userId: string;
    color: string;
}>;
export interface User {
    id: string;
    name: string;
    color: string;
    clientId?: number;
}
