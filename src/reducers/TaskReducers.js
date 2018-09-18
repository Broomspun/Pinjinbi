import {
    GET_MY_ORDERS_SUMMARY_SUCCESS, GET_MY_ORDERS_SUMMARY_FAILURE, GET_MY_ORDERS_SUMMARY_LOADING,LOGOUT_USER

} from "./../actions/types";

const INITIAL_STATE = {
    taskSummaryObj: null,
    bTaskSummaryLoading: false,
    taskSummaryMsg: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_MY_ORDERS_SUMMARY_SUCCESS:
            return {...state, taskSummaryObj : action.payload.value, bTaskSummaryLoading: false, taskSummaryMsg: ''};
        case GET_MY_ORDERS_SUMMARY_FAILURE:
            return {...state, taskSummaryObj : null, bTaskSummaryLoading: false, taskSummaryMsg: action.payload.msg};
        case GET_MY_ORDERS_SUMMARY_LOADING:
            return {...state, bTaskSummaryLoading : true};
        case LOGOUT_USER:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}
