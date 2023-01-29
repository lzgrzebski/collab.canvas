import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getInitialState } from './state';

import { Collab } from './pages/Collab.page';
import { Home } from './pages/Home.page';
import { isDefined } from './utils/isDefined';

const router = createBrowserRouter([
    { element: <Home />, path: '/' },
    {
        element: <Collab />,
        loader: ({ params: { id } }) => {
            return getInitialState(isDefined(id));
        },
        path: ':id',
    },
]);

export const App: React.FC = () => (
    <div className="wrapper">
        <RouterProvider router={router} />
    </div>
);
