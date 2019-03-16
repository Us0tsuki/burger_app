import React from 'react';
import styles from './Input.module.css';

const input = props => {
    let formEntry = null, errorMessage = null;
    const classes = [styles.InputElement];
    if(props.invalid) {
        classes.push(styles.Invalid);
        errorMessage = <p className={styles.ErrorMessage}>{props.id} is invalid!</p>;
    }
    switch (props.entryType) {
        case ('input'):
            formEntry = <input className={classes.join(' ')} value={props.value} {...props.entryConfig} onChange={props.changed}/>;
            break;
        case ('textarea'):
            formEntry = <teaxtarea className={classes.join(' ')} value={props.value} {...props.entryConfig} onChange={props.changed}/>
            break;
        case ('select'):
            formEntry = (
                <select className={classes.join(' ')} onChange={props.changed} value={props.value}>
                    {props.entryConfig.options.map(opt => (
                        <option key={opt.val} value={opt.val}>{opt.dispVal}</option>
                    ))}
                </select>
            );
            break;
        default:
            formEntry = <input className={classes.join(' ')} value={props.value} {...props.entryConfig} onChange={props.changed}/>;
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Lebel}>{props.label}</label>
            {formEntry}
            {errorMessage}
        </div>
    );
};

export default input;