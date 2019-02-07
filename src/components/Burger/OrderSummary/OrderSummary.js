import React from 'react';
import styles from './OrderSummary.module.css';
// import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredientsSummary = Object.entries(props.ingredients).filter(i => i[1] > 0).map(entry => (
        <li key={entry[0]}><span style={{textTransform: 'captilize'}}>{entry[0]}</span>: {entry[1]}</li>
    ));
    return (
        <div className={styles.OrderSummary}>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong> </p>
            {/* <Button btnType="Danger">CANCEL</Button>
            <Button btnType="Success">CONTINUE</Button> */}
            <button className={styles.CheckOut} onClick={props.continuePurchase}>Checkout Now</button>
            <button className={styles.Cancel} onClick={props.closeModal}>Go back</button>
        </div>
    )
}

export default orderSummary;