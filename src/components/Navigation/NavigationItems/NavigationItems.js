import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
    <ul className={styles.NavigationItems}>
        {/*for boolean props, we can just pass the property name*/}
        <NavigationItem link='/' active>Burger Builder</NavigationItem> 
        <NavigationItem link='/'>Check Out</NavigationItem> 
    </ul>
);

export default navigationItems;