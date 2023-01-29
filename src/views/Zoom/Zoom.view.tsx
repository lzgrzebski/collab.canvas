import React, { useRef } from 'react';
import cx from 'classnames';

import styles from './Zoom.module.css';
import {
    AriaButtonProps,
    useButton,
    useFocusRing,
    mergeProps,
} from 'react-aria';
import { ZOOM_STEP } from '../../constants';

export const Indicator: React.FC<
    React.ComponentProps<'button'> & AriaButtonProps
> = ({ children, className, ...props }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { buttonProps } = useButton(props, ref);
    const { focusProps } = useFocusRing();
    const allProps = mergeProps(buttonProps, focusProps);

    return (
        <button
            {...allProps}
            className={cx(styles.indicator, className)}
            ref={ref}
        >
            {children}
        </button>
    );
};

export const Zoom: React.FC<{
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    zoom: number;
}> = ({ setZoom, zoom }) => (
    <div>
        <Indicator
            aria-label="Decrease Zoom"
            className={styles.left}
            onPress={() => {
                setZoom((prevZoom) => (prevZoom -= ZOOM_STEP));
            }}
        >
            -
        </Indicator>
        <span className={styles.zoomLevel}>{`${((zoom ?? 0) * 100).toFixed(
            0
        )}%`}</span>
        <Indicator
            aria-label="Increase Zoom"
            className={styles.right}
            onPress={() => {
                setZoom((prevZoom) => (prevZoom += ZOOM_STEP));
            }}
        >
            +
        </Indicator>
    </div>
);
