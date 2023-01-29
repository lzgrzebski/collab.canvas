import React from 'react';
import cx from 'classnames';

import styles from './Center.module.css';

export const Center: React.FC<
    React.PropsWithChildren<React.ComponentProps<'div'>>
> = ({ className, ...props }) => (
    <div className={cx(styles.center, className)} {...props} />
);
