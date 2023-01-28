import React, { useState } from 'react';
import { Name } from '../views/Name/Name.view';
import { Toolkit } from '../views/Toolkit/Toolkit.view';
import { User } from '../views/User/User.view';
import { Zoom } from '../views/Zoom/Zoom.view';

export const Collab: React.FC = () => {
    const [showCanvas, setShowCanvas] = useState(false);

    if (!showCanvas) {
        return (
            <>
                <div style={{ margin: 5, position: 'fixed', right: 0 }}>
                    <User color="#75485e">K</User>
                    <User color="#cb904d">L</User>
                    <User color="#dfcc74">B</User>
                </div>
                <Name />
                <div
                    style={{
                        alignItems: 'center',
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'space-between',
                        left: 0,
                        position: 'fixed',
                        right: 0,
                    }}
                >
                    <Zoom />
                    <Toolkit />
                </div>
            </>
        );
    }

    return null;
};
