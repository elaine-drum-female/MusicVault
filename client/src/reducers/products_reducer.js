import { 
    PRODUCTS_BY_SELL, 
    PRODUCTS_BY_ARRIVAL,
    FETCH_BRANDS,
    ADD_BRAND,
    FETCH_WOODS,
    ADD_WOOD,
    FETCH_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT

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
        case ADD_BRAND:
            return {...state, 
                addBrand: action.payload.success , 
                brands: action.payload.brands 
            }
        case FETCH_WOODS:
            return {...state, woods: action.payload}
        case ADD_WOOD:
            return {...state,
                addWood: action.payload.success,
                woods: action.payload.woods
            }
        case FETCH_PRODUCTS_TO_SHOP:
            return {
                ...state, 
                toShop: action.payload.articles,
                toShopSize: action.payload.size
            }
        case ADD_PRODUCT: 
            return {
                ...state,
                addProduct:action.payload
            }
        case CLEAR_PRODUCT: 
            return {
                ...state,
                addProduct:action.payload
            }
        default:
            return state;
    }
}