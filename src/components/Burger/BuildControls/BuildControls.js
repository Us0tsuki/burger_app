import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = props => (
    <div className={styles.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => <BuildControl 
            key={ctrl.label}
            label={ctrl.label} 
            add={() => props.addIngredient(ctrl.type)}
            remove={()=> props.removeIngredient(ctrl.type)}
            count={props.ingredients[ctrl.type]}
            change={e => props.changeCount(e.target.value, ctrl.type)}/>)}
        {/* or you can just disble the button by comparing with the initial price */} 
        {/*note Object.values() not supported by IE */}   
        <button 
            className={styles.OrderButton} 
            disabled={!Object.values(props.ingredients).some(a => a > 0)}
            onClick={props.checkOut}>{props.isAuth ? 'ORDER NOW' : 'LOGIN TO CONTINUE'}</button>
    </div>
);

export default buildControls;