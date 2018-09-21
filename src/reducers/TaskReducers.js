import {
    GET_MY_ORDERS_SUMMARY_SUCCESS, GET_MY_ORDERS_SUMMARY_FAILURE, GET_MY_ORDERS_SUMMARY_LOADING,LOGOUT_USER,
    GET_MEMBER_CAN_RECEIVE_ACCOUNT_SUCCESS, GET_MEMBER_CAN_RECEIVE_ACCOUNT_LOADING, GET_MEMBER_CAN_RECEIVE_ACCOUNT_FAILURE, INITIALIZE_GET_MEMBER_CAN_RECEIVE_ACCOUNT,
} from "./../actions/types";

const INITIAL_STATE = {
    taskSummaryObj: null,
    bTaskSummaryLoading: false,
    taskSummaryMsg: '',
    browseTaskObj: null,
    browseTaskObjMsg: '',
    browseTaskObjLoading: false,

};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_MY_ORDERS_SUMMARY_SUCCESS:
            return {...state, taskSummaryObj : action.payload.value, bTaskSummaryLoading: false, taskSummaryMsg: action.payload.msg};
        case GET_MY_ORDERS_SUMMARY_FAILURE:
            return {...state, taskSummaryObj : null, bTaskSummaryLoading: false, taskSummaryMsg: action.payload.msg};
        case GET_MY_ORDERS_SUMMARY_LOADING:
            return {...state, bTaskSummaryLoading : true};

        case GET_MEMBER_CAN_RECEIVE_ACCOUNT_SUCCESS:
            return {...state, browseTaskObj : action.payload.value, browseTaskObjLoading: false, browseTaskObjMsg: action.payload.msg};
        case GET_MEMBER_CAN_RECEIVE_ACCOUNT_FAILURE:
            return {...state, browseTaskObj : null, browseTaskObjLoading: false, browseTaskObjMsg: action.payload.msg};
        case GET_MEMBER_CAN_RECEIVE_ACCOUNT_LOADING:
            return {...state, browseTaskObjLoading: true};
        case INITIALIZE_GET_MEMBER_CAN_RECEIVE_ACCOUNT:
            return {...state, browseTaskObj: null, browseTaskObjMsg: ''};

        case LOGOUT_USER:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}
