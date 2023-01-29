import React, { useRef } from 'react';
import {
    AriaTextFieldOptions,
    AriaTextFieldProps,
    mergeProps,
    useFocusRing,
    useTextField,
} from 'react-aria';
import cx from 'classnames';

import styles from './Input.module.css';

export const Input: React.FC<
    { className: string } & AriaTextFieldOptions<'input'> & AriaTextFieldProps
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
