import { PRODUCTS_BY_SELL, PRODUCTS_BY_ARRIVAL} from '../actions/types';

//Return the state
export default function( state= {} , action) {
    switch(action.type) {
        case PRODUCTS_BY_SELL:
            return {...state, bySell: action.payload}
        case PRODUCTS_BY_ARRIVAL:
            return {...state, byArrival: action.payload}
        default:
            return state;
    }
}