import React from 'react';
import styles from './BuildControl.module.css';

const buildControl = props => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.label}</div>
        <button className={styles.Less} onClick={props.remove} disabled={+props.count === 0}>-</button>
        <button className={styles.More} onClick={props.add} disabled={+props.count === 5}>+</button>
        <input type='text' value={props.count} onChange={props.change} />
        <span>(0 ~ 5)</span>
    </div>
);

export default buildControl;