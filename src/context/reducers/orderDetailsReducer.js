import {
    SET_ORDER_DETAILS
} from '../actions/orderDetailsAction';

const initialState = {
    orderDetails: [],
};

const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER_DETAILS:
            return {
                ...state,
                orderDetails: action.payload,
            };
        default:
            return state;
    }
};

export default orderDetailsReducer;