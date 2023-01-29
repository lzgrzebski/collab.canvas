import React, { useEffect } from 'react';
import { useLoaderData, useLocation, useParams } from 'react-router-dom';

import { User } from '../types';
import { useLocalState } from '../hooks/useLocalState';
import { Name } from '../views/Name/Name.view';
import { Users } from '../containers/Users.container';
import { createUser } from '../state';
import { Store } from '../state';
import { Canvas } from '../containers/Canvas.container';
import { Wrapper } from '../views/Wrapper/Wrapper.view';
import { DEFAULT_COLOR } from '../constants';
import { useStore } from '../hooks/useSyncedState';
import { useProvider } from '../hooks/useProvider';

const withBgWrapper = <P extends object>(
    Component: React.ComponentType<P>
): React.FC<P> => {
    const WrappedComponent: React.FC = (props) => {
        const { bg } = useParams();
        const canvasBg = window.atob(bg ?? '') || DEFAULT_COLOR;
        return (
            <Wrapper backgroundColor={canvasBg}>
                <Component {...(props as P)} />{' '}
            </Wrapper>
        );
    };
    WrappedComponent.displayName = 'WrappedComponent';
    return WrappedComponent;
};

export const Collab: React.FC = withBgWrapper(() => {
    const [user, setUser] = useLocalState<User>('user');
    const { provider } = useStore();

    useProvider(provider);

    const handleName = (name: string) => {
        if (!name) {
            return;
        }
        setUser(createUser(name));
    };

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
});
