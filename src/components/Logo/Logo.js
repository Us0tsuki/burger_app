import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import styles from './Logo.module.css';

const logo = props => (
    <div className={styles.Logo} style={{height: props.height}}>
        {/*burgerLogo will refer to a string in the end to the path where webpack stores the optimized and copied image  */}
        <img src={burgerLogo} alt='MyBurger'/>
    </div>
);

export default logo;