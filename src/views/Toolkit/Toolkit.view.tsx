import React from 'react';

import styles from './Toolkit.module.css';

export const Toolkit: React.FC<React.ComponentProps<'div'>> = (props) => {
    return (
        <div className={styles.toolkit} {...props}>
            <button className={styles.tool}>✋</button>
            <button className={styles.tool}>✏️</button>
        </div>
    );
};
