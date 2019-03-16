import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.INIT_PURCHASE: return updateObject(state, {purchased: false});
        case actionTypes.PURCHASE_BURGER_START: return updateObject(state, {loading: true});
        case actionTypes.PURCHASE_BURGER_SUCCESS: 
            const order = {...action.orderData, id: action.orderId};
            return {
                orders: state.orders.concat(order),
                loading: false,
                purchased: true
            }
        case actionTypes.PURCHASE_BURGER_FAIL: return updateObject(state, {loading: false});

        case actionTypes.FETCH_ORDERS_START: return updateObject(state, {loading: true});
        case actionTypes.FETCH_ORDERS_SUCCESS: return updateObject(state, {orders: action.orders, loading: false});
        case actionTypes.FETCH_ORDERS_FAIL: return updateObject(state, {loading: false});
        default: return state;
    }
};

export default reducer;