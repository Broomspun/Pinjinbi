import {
    GET_MY_ORDERS_SUMMARY_SUCCESS,
    GET_MY_ORDERS_SUMMARY_FAILURE,
    GET_MY_ORDERS_SUMMARY_LOADING,
    LOGOUT_USER,
    GET_MEMBER_CAN_RECEIVE_ACCOUNT_SUCCESS,
    GET_MEMBER_CAN_RECEIVE_ACCOUNT_LOADING,
    GET_MEMBER_CAN_RECEIVE_ACCOUNT_FAILURE,
    INITIALIZE_GET_MEMBER_CAN_RECEIVE_ACCOUNT,
    USER_DETERMINE_TASK_SUCCESS,
    USER_DETERMINE_TASK_FAILURE,
    USER_DETERMINE_TASK_LOADING,
    INITIALIZE_USER_DETERMINE_TASK_STATUS,
    SYSTEM_SEND_TASK_SUCCESS,
    SYSTEM_SEND_TASK_FAILURE,
    SYSTEM_SEND_TASK_LOADING,
    INITIALIZE_SYSTEM_SEND_TASK_STATUS, SELECTED_TASK_NO, INITIALIZE_SELECTED_TASK_NO,
} from "./../actions/types";
import {
    GET_TASK_LIST_FAILURE,
    GET_TASK_LIST_LOADING,
    GET_TASK_LIST_SUCCESS,
    INITIALIZE_TASK_LIST_STATUS
} from "../actions/types";

const INITIAL_STATE = {
    taskSummaryObj: null,
    bTaskSummaryLoading: false,
    taskSummaryMsg: '',
    browseTaskObj: null,
    browseTaskObjMsg: '',
    browseTaskObjLoading: false,
    browseTaskObjSuccessed: null,

    taskListsObj: null,
    taskListsObjMsg: '',
    taskListsObjLoading: false,
    taskListsObjSuccessed: null,

    taksObj: null,
    taksObjMsg: '',
    taksObjLoading: false,
    taksObjStatus: null,


    systemTaksObj: null,
    systemTaksObjMsg: '',
    systemTaksObjLoading: false,
    systemTaksObjStatus: null,

    selectedTaskNo: null

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
            return {...state, browseTaskObj : action.payload.value, browseTaskObjLoading: false, browseTaskObjMsg: action.payload.msg, browseTaskObjSuccessed: true};
        case GET_MEMBER_CAN_RECEIVE_ACCOUNT_FAILURE:
            return {...state, browseTaskObj : null, browseTaskObjLoading: false, browseTaskObjMsg: action.payload.msg, browseTaskObjSuccessed: false};
        case GET_MEMBER_CAN_RECEIVE_ACCOUNT_LOADING:
            return {...state, browseTaskObjLoading: true};
        case INITIALIZE_GET_MEMBER_CAN_RECEIVE_ACCOUNT:
            return {...state, browseTaskObj: null, browseTaskObjMsg: '', browseTaskObjSuccessed: null};


        case GET_TASK_LIST_SUCCESS:
            return {...state, taskListsObj : action.payload.value, browseTaskObjLoading: false, taskListsObjMsg: action.payload.msg, taskListsObjSuccessed: true};
        case GET_TASK_LIST_FAILURE:
            return {...state, taskListsObj : null, browseTaskObjLoading: false, taskListsObjMsg: action.payload.msg, taskListsObjSuccessed: false};
        case GET_TASK_LIST_LOADING:
            return {...state, taskListsObjLoading: true};
        case INITIALIZE_TASK_LIST_STATUS:
            return {...state, taskListsObj: null, taskListsObjMsg: '', taskListsObjSuccessed: null};

        case USER_DETERMINE_TASK_SUCCESS:
            return {...state, taksObj : action.payload.value, taksObjLoading: false, taksObjMsg: action.payload.msg, taksObjStatus: true};
        case USER_DETERMINE_TASK_FAILURE:
            return {...state, taksObj : null, taksObjLoading: false, taksObjMsg: action.payload.msg, taksObjStatus: false};
        case USER_DETERMINE_TASK_LOADING:
            return {...state, taksObjLoading: true};
        case INITIALIZE_USER_DETERMINE_TASK_STATUS:
            return {...state, taksObj: null, taksObjMsg: '', taksObjStatus: null};


        case SYSTEM_SEND_TASK_SUCCESS:
            return {...state, systemTaksObj : action.payload.value, systemTaksObjLoading: false, systemTaksObjMsg: action.payload.msg, systemTaksObjStatus: true};
        case SYSTEM_SEND_TASK_FAILURE:
            return {...state, systemTaksObj : null, systemTaksObjLoading: false, systemTaksObjMsg: action.payload.msg, systemTaksObjStatus: false};
        case SYSTEM_SEND_TASK_LOADING:
            return {...state, systemTaksObjLoading: true};
        case INITIALIZE_SYSTEM_SEND_TASK_STATUS:
            return {...state, systemTaksObjStatus: null};

        case SELECTED_TASK_NO:
            return {...state, selectedTaskNo: action.payload};

        case INITIALIZE_SELECTED_TASK_NO:
            return {...state, selectedTaskNo: null};

        case LOGOUT_USER:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}
