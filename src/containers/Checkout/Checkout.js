import React, { Component, lazy, Suspense } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
const ContactData = lazy(() => import('../Checkout/ContactData/ContactData'));

class Checkout extends Component {    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        //handle the case that user go to /checkout directly/refresh on checkout page (initial state not loaded)
        if(!this.props.ings) return <Redirect to='/' />
        if(this.props.purchased) return <Redirect to='/' />
        return (
            <div> 
                { this.props.ings && <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} /> }   
                <Suspense fallback='<div>Loading Contact Form..</div>'>
                    {/* Since Contact data is rendered manually here, we need to pass props to it to enable .history. */}
                    <Route 
                        path={this.props.match.url + '/contact-data'} 
                        component={ContactData} />
                </Suspense>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);