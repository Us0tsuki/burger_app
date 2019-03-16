import React, { Component, lazy, Suspense } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders } from '../../store/actions/index';
import { connect } from 'react-redux';

const Order = lazy(() => import('../../components/Order/Order'));

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        if (this.props.loading) return <Spinner />;
        return(
            <div>
                <Suspense fallback={<Spinner />}>
                    {this.props.orders.map(order => (
                        <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                    ))}
                </Suspense>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));