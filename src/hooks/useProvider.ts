import { useEffect } from 'react';
import type { WebsocketProvider } from 'y-websocket';
import { Status } from '../types';

export const useProvider = (provider: WebsocketProvider) => {
    useEffect(() => {
        provider.connect();

        return () => {
            provider.disconnect();
        };
    }, [provider]);

    useEffect(() => {
        const handleStatus = (status: { status: Status }) => {
            console.debug('Current status', status);
        };

        provider.on('status', handleStatus);

        return () => provider.off('status', handleStatus);
    }, [provider]);

    useEffect(() => {
        const handleConnectionClose = (status: unknown) => {
            console.debug('Connection closed', status);
        };

        provider.on('connection-close', handleConnectionClose);

        return () => provider.off('connection-close', handleConnectionClose);
    }, [provider]);

    useEffect(() => {
        const handleConnectionClose = (status: unknown) => {
            console.debug('Connection error', status);
        };

        provider.on('connection-error', handleConnectionClose);

        return () => provider.off('connection-error', handleConnectionClose);
    }, [provider]);
};
