import { 
    PRODUCTS_BY_SELL, 
    PRODUCTS_BY_ARRIVAL,
    FETCH_BRANDS,
    FETCH_WOODS,
    FETCH_PRODUCTS_TO_SHOP

} from '../actions/types';

//Return the state
export default function( state= {} , action) {
    switch(action.type) {
        case PRODUCTS_BY_SELL:
            return {...state, bySell: action.payload}
        case PRODUCTS_BY_ARRIVAL:
            return {...state, byArrival: action.payload}
        case FETCH_BRANDS:
            return {...state, brands: action.payload}
        case FETCH_WOODS:
            return {...state, woods: action.payload}
        case FETCH_PRODUCTS_TO_SHOP:
            return {...state}
        default:
            return state;
    }
}