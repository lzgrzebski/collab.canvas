import React from 'react';
import cx from 'classnames';

import styles from './UserBlob.module.css';
import { TestId } from '../../testIds';

export const UserBlob: React.FC<
    React.ComponentProps<'div'> & { color: string; children: string }
> = ({ className, color, children, ...props }) => (
    <div
        className={cx(styles.user, className)}
        data-testid={TestId.UserBlob}
        style={{ backgroundColor: color }}
        title={children}
        {...props}
    >
        <span className={styles.initials}>{(children ?? '?').charAt(0)}</span>
    </div>
);
