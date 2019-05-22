import { 
    LOGIN_USER, 
    REGISTER_USER, 
    AUTH_USER, 
    LOGOUT_USER,
    ADD_TO_CART_USER,
    GET_CART_ITEMS_USER,
    REMOVE_ITEMS_FROM_CART,
    ON_SUCCESS_BUY_USER  

} from '../actions/types';

//Return the state
export default function( state= {} , action) {
    switch(action.type) {
        case REGISTER_USER:
            return {...state, registerSuccess: action.payload}
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
        case AUTH_USER:
            return {...state, userData: action.payload}
        case LOGOUT_USER:
            return {...state }
        case ADD_TO_CART_USER:
            return{...state, userData: {
                ...state.userData,
                cart: action.payload
            }}
        case GET_CART_ITEMS_USER:
            return{...state, cartDetail: action.payload}
        case REMOVE_ITEMS_FROM_CART: {
            return{
                ...state,
                cartDetail: action.payload.cartDetail,
                userData: {
                ...state.userData,
                cart: action.payload.cart
                }
            }
        }
        case ON_SUCCESS_BUY_USER: {
            return{
                ...state,
                successBuy: action.payload.success,
                userData:{
                    ...state.userData,
                    cart:action.payload.cart
                },
                cartDetail: action.payload.cartDetail
            }
        }
        default:
            return state;
    }
}