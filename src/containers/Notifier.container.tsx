import React from 'react';
import { useEffect, useState } from 'react';
import { DEFAULT_TIMEOUT } from '../constants';
import { useStore } from '../hooks/useSyncedState';
import { Status } from '../types';
import { Notification } from '../views/Notification/Notification.view';

export const Notifier = () => {
    const { provider } = useStore();
    const [shouldDisplay, setShouldDisplay] = useState(!provider.wsconnected);
    const [status, setStatus] = useState<Status>();

    useEffect(() => {
        const handleStatus = ({ status }: { status: Status }) => {
            setStatus(status);
            setShouldDisplay(true);
        };

        provider.on('status', handleStatus);

        return () => provider.off('status', handleStatus);
    }, [provider]);

    useEffect(() => {
        let timerId: number;

        if (shouldDisplay) {
            timerId = window.setTimeout(() => {
                setShouldDisplay(false);
            }, DEFAULT_TIMEOUT);
        }

        return () => clearTimeout(timerId);
    }, [shouldDisplay]);

    return shouldDisplay ? <Notification>{status}</Notification> : null;
};
