import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Collab } from './pages/Collab.page';
import { Home } from './pages/Home.page';
import { Name } from './views/Name/Name.view';

export const App: React.FC = () => (
    <div className="wrapper">
        <Routes>
            <Route element={<Home />} path="/"></Route>
            <Route
                element={<Collab />}
                loader={() => {
                    console.log('elko');
                }}
                path=":id"
            ></Route>
        </Routes>
    </div>
);
