import { 
    GET_SITE_DATA
} from './types';

//Return the state
export default function( state= {} , action) {
    switch(action.type) {
        case GET_SITE_DATA:
            return {...state, siteData: action.payload}
        default:
            return state;
    }
}
