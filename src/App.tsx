import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { createInitialState } from './state';
import { Collab } from './pages/Collab.page';
import { Home } from './pages/Home.page';
import { isDefined } from './utils/isDefined';
import { NotFound } from './pages/NotFound.page';
import { Error } from './pages/Error.page';

const router = createBrowserRouter([
    { element: <NotFound />, path: '*' },
    { element: <Home />, errorElement: <Error />, path: '/' },
    {
        element: <Collab />,
        errorElement: <Error />,
        loader: ({ params: { id } }) => {
            return createInitialState(isDefined(id));
        },
        path: ':id/:bg',
    },
]);

export const App: React.FC = () => <RouterProvider router={router} />;
