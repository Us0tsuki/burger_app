import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = state => {
    return updateObject(state, {error: null, loading: true});
};

const authSuccess = (state, action) => {
    return {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    };
};

const authLogout = state => {
    return updateObject(state, {token: null, userId: null});
};

const authFail = (state, action) => {
    return updateObject(state, {error: action.error, loading: false});
};

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state);
        default: return state;
    }
};

export default reducer;