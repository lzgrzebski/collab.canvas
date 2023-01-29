import React, { useRef } from 'react';
import cx from 'classnames';
import {
    AriaButtonProps,
    useButton,
    useFocusRing,
    mergeProps,
} from 'react-aria';

import styles from './Toolkit.module.css';

export const Tool: React.FC<
    React.ComponentProps<'button'> & AriaButtonProps
> = ({ children, className, ...props }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(props, ref);
    const { focusProps } = useFocusRing();
    const allProps = mergeProps(buttonProps, focusProps);

    return (
        <button {...allProps} className={cx(styles.tool, className)} ref={ref}>
            {children}
        </button>
    );
};

export const Toolkit: React.FC<
    React.ComponentProps<'div'> & { clear: () => void }
> = ({ clear, ...props }) => {
    return (
        <div className={styles.toolkit} {...props}>
            <Tool onPress={clear}>Clear</Tool>
        </div>
    );
};
