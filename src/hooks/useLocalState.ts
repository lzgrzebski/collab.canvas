import { useCallback, useState, useEffect } from 'react';

export const useLocalState = <T>(
    key: string,
    defaultValue?: T,
    { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) => {
    const getItem = useCallback(
        (key: string) => window.localStorage.getItem(key),
        []
    );
    const setItem = useCallback(
        (value: string) => window.localStorage.setItem(key, value),
        [key]
    );

    const [state, setState] = useState(() => {
        const persistentState = getItem(key);
        if (!persistentState) {
            return defaultValue;
        }

        try {
            return (deserialize(persistentState) as T) ?? defaultValue;
        } catch (e) {
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            setItem(serialize(state));
        } catch (_) {
            console.error(`${key} corrupted`);
        }
    }, [state, serialize, setItem, key]);

    return [state, setState] as const;
};
