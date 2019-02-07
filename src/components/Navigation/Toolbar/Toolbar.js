import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = props => (
    <header className={styles.Toolbar}>
        <DrawerToggle click={props.toggleDrawer}/>
        <Logo height='80%'/>
        <nav>
            <NavigationItems /> 
        </nav>
    </header>
);

export default toolbar;