import React, { useRef } from 'react';
import {
    AriaTextFieldProps,
    mergeProps,
    useFocusRing,
    useTextField,
} from 'react-aria';
import cx from 'classnames';

import styles from './Input.module.css';

export const Input: React.FC<
    React.ComponentProps<'input'> & AriaTextFieldProps
> = ({ className, ...props }) => {
    const ref = useRef<HTMLInputElement>(null);
    const { inputProps } = useTextField(props, ref);
    const { focusProps } = useFocusRing();
    const allProps = mergeProps(inputProps, focusProps);

    return (
        <input
            {...allProps}
            className={cx(styles.input, className)}
            ref={ref}
        />
    );
};
