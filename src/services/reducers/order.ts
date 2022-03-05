import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    HIDE_ORDER
} from '../../utils/constants';

const initialState = {
    id: '',
    failed: true,
    request: false,
    open: false,
}

export const orderReducer = (state = initialState, action:{type: string, id: string}) => {
    switch (action.type) {
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                id: action.id,
                open: true
            };
        }
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                request: true,
                failed: false,
            };
        }
        case SEND_ORDER_FAILED: {
            return initialState;
        }
        case HIDE_ORDER: {
            return {
                ...state,
                open: false
            };
        }

        default: {
            return state
        }
    }
}
