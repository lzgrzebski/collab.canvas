import React from 'react';
import cx from 'classnames';

import { Button } from '../Button/Button.view';
import { CenterWrapper } from '../CenterWrapper/CenterWrapper.view';
import { Input } from '../Input/Input.view';
import { Text } from '../Text/Text.view';

import styles from './Name.module.css';

export const Name: React.FC = () => (
    <CenterWrapper>
        <form className={cx(styles.wrapper, 'slide')}>
            <Text>
                What is your <strong>name</strong>?
            </Text>
            <Input autoFocus className={styles.input} />
            <div>
                <Button type="submit">Next</Button>
            </div>
        </form>
    </CenterWrapper>
);
