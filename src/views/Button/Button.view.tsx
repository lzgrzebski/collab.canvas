import React, { useRef } from 'react';
import cx from 'classnames';
import {
    mergeProps,
    useButton,
    useFocusRing,
    AriaButtonProps,
} from 'react-aria';

import styles from './Button.module.css';

export const Button: React.FC<
    React.ComponentProps<'button'> & AriaButtonProps
> = ({ children, className, ...props }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(props, ref);
    const { focusProps } = useFocusRing();
    const allProps = mergeProps(buttonProps, focusProps);

    return (
        <button
            {...allProps}
            className={cx(styles.button, className)}
            ref={ref}
        >
            {children}
        </button>
    );
};
