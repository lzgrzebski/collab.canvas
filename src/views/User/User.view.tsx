import React from 'react';
import cx from 'classnames';

import styles from './User.module.css';

export const User: React.FC<
    React.ComponentProps<'div'> & { color: string }
> = ({ className, color, children, ...props }) => (
    <div
        className={cx(styles.user, className)}
        style={{ backgroundColor: color }}
        {...props}
    >
        <span className={styles.initials}>{children}</span>
    </div>
);
