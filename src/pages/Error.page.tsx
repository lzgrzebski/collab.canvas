import React from 'react';

import { Center } from '../views/Center/Center.view';
import { Wrapper } from '../views/Wrapper/Wrapper.view';
import { Text } from '../views/Text/Text.view';
import { Button } from '../views/Button/Button.view';

export const Error: React.FC<{
    error?: Error;
    resetErrorBoundary?: () => void;
}> = ({ error, resetErrorBoundary }) => {
    return (
        <Wrapper>
            <Center>
                <Text>There are bugs I know ^^&apos;</Text>
                {error && <pre>{error.message}</pre>}
                {resetErrorBoundary && (
                    <Button onPress={resetErrorBoundary}>Try again</Button>
                )}
            </Center>
        </Wrapper>
    );
};
