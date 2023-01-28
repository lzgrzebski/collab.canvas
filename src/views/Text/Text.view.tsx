import React from 'react';
import cx from 'classnames';

import styles from './Text.module.css';

export const Text: React.FC<React.ComponentProps<'div'>> = ({
    className,
    ...props
}) => <div className={cx(styles.text, className)} {...props} />;
