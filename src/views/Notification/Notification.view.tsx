import React from 'react';
import cx from 'classnames';

import styles from './Notification.module.css';

export const Notification: React.FC<
    React.PropsWithChildren<React.ComponentProps<'div'>>
> = ({ className, ...props }) => (
    <div className={cx(styles.notification, className, 'slide')}>
        <div className={styles.pill} {...props} />
    </div>
);
