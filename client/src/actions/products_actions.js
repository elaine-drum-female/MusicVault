import axios from 'axios';
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

export function addProduct(dataToSubmit){

    const request = axios.post(`${PRODUCT_SERVER}/article`,dataToSubmit)
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

export function addBrand(dataToSubmit, existingBrands){
    const request = axios.post(`${PRODUCT_SERVER}/brand`,dataToSubmit)
    .then(response=>{
        let brands = [
            ...existingBrands,
            response.data.brand
        ];
        return {
            success: response.data.success,
            brands
        }
    });
    return {
        type: ADD_BRAND,
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

export function addWood(dataToSubmit, existingWood){
    const request = axios.post(`${PRODUCT_SERVER}/wood`,dataToSubmit)
    .then(response=>{
        let woods = [
            ...existingWood,
            response.data.wood
        ];
        return {
            success: response.data.success,
            woods
        }
    });
    return {
        type: ADD_WOOD,
        payload: request
    }
}