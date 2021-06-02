import { Action } from 'redux';
import ProductState from '../../../state/models/productState';

const GET_ALL_PRODUCTS_REQUEST = 'GET_ALL_PRODUCTS_REQUEST';
const GET_ALL_PRODUCTS_SUCCESS = 'GET_ALL_PRODUCTS_SUCCESS';
const GET_ALL_PRODUCTS_FAIL = 'GET_ALL_PRODUCTS_FAIL';

interface GetAllProductsRequest extends Action {
    type: typeof GET_ALL_PRODUCTS_REQUEST;
}

interface GetAllProductsSuccess extends Action {
    type: typeof GET_ALL_PRODUCTS_SUCCESS;
    payload: {
        products: Array<ProductState>;
        productsCount: number;
    };
}

interface GetAllProductsFail extends Action {
    type: typeof GET_ALL_PRODUCTS_FAIL;
    payload: {
        errorMessage: string;
    };
}

export type { GetAllProductsRequest, GetAllProductsSuccess, GetAllProductsFail };
export { GET_ALL_PRODUCTS_REQUEST, GET_ALL_PRODUCTS_SUCCESS, GET_ALL_PRODUCTS_FAIL };
