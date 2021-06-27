import { BaseAction } from '../../BaseAction';

import Order from '../../../state/models/Order';

const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
const CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL';

interface CreateOrderRequest extends BaseAction {
    type: typeof CREATE_ORDER_REQUEST;
}

interface CreateOrderSuccess extends BaseAction {
    type: typeof CREATE_ORDER_SUCCESS;
    payload: Order;
}

interface CreateOrderFail extends BaseAction {
    type: typeof CREATE_ORDER_FAIL;
    payload: {
        errorMessage: string;
    };
}

export type { CreateOrderRequest, CreateOrderSuccess, CreateOrderFail };
export { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL };
