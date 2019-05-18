import axios from 'axios';
import { 
    PRODUCTS_BY_SELL, 
    PRODUCTS_BY_ARRIVAL,
    FETCH_BRANDS,
    FETCH_WOODS

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

//======================================
//             CATEGORIES
//======================================

export function getBrands() {
    
} 

export function getWoods() {

} 