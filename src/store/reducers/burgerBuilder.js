import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const initState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const addIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, { [action.ingredient]: state.ingredients[action.ingredient] + 1 });
    return updateObject(state, { 
        ingredients: updatedIngredients, 
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient] });
};

const removeIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, { [action.ingredient]: state.ingredients[action.ingredient] - 1 });
    return updateObject(state, { 
        ingredients: updatedIngredients, 
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient] });
};

const changeCount = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, { [action.ingredient]: +action.count });
    const updatedPrice = state.totalPrice + (+action.count - state.ingredients[action.ingredient]) * INGREDIENT_PRICES[action.ingredient];
    return updateObject(state, { 
        ingredients: updatedIngredients, 
        totalPrice: updatedPrice});
};

const setIngredients = action => {
    return {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    };
};

const fetchIngredientsFailed = state => {
    return updateObject(state, {error: true});
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.CHANGE_COUNT: return changeCount(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
        default: return state;
    }
};

export default reducer;