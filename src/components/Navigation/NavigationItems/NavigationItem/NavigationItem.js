import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

const navigationItem = props => (
    <li className={styles.NavigationItem}>
    {/* Note: We can't use the default 'active' class name, since it's added by NavLink on the fly, we need
    to let the active class point to the one in the css module file. */}
        <NavLink 
            to={props.link} exact={props.exact}
            activeClassName={styles.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;