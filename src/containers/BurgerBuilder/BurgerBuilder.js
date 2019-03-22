import React, {Component} from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'; 

export class BurgerBuilder extends Component {
    state = {
        checkOut: false
    }

    checkOutHandler = () => {
        if(this.props.isAuth) {
            this.setState({checkOut: true});
        } else {
            this.props.history.push('/login');
        }
    }

    cancelCheckOutHandler = () => {
        this.setState({checkOut: false});
    }

    purchaseHandler = () => {      
        this.props.initPurchase();
        this.props.history.push('/checkout');
    }

    componentDidMount() {
        this.props.initIngredients();
    }

    render() {
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if(this.props.ings) {
            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ings} 
                    price={this.props.price}
                    closeModal={this.cancelCheckOutHandler}
                    continuePurchase={this.purchaseHandler}/>
            );
            burger = (
                <>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        price={this.props.price}
                        ingredients={this.props.ings}
                        addIngredient={this.props.addIngredient} 
                        removeIngredient={this.props.removeIngredient}
                        changeCount={this.props.changeCount}
                        isAuth={this.props.isAuth}
                        checkOut={this.checkOutHandler}/>
                </>);
        }
        return (
            <>  
                <Modal show={this.state.checkOut} closeModal={this.cancelCheckOutHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: id => dispatch(actions.addIngredient(id)),
        removeIngredient: id => dispatch(actions.removeIngredient(id)),
        changeCount: (val,id) => dispatch(actions.changeCount(val, id)),
        initIngredients: () => dispatch(actions.initIngredients()),
        initPurchase: () => dispatch(actions.initPurchase())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));