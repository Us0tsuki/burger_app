import React from 'react';
import styles from './Button.module.css';

const button = props => (
    <button 
        className={[styles.Button, styles[props.btnType]].join(' ')}
        onClick={props.clicked}
        disabled={props.disable}>{props.children}</button>
);

export default button;