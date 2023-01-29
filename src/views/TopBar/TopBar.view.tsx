import React from 'react';
import cx from 'classnames';

import styles from './TopBar.module.css';

export const TopBar: React.FC<React.ComponentProps<'div'>> = ({
    className,
    ...props
}) => <div className={cx(styles.topBar, className)} {...props} />;
