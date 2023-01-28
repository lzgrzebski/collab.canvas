import React from 'react';

import styles from './Zoom.module.css';

export const Zoom: React.FC = () => (
    <div>
        <button className={styles.control}>-</button>
        <span className={styles.control}>100%</span>
        <button className={styles.control}>+</button>
    </div>
);
