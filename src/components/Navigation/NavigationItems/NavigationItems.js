import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
    <ul className={styles.NavigationItems}>
        {/*for boolean props, we can just pass the property name*/}
        <NavigationItem link='/' exact>Burger Builder</NavigationItem> 
        {props.isAuth && <NavigationItem link='/orders'>Orders</NavigationItem>}
        {props.isAuth ? 
            <NavigationItem link='/logout'>Logout</NavigationItem> :
            <NavigationItem link='/login'>Login</NavigationItem>}  
    </ul>
);

export default navigationItems;