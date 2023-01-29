import React from 'react';
import cx from 'classnames';

import styles from './UserBlob.module.css';
import { TestId } from '../../testIds';

export const UserBlob: React.FC<
    React.ComponentProps<'div'> & {
        color: string;
        name: string;
        isSelf: boolean;
    }
> = ({ className, color, name, isSelf, ...props }) => (
    <div
        className={cx(styles.user, className)}
        data-testid={TestId.UserBlob}
        style={{ backgroundColor: color }}
        title={`${name}${isSelf ? ' (you)' : ''}`}
        {...props}
    >
        <span className={styles.initials}>{(name ?? '?').charAt(0)}</span>
    </div>
);
