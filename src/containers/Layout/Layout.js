import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState(prevState => ({showSideDrawer: !prevState.showSideDrawer}));
    }
    render() {
        return (
            <>
                <Toolbar isAuth={this.props.isAuthenticated} toggleDrawer={this.sideDrawerToggleHandler}/>
                <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} close={this.sideDrawerCloseHandler}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
    
export default connect(mapStateToProps)(Layout);