import {
    ADMIN_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_REVIEWS_FAIL,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    CLEAR_ERRORS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_RESET,
    NEW_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_SUCCESS,
} from '../actions/productAction';

export const productsReducer = (
    state = { loading: false, productCount: 0, resultsPerPage: 0, products: [], error: null },
    action
) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST: {
            return {
                ...state,
                loading: true,
                products: [],
            };
        }
        case ALL_PRODUCTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productCount,
                resultsPerPage: action.payload.resultsPerPage,
            };
        }
        case ADMIN_PRODUCTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                products: action.payload,
            };
        }
        case ALL_PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
            };
        }
        default: {
            return state;
        }
    }
};

export const productDetailReducer = (state = { loading: false, product: {}, error: null }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case PRODUCT_DETAILS_SUCCESS: {
            return {
                ...state,
                loading: false,
                product: action.payload,
            };
        }
        case PRODUCT_DETAILS_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
            };
        }
        default: {
            return state;
        }
    }
};

export const newReviewReducer = (state = { loading: false, success: false, error: null }, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case NEW_REVIEW_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: action.payload,
            };
        }
        case NEW_REVIEW_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case NEW_REVIEW_RESET: {
            return {
                ...state,
                success: false,
            };
        }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
            };
        }
        default: {
            return state;
        }
    }
};

export const newProductReducer = (state = { loading: false, success: false, product: {}, error: null }, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case NEW_PRODUCT_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
            };
        }
        case NEW_PRODUCT_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case NEW_PRODUCT_RESET: {
            return {
                ...state,
                success: false,
            };
        }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
            };
        }
        default: {
            return state;
        }
    }
};

export const productReducer = (
    state = { loading: false, isDeleted: false, isUpdated: false, product: {}, error: null },
    action
) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case DELETE_PRODUCT_SUCCESS: {
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        }
        case UPDATE_PRODUCT_SUCCESS: {
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        }
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case DELETE_PRODUCT_RESET: {
            return {
                ...state,
                isDeleted: false,
            };
        }
        case UPDATE_PRODUCT_RESET: {
            return {
                ...state,
                isUpdated: false,
            };
        }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
            };
        }
        default: {
            return state;
        }
    }
};

export const productReviewsReducer = (state = { loading: false, reviews: [], error: null }, action) => {
    switch (action.type) {
        case ALL_REVIEWS_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case ALL_REVIEWS_SUCCESS: {
            return {
                ...state,
                loading: false,
                reviews: action.payload,
            };
        }
        case ALL_REVIEWS_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
            };
        }
        default: {
            return state;
        }
    }
};

export const reviewReducer = (state = { loading: false, isDeleted: false, error: null }, action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }
        case DELETE_REVIEW_SUCCESS: {
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        }
        case DELETE_REVIEW_FAIL: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case DELETE_REVIEW_RESET: {
            return {
                ...state,
                loading: false,
                isDeleted: false,
            };
        }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
            };
        }
        default: {
            return state;
        }
    }
};
