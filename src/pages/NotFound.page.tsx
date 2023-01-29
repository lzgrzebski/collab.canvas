import React from 'react';

import { Center } from '../views/Center/Center.view';
import { Wrapper } from '../views/Wrapper/Wrapper.view';
import { Text } from '../views/Text/Text.view';

export const NotFound: React.FC = () => (
    <Wrapper>
        <Center>
            <Text>Ooops! This canvas doesn&apos;t exist :(</Text>
        </Center>
    </Wrapper>
);
