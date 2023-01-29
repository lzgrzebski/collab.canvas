import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { Button } from '../views/Button/Button.view';
import { Center } from '../views/CenterWrapper/CenterWrapper.view';
import { Logo } from '../views/Logo/Logo.view';

export const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Center>
            <Logo />
            <Button
                className="fade delayed"
                onPress={() => {
                    navigate(`/${uuid()}`);
                }}
            >
                Start drawing
            </Button>
        </Center>
    );
};
