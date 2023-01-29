import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { Button } from '../views/Button/Button.view';
import { Center } from '../views/Center/Center.view';
import { Logo } from '../views/Logo/Logo.view';
import { Wrapper } from '../views/Wrapper/Wrapper.view';

const getCanvasBg = (ref: React.RefObject<HTMLDivElement>) =>
    window.btoa(getComputedStyle(ref.current ?? document.body).backgroundColor);

export const Home: React.FC = () => {
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);
    return (
        <Wrapper ref={ref}>
            <Center>
                <Logo />
                <Button
                    className="fade delayed"
                    onPress={() => {
                        navigate(`/${uuid()}/${getCanvasBg(ref)}`);
                    }}
                >
                    Start drawing
                </Button>
            </Center>
        </Wrapper>
    );
};
