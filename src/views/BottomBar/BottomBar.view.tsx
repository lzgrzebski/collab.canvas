import React from 'react';
import cx from 'classnames';

import styles from './BottomBar.module.css';

export const BottomBar: React.FC<React.ComponentProps<'div'>> = ({
    className,
    ...props
}) => <div className={cx(styles.bottomBar, className)} {...props} />;
