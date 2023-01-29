import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { User } from '../types';
import type { Store } from '../state';
import { User as UserBlob } from '../views/User/User.view';

export const Users: React.FC<{ user: User }> = ({ user }) => {
    const { awareness } = useLoaderData() as Store;
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (!user) {
            return;
        }
        awareness.setLocalState({ ...user, clientId: awareness.clientID });
    }, [user]);

    useEffect(() => {
        const getUsers = () => {
            setUsers(Array.from(awareness.getStates().values()) as User[]);
        };

        getUsers();

        awareness.on('change', getUsers);

        return () => {
            awareness.off('change', getUsers);
        };
    }, []);

    return (
        <>
            {users.map(({ color, clientId, name }) => (
                <UserBlob color={color} key={clientId}>
                    {name}
                </UserBlob>
            ))}
        </>
    );
};