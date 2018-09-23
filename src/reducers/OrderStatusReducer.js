import {
    INCOMPLETE_TASK,
    COMPLETED_TASK,
    REVOKED_TASK,
    DISPUTED_TASK,
} from './../actions/types';

const INITIAL_STATE = {
    orderdTaskStatusObj: null,
    orderdTaskStatusMsg: null,
    OrderStatusType: null
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INCOMPLETE_TASK:
            return {...INITIAL_STATE, OrderStatusType: 1};
        case COMPLETED_TASK:
            return {...INITIAL_STATE, OrderStatusType: 2};
        case REVOKED_TASK:
            return {...INITIAL_STATE, OrderStatusType: 3};
        case DISPUTED_TASK:
            return {...INITIAL_STATE, OrderStatusType: 4};
        default:
            return state;
    }
}
