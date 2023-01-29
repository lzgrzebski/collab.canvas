import React, { useState } from 'react';
import cx from 'classnames';

import { Button } from '../Button/Button.view';
import { Center } from '../Center/Center.view';
import { Input } from '../Input/Input.view';
import { Text } from '../Text/Text.view';

import styles from './Name.module.css';
import { TestId } from '../../testIds';

export const Name: React.FC<{ onName: (name: string) => void }> = ({
    onName,
}) => {
    const [name, setName] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onName(name.trim());
    };
    return (
        <Center>
            <form
                className={cx(styles.wrapper, 'slide')}
                data-testid={TestId.NameForm}
                onSubmit={handleSubmit}
            >
                <Text>
                    What is your <strong>name</strong>?
                </Text>
                <Input
                    autoFocus
                    className={styles.input}
                    data-testid={TestId.NameInput}
                    label="Name"
                    onChange={setName}
                    value={name}
                />
                <div>
                    <Button type="submit">Next</Button>
                </div>
            </form>
        </Center>
    );
};
