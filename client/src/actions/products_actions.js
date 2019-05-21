import axios from 'axios';
import { 
    PRODUCTS_BY_SELL, 
    PRODUCTS_BY_ARRIVAL,
    FETCH_BRANDS,
    FETCH_WOODS,
    FETCH_PRODUCTS_TO_SHOP,
    ADD_PRODUCT,
    CLEAR_PRODUCT

 } from './types';
import { PRODUCT_SERVER } from '../components/utils/misc';


export function ProductsBySell() {
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(response => response.data);

    return {
        type: PRODUCTS_BY_SELL,
        payload: request
    }
}

export function ProductsByArrival() {
    const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

    return {
        type: PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}

export function fetchProductsToShop(skip, limit, filters = [], 
    previousState = []){
        const data = {
            limit,
            skip,
            filters
        }

        const request = axios.post(`${PRODUCT_SERVER}/shop`,data)
        .then(response => {
            return {
                size: response.data.size,
                articles: response.data.articles
            }
        });

    return {
        type: FETCH_PRODUCTS_TO_SHOP,
        payload: request
    }

}

export function addProduct(datatoSubmit){

    const request = axios.post(`${PRODUCT_SERVER}/article`,datatoSubmit)
                    .then(response => response.data);

    return {
        type: ADD_PRODUCT,
        payload: request
    }
}

export function clearProduct() {
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}

//======================================
//             CATEGORIES
//======================================

export function fetchBrands() {
    const request = axios.get(`${PRODUCT_SERVER}/getbrands`)
    .then(response => response.data);
    return {
        type: FETCH_BRANDS,
        payload: request
    }
}


export function fetchWoods() {
    const request = axios.get(`${PRODUCT_SERVER}/woods`)
    .then(response => response.data);
    return {
        type: FETCH_WOODS,
        payload: request
    }
} 