import React from 'react';
import styles from './Order.module.css';

const order = props => {
    const ingredients = [];
    for(let i in props.ingredients) {
        ingredients.push(<span key={i} className={styles.ingredient}>{i} ({props.ingredients[i]})</span>);
    }
    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>${props.price}</strong></p>
        </div>
    );
}

export default order;