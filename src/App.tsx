import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Collab } from './pages/Collab.page';
import { Home } from './pages/Home.page';

const router = createBrowserRouter([
    { element: <Home />, path: '/' },
    {
        element: <Collab />,
        loader: () => {
            console.log('elko');

            return null;
        },
        path: ':id',
    },
]);

export const App: React.FC = () => (
    <div className="wrapper">
        <RouterProvider router={router} />
    </div>
);
