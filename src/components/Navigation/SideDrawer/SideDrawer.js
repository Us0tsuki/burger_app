import React from 'react';
import styles from './SideDrawer.module.css';

import Logo from '../../Logo/Logo';
import NavagationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
    return (
        <>
            <Backdrop show={props.open} click={props.close}/>
            <div className={`${styles.SideDrawer} ${props.open ? styles.Toggle : styles.Close}`}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav onClick={props.close}>
                    <NavagationItems isAuth={props.isAuth}/>
                </nav>
            </div> 
        </>
    );
};

export default sideDrawer;