import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        checkOut: false,
        loading: false
    }

    addIngredientHandler = type => {
        this.setState(prevState => ({
            ingredients: {
                ...prevState.ingredients,
                [type]: +prevState.ingredients[type] + 1
            },
            totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
        }))
    }
   
    removeIngredientHandler = type => {
        this.setState(prevState => ({
            ingredients: {
                ...prevState.ingredients,
                [type]: +prevState.ingredients[type] - 1
            },
            totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
        }))
    }

    changeCountHandler = (e, type) => {   
        //Caveat: React SyntheticEvent is polled, thus you cannot access the event in an asynchronous way.   
        const value = e.target.value;
        this.setState(prevState => ({
            ingredients: {
                ...prevState.ingredients,
                [type]: value
            },
            totalPrice: prevState.totalPrice + (+value - prevState.ingredients[type]) * INGREDIENT_PRICES[type]
        }));
    }
    /*handles the case when user defocus the input field with an empty value*/
    inputBlurHandler = (e, type) => {
        if(e.target.value === '') {
            this.setState(prevState => ({
                ingredients: {
                    ...prevState.ingredients,
                    [type]: 0
                }
            }))
        }
    }

    checkOutHandler = () => {
        this.setState({checkOut: true});
    }

    cancelCheckOutHandler = () => {
        this.setState({checkOut: false});
    }

    purchaseHandler = () => {
        this.setState({loading: true});
        // FireDB, the endpoint should be nodeName + '.json'
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Alex Yu',
                address: {
                    street: '4915 SW 14th TER',
                    zipcode: '32607',
                    county: 'Alachua'
                },
                email: 'yjlmojo@gmail.com'
            },
            delivery: true
        }
        axios.post('orders.json', order)
            .then(response => {
                this.setState({loading: false, checkOut: false})
            })
            .catch(error => {
                this.setState({loading: false, checkOut: false})
            });
    }

    componentDidMount() {
        axios.get('Ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {});
    }

    render() {
        let orderSummary = null, burger = <Spinner />;
        if(this.state.ingredients) {
            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients} 
                    price={this.state.totalPrice}
                    closeModal={this.cancelCheckOutHandler}
                    continuePurchase={this.purchaseHandler}/>
            );
            burger = (
                <>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}
                    addIngredient={this.addIngredientHandler} 
                    removeIngredient={this.removeIngredientHandler}
                    changeCount={this.changeCountHandler}
                    blur={this.inputBlurHandler}
                    checkOut={this.checkOutHandler}/>
                </>);
        }
        if(this.state.loading) {
            orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);