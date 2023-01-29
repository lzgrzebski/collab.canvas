import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import { User } from '../types';
import { useLocalState } from '../hooks/useLocalState';
import { Name } from '../views/Name/Name.view';
import { Users } from '../containers/Users.container';
import { createUser } from '../state';
import { Store } from '../state';
import { Canvas } from '../containers/Canvas.container';

export const Collab: React.FC = () => {
    const [user, setUser] = useLocalState<User>('user');
    const { provider } = useLoaderData() as Store;

    const handleName = (name: string) => {
        setUser(createUser(name));
    };

    useEffect(() => {
        provider.connect();

        return () => {
            provider.disconnect();
        };
    }, [provider]);

    if (!user) {
        return <Name onName={handleName} />;
    }

    return (
        <>
            <div style={{ margin: 5, position: 'fixed', right: 0 }}>
                <Users user={user} />
            </div>
            <Canvas user={user} />
        </>
    );

    return null;
};
