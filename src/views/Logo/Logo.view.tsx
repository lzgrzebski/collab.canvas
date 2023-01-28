import React from 'react';
import cx from 'classnames';

import styles from './Logo.module.css';

export const Logo: React.FC = () => (
    <div className={styles.logo}>
        <h1 className={styles.logoText}>Collab.canvas</h1>
        <svg viewBox="0 0 403.44 74.33" xmlns="http://www.w3.org/2000/svg">
            <path
                className={styles.animate}
                d="M14.2 65.54s36-36.79 56.31-35.66 38.6 27.31 58.13 26.56 26.34-5.91 37.6-13 30.53-19.52 39.48-19.14 19.48 8.23 31.12 19.87 18.91 13.2 25.25 13.16S278.24 58 297 40.76s25.86-17.86 31.49-17.86 48.11 15.42 65 13.27"
                fill="none"
                stroke="#fff"
                strokeMiterlimit="10"
                strokeWidth="4"
            />
        </svg>
    </div>
);
