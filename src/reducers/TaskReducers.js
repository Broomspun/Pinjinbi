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

    GET_MEMBER_TASK_ACCEPT_SUCCESS,
    GET_MEMBER_TASK_ACCEPT_LOADING,
    GET_MEMBER_TASK_ACCEPT_FAILURE,
    INITIALIZE_GET_MEMBER_TASK_ACCEPT_STATUS,

    LOAD_OPERATIONAL_SUCCESS,
    LOAD_OPERATIONAL_LOADING,
    LOAD_OPERATIONAL_FAILURE,
    INITIALIZE_LOAD_OPERATIONAL_STATUS,

    //API 6.5
    VERIFY_SHOP_NAME_SUCCESS,
    VERIFY_SHOP_NAME_LOADING,
    VERIFY_SHOP_NAME_FAILURE,
    INITIALIZE_VERIFY_SHOP_NAME_STATUS,

    //API 6.6
    SUBMIT_TASK_SUCCESS,
    SUBMIT_TASK_LOADING,
    SUBMIT_TASK_FAILURE,
    INITIALIZE_SUBMIT_TASK_STATUS,

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

    taskObj: null,
    taskObjMsg: '',
    taskObjLoading: false,
    taskObjStatus: null,


    systemTaskObj: null,
    systemTaskObjMsg: '',
    systemTaskObjLoading: false,
    systemTaskObjStatus: null,

    selectedTaskNo: null,


    //GetmemberTaskaccept
    acceptTaskObj: null,
    acceptTask_success: null,
    acceptTask_failure: null,
    acceptTask_loading: null,
    acceptTaskMsg:'',
    initialize_acceptTask_status:null,

    //task page data load
    //API 6.4
    loadTaskObj: null,
    loadTaskStatus:null,
    loadTaskLoading:false,
    loadTaskMsg:'',

    //API 6.5
    //verify Shop business platform
    verifyShopNameStatusObj: null,
    verifyShopNameStatus:null,
    verifyShopNameStatusLoading:false,
    verifyShopNameStatusMsg:'',

    //API 6.6
    //Submit Jobs
    submitTaskObj: null,
    submitTaskStatus:null,
    submitTaskLoading:false,
    submitTaskMsg:'',
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
            return {...state, browseTaskObjSuccessed: null};


        case GET_TASK_LIST_SUCCESS:
            return {...state, taskListsObj : action.payload.value, browseTaskObjLoading: false, taskListsObjMsg: action.payload.msg, taskListsObjSuccessed: true};
        case GET_TASK_LIST_FAILURE:
            return {...state, taskListsObj : null, browseTaskObjLoading: false, taskListsObjMsg: action.payload.msg, taskListsObjSuccessed: false};
        case GET_TASK_LIST_LOADING:
            return {...state, taskListsObjLoading: true};
        case INITIALIZE_TASK_LIST_STATUS:
            return {...state, taskListsObjSuccessed: null};

        case USER_DETERMINE_TASK_SUCCESS:
            return {...state, taskObj : action.payload.value, taskObjLoading: false, taskObjMsg: action.payload.msg, taskObjStatus: true};
        case USER_DETERMINE_TASK_FAILURE:
            return {...state, taskObj : null, taskObjLoading: false, taskObjMsg: action.payload.msg, taskObjStatus: false};
        case USER_DETERMINE_TASK_LOADING:
            return {...state, taskObjLoading: true};
        case INITIALIZE_USER_DETERMINE_TASK_STATUS:
            return {...state, taskObjStatus: null};


        case SYSTEM_SEND_TASK_SUCCESS:
            return {...state, systemTaskObj : action.payload.value, systemTaskObjLoading: false, systemTaskObjMsg: action.payload.msg, systemTaskObjStatus: true};
        case SYSTEM_SEND_TASK_FAILURE:
            return {...state, systemTaskObj : null, systemTaskObjLoading: false, systemTaskObjMsg: action.payload.msg, systemTaskObjStatus: false};
        case SYSTEM_SEND_TASK_LOADING:
            return {...state, systemTaskObjLoading: true};
        case INITIALIZE_SYSTEM_SEND_TASK_STATUS:
            return {...state, systemTaskObjStatus: null};

        case SELECTED_TASK_NO:
            return {...state, selectedTaskNo: action.payload};

        case INITIALIZE_SELECTED_TASK_NO:
            return {...state, selectedTaskNo: null};

        case GET_MEMBER_TASK_ACCEPT_LOADING:
            return {...state ,acceptTaskObj: null,acceptTask_loading:true,initialize_acceptTask_status:null}
        case GET_MEMBER_TASK_ACCEPT_SUCCESS:
            return {...state ,acceptTaskObj: action.payload.value,acceptTask_loading:false,acceptTaskMsg:action.payload.msg,initialize_acceptTask_status:null}
        case GET_MEMBER_TASK_ACCEPT_FAILURE:
            return {...state ,acceptTaskObj: null,acceptTask_loading:false,acceptTask_failure:true,initialize_acceptTask_status:null}

        case LOAD_OPERATIONAL_SUCCESS:
            return {...state , loadTaskObj:action.payload.value,loadTaskStatus:true,loadTaskLoading:false};
        case LOAD_OPERATIONAL_FAILURE:
            return {...state,loadTaskObj:null, loadTaskStatus:false,loadTaskMsg:action.payload.msg,loadTaskLoading:false};
        case LOAD_OPERATIONAL_LOADING:
            return {...state,loadTaskObj:null, loadTaskStatus:false,loadTaskLoading:true};
        case INITIALIZE_LOAD_OPERATIONAL_STATUS:
            return {...state, loadTaskStatus:null};

        case VERIFY_SHOP_NAME_SUCCESS:
            return {...state , verifyShopNameStatusObj:action.payload.value, verifyShopNameStatus:true,verifyShopNameStatusMsg:false};
        case VERIFY_SHOP_NAME_FAILURE:
            return {...state,verifyShopNameStatusObj:null, verifyShopNameStatus:false,verifyShopNameStatusMsg:action.payload.msg,verifyShopNameStatusLoading:false};
        case VERIFY_SHOP_NAME_LOADING:
            return {...state,verifyShopNameStatusObj:null, verifyShopNameStatusLoading:true};
        case INITIALIZE_VERIFY_SHOP_NAME_STATUS:
            return {...state, verifyShopNameStatus:null};


        case SUBMIT_TASK_SUCCESS:
            return {...state , submitTaskObj:action.payload.value,submitTaskStatus:true,submitTaskLoading:false};
        case SUBMIT_TASK_FAILURE:
            return {...state,submitTaskObj:null, submitTaskStatus:false,submitTaskMsg:action.payload.msg, submitTaskLoading:false};
        case SUBMIT_TASK_LOADING:
            return {...state,submitTaskObj:null, submitTaskStatus:false,submitTaskLoading:true};
        case INITIALIZE_SUBMIT_TASK_STATUS:
            return {...state,submitTaskObj:null, submitTaskStatus:null,submitTaskLoading:false};

        case LOGOUT_USER:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}
