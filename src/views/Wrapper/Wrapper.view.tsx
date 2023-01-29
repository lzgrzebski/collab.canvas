import React from 'react';
import cx from 'classnames';

import styles from './Wrapper.module.css';

export const Wrapper = React.forwardRef<
    HTMLDivElement,
    React.PropsWithChildren<React.ComponentProps<'div'>> & {
        backgroundColor?: string;
    }
>(({ backgroundColor, className, ...props }, ref) => (
    <div
        className={cx(
            styles.wrapper,
            className,
            !backgroundColor && styles.animate
        )}
        style={{ backgroundColor }}
        {...props}
        ref={ref}
    />
));

Wrapper.displayName = 'Wrapper';
