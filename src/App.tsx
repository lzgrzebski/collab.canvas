import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createInitialState } from './state';

import { Collab } from './pages/Collab.page';
import { Home } from './pages/Home.page';
import { Error } from './pages/Error.page';
import { isDefined } from './utils/isDefined';

const router = createBrowserRouter([
    { element: <Home />, errorElement: <Error />, path: '/' },
    {
        element: <Collab />,
        loader: ({ params: { id } }) => {
            return createInitialState(isDefined(id));
        },
        path: ':id/:bg',
    },
]);

export const App: React.FC = () => <RouterProvider router={router} />;
