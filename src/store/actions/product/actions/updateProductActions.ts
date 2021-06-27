import { BaseAction } from '../../BaseAction';

const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
const UPDATE_PRODUCT_RESET = 'UPDATE_PRODUCT_RESET';

interface UpdateProductRequest extends BaseAction {
    type: typeof UPDATE_PRODUCT_REQUEST;
}

interface UpdateProductSuccess extends BaseAction {
    type: typeof UPDATE_PRODUCT_SUCCESS;
}

interface UpdateProductReset extends BaseAction {
    type: typeof UPDATE_PRODUCT_RESET;
}

export type { UpdateProductRequest, UpdateProductSuccess, UpdateProductReset };
export { UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_RESET };
