import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
    //The Object.keys() method returns an array of a given object's own property names
    // let transformedIngredients = Object.keys(props.ingredients)
    //Array() can be used as a function, thus without new, works the same as creating a new Array object
    //this will return an array of arrays of JSX elements, React will render them as siblings like .innerHTML() does
    //[...array] will change an array of empty x 2(or [,]) to [undefined, undefined]
        // .map( igKey => {
        //         return [...Array(props.ingredients[igKey])].map((_,index) => {
        //             return <BurgerIngredient key={igKey + index} type={igKey} />
        //         });
        //     }
        // )
        //flatten the array to a single level array
        // .reduce((arr, el) => {
        //     return arr.concat(el)
        // });

    let transformedIngredients = [];
    for(let e of Object.entries(props.ingredients)) {
        for(let i = 0; i < e[1]; i ++) {
            transformedIngredients.push(<BurgerIngredient key={e[0] + i} type={e[0]}/>);
        }
    }
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please Start Adding Ingredients!</p>
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;