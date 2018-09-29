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

    //API 6.7
    REMINDING_REFUNDS_SUCCESS,
    REMINDING_REFUNDS_LOADING,
    REMINDING_REFUNDS_FAILURE,
    INITIALIZE_REMINDING_REFUNDS_STATUS,

    //API 6.8
    COMPLETE_TASK_SUCCESS,
    COMPLETE_TASK_LOADING,
    COMPLETE_TASK_FAILURE,
    INITIALIZE_COMPLETE_TASK_STATUS,

    //API 6.9
    CANCEL_TASK_SUCCESS,
    CANCEL_TASK_LOADING,
    CANCEL_TASK_FAILURE,
    INITIALIZE_CANCEL_TASK_STATUS,

    //API 7.0
    GET_APPLY_STATEMENT_TYPE_SUCCESS,
    GET_APPLY_STATEMENT_TYPE_LOADING,
    GET_APPLY_STATEMENT_TYPE_FAILURE,
    INITIALIZE_GET_APPLY_STATEMENT_TYPE_STATUS,

    //API 7.1
    INITIATE_APPEAL_SUCCESS,
    INITIATE_APPEAL_LOADING,
    INITIATE_APPEAL_FAILURE,
    INITIALIZE_INITIATE_APPEAL_STATUS,

    //API 7.2
    GET_MEMBER_TASK_LIST_SUCCESS,
    GET_MEMBER_TASK_LIST_LOADING,
    GET_MEMBER_TASK_LIST_FAILURE,
    INITIALIZE_GET_MEMBER_TASK_LIST_STATUS,

    //API 7.3
    GET_APPEAL_LIST_PAGE_SUCCESS,
    GET_APPEAL_LIST_PAGE_LOADING,
    GET_APPEAL_LIST_PAGE_FAILURE,
    INITIALIZE_GET_APPEAL_LIST_PAGE_STATUS,

    //API 7.4
    GET_APPEAL_INFO_SUCCESS,
    GET_APPEAL_INFO_LOADING,
    GET_APPEAL_INFO_FAILURE,
    INITIALIZE_GET_APPEAL_INFO_STATUS,

    //API 7.5
    INITIATE_PLATEFORM_INVOLVEMENT_SUCCESS,
    INITIATE_PLATEFORM_INVOLVEMENT_LOADING,
    INITIATE_PLATEFORM_INVOLVEMENT_FAILURE,
    INITIALIZE_INITIATE_PLATEFORM_INVOLVEMENT_STATUS,

    //API 7.6
    LOADING_WITHDRAW_PAGE_SUCCESS,
    LOADING_WITHDRAW_PAGE_LOADING,
    LOADING_WITHDRAW_PAGE_FAILURE,
    INITIALIZE_LOADING_WITHDRAW_PAGE_STATUS,


    //API 7.7
    COMM_COMMISSION_WITHDRAWAL_SUCCESS,
    COMM_COMMISSION_WITHDRAWAL_LOADING,
    COMM_COMMISSION_WITHDRAWAL_FAILURE,
    INITIALIZE_COMM_COMMISSION_WITHDRAWAL_STATUS,

    //API 7.8
    PRINCIPAL_WITHDRAWL_SUCCESS,
    PRINCIPAL_WITHDRAWL_LOADING,
    PRINCIPAL_WITHDRAWL_FAILURE,
    INITIALIZE_PRINCIPAL_WITHDRAWL_STATUS,

    //API 8.8
    SUBMIT_CONFIRM_SUCCESS,
    SUBMIT_CONFIRM_LOADING,
    SUBMIT_CONFIRM_FAILURE,
    INITIALIZE_SUBMIT_CONFIRM_STATUS,
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


    //API 6.3 GetmemberTaskaccept
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

    //API 6.7
    //RemindingRefunds
    remindingRefundsObj:null,
    remindingRefundsStatus:null,
    remindingRefundsLoading:false,
    remindingRefundsMsg:'',

    //API 6.8
    //Complate Task
    complateTaskObj: null,
    complateTaskStatus: null,
    complateTaskLoading: false,
    complateTaskMsg:'',

    //API 6.9
    //Cancel Task
    cancelTaskObj: null,
    cancelTaskStatus: null,
    cancelTaskLoading: false,
    cancelTaskMsg:'',

    //API 7.0
    //Get all appeal types
    getApplyStatementTypeObj: null,
    getApplyStatementTypeStatus: null,
    getApplyStatementTypeLoading: false,
    getApplyStatementTypeMsg:'',

    //API 7.1
    //Member application for appeal
    initiateAppealObj: null,
    initialteAppealStatus: null,
    initialteApplealLoading: false,
    initialteApplealMsg:'',

    //API 7.2
    //Obtain the member's order list according to different status values
    getMemberTaskListObj: null,
    getMemberTaskListStatus: null,
    getMemberTaskListLoading: false,
    getMemberTaskListMsg: '',

    //API 7.3
    //Obtain a list of data according to different complainants
    getAppealListPageObj: null,
    getAppealListPageStatus: null,
    getAppealListPageLoading:false,
    getAppealListPageMsg:'',

    //API 7.4
    //View grievance details
    getAppealInfoObj: null,
    getAppealInfoStatus: null,
    getAppealInfoLoading: false,
    getAppealInfoMsg:'',


    //API 7.5
    //Initiating platform involvement
    initiatePlateformInvolvementObj: null,
    initiatePlateformInvolvementStatus: null,
    initiatePlateformInvolvementLoading: false,
    initiatePlateformInvolvementMsg:'',

    //API 7.6
    //Cashing page binding data loading
    loadingWithdrawPageObj: null,
    loadingWithdrawPageStatus: null,
    loadingWithdrawPageLoading: false,
    loadingWithdrawPageMsg:'',

    //API 7.7
    //Commission withdrawal
    commCommissionWithdrawalObj: null,
    commCommissionWithdrawalStatus: null,
    commCommissionWithdrawalLoading: false,
    commCommissionWithdrawalMsg: '',

    //API 7.8
    //Cash withdrawal
    principalWithdrawlObj:null,
    principalWithdrawlStatus: null,
    principalWithdrawlLoading: false,
    principalWithdrawlMsg: '',


    //API 8.8
    //Entities with prizes, submit receipt of information
    submitConfirmObj: null,
    submitConfirmStatus: null,
    submitConfirmLoading: false,
    submitConfirmMsg: '',
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
            return {...state,loadTaskObj:null, loadTaskLoading:true};
        case INITIALIZE_LOAD_OPERATIONAL_STATUS:
            return {...state, loadTaskStatus:null};

        case VERIFY_SHOP_NAME_SUCCESS:
            return {...state , verifyShopNameStatusObj:action.payload.value, verifyShopNameStatus:true,verifyShopNameStatusMsg:action.payload.msg};
        case VERIFY_SHOP_NAME_FAILURE:
            return {...state,verifyShopNameStatusObj:null, verifyShopNameStatus:false,verifyShopNameStatusMsg:action.payload.msg,verifyShopNameStatusLoading:false};
        case VERIFY_SHOP_NAME_LOADING:
            return {...state,verifyShopNameStatusObj:null, verifyShopNameStatusLoading:true};
        case INITIALIZE_VERIFY_SHOP_NAME_STATUS:
            return {...state, verifyShopNameStatus:null};


        case SUBMIT_TASK_SUCCESS:
            return {...state , submitTaskObj:action.payload.value, submitTaskStatus:true,submitTaskLoading:false, submitTaskMsg:action.payload.msg};
        case SUBMIT_TASK_FAILURE:
            return {...state,submitTaskObj:null, submitTaskStatus:false,submitTaskMsg:action.payload.msg, submitTaskLoading:false};
        case SUBMIT_TASK_LOADING:
            return {...state, submitTaskLoading:true};
        case INITIALIZE_SUBMIT_TASK_STATUS:
            return {...state, submitTaskStatus:null};

        case REMINDING_REFUNDS_SUCCESS:
            return {...state , remindingRefundsObj:action.payload.value,remindingRefundsStatus:true,remindingRefundsLoading:false,remindingRefundsMsg:action.payload.msg};
        case REMINDING_REFUNDS_FAILURE:
            return {...state,remindingRefundsObj:null, remindingRefundsStatus:false,remindingRefundsMsg:action.payload.msg,remindingRefundsLoading:false};
        case REMINDING_REFUNDS_LOADING:
            return {...state,remindingRefundsObj:null, remindingRefundsLoading:true};
        case INITIALIZE_REMINDING_REFUNDS_STATUS:
            return {...state, remindingRefundsStatus:null};


        case COMPLETE_TASK_SUCCESS:
            return {...state , complateTaskObj:action.payload.value,complateTaskStatus:true,complateTaskLoading:false, complateTaskMsg:action.payload.msg};
        case COMPLETE_TASK_FAILURE:
            return {...state,complateTaskObj:null, complateTaskStatus:false,complateTaskMsg:action.payload.msg,complateTaskLoading:false};
        case COMPLETE_TASK_LOADING:
            return {...state,complateTaskObj:null, complateTaskLoading:true};
        case INITIALIZE_COMPLETE_TASK_STATUS:
            return {...state, complateTaskStatus:null};


        case CANCEL_TASK_SUCCESS:
            return {...state , cancelTaskObj:action.payload.value,cancelTaskStatus:true,cancelTaskLoading:false};
        case CANCEL_TASK_FAILURE:
            return {...state,cancelTaskObj:null, cancelTaskStatus:false,cancelTaskMsg:action.payload.msg,cancelTaskLoading:false};
        case CANCEL_TASK_LOADING:
            return {...state,cancelTaskObj:null, cancelTaskLoading:true};
        case INITIALIZE_CANCEL_TASK_STATUS:
            return {...state,cancelTaskStatus:null};

        case GET_APPLY_STATEMENT_TYPE_SUCCESS:
            return {...state , getApplyStatementTypeObj:action.payload.value,getApplyStatementTypeStatus:true,getApplyStatementTypeLoading:false};
        case GET_APPLY_STATEMENT_TYPE_FAILURE:
            return {...state,getApplyStatementTypeObj:null, getApplyStatementTypeStatus:false,getApplyStatementTypeMsg:action.payload.msg,getApplyStatementTypeLoading:false};
        case GET_APPLY_STATEMENT_TYPE_LOADING:
            return {...state,getApplyStatementTypeObj:null, getApplyStatementTypeLoading:true};
        case INITIALIZE_GET_APPLY_STATEMENT_TYPE_STATUS:
            return {...state, getApplyStatementTypeStatus:null};

        case INITIATE_APPEAL_SUCCESS:
            return {...state , initiateAppealObj:action.payload.value,initialteAppealStatus:true,initialteApplealLoading:false};
        case INITIATE_APPEAL_FAILURE:
            return {...state,initiateAppealObj:null, initialteAppealStatus:false,initialteApplealMsg:action.payload.msg,initialteApplealLoading:false};
        case INITIATE_APPEAL_LOADING:
            return {...state,initiateAppealObj:null, initialteApplealLoading:true};
        case INITIALIZE_INITIATE_APPEAL_STATUS:
            return {...state, initialteAppealStatus:null};

        case GET_MEMBER_TASK_LIST_SUCCESS:
            return {...state , getMemberTaskListObj:action.payload.value,getMemberTaskListStatus:true,getMemberTaskListLoading:false, getMemberTaskListMsg:action.payload.msg};
        case GET_MEMBER_TASK_LIST_FAILURE:
            return {...state,getMemberTaskListObj:null, getMemberTaskListStatus:false,getMemberTaskListMsg:action.payload.msg,getMemberTaskListLoading:false};
        case GET_MEMBER_TASK_LIST_LOADING:
            return {...state, getMemberTaskListLoading:true};
        case INITIALIZE_GET_MEMBER_TASK_LIST_STATUS:
            return {...state,getMemberTaskListStatus:null};


        case GET_APPEAL_LIST_PAGE_SUCCESS:
            return {...state , getAppealListPageObj:action.payload.value,getAppealListPageStatus:true,getAppealListPageLoading:false};
        case GET_APPEAL_LIST_PAGE_FAILURE:
            return {...state,getAppealListPageObj:null, getAppealListPageStatus:false,getAppealListPageMsg:action.payload.msg,getAppealListPageLoading:false};
        case GET_APPEAL_LIST_PAGE_LOADING:
            return {...state,getAppealListPageObj:null, getAppealListPageLoading:true};
        case INITIALIZE_GET_APPEAL_LIST_PAGE_STATUS:
            return {...state, getAppealListPageStatus:null};


        case GET_APPEAL_INFO_SUCCESS:
            return {...state , getAppealInfoObj:action.payload.value,getAppealInfoStatus:true,getAppealInfoLoading:false};
        case GET_APPEAL_INFO_FAILURE:
            return {...state,getAppealInfoObj:null, getAppealInfoStatus:false,getAppealInfoMsg:action.payload.msg,getAppealInfoLoading:false};
        case GET_APPEAL_INFO_LOADING:
            return {...state,getAppealInfoObj:null, getAppealInfoLoading:true};
        case INITIALIZE_GET_APPEAL_INFO_STATUS:
            return {...state,getAppealInfoStatus:null};


        case INITIATE_PLATEFORM_INVOLVEMENT_SUCCESS:
            return {...state , initiatePlateformInvolvementObj:action.payload.value,initiatePlateformInvolvementStatus:true,initiatePlateformInvolvementLoading:false};
        case INITIATE_PLATEFORM_INVOLVEMENT_FAILURE:
            return {...state,initiatePlateformInvolvementObj:null, initiatePlateformInvolvementStatus:false,initiatePlateformInvolvementMsg:action.payload.msg,initiatePlateformInvolvementLoading:false};
        case INITIATE_PLATEFORM_INVOLVEMENT_LOADING:
            return {...state,initiatePlateformInvolvementLoading:true};
        case INITIALIZE_INITIATE_PLATEFORM_INVOLVEMENT_STATUS:
            return {...state,initiatePlateformInvolvementStatus:null};

        case LOADING_WITHDRAW_PAGE_SUCCESS:
            return {...state , loadingWithdrawPageObj:action.payload.value,loadingWithdrawPageStatus:true,loadingWithdrawPageLoading:false};
        case LOADING_WITHDRAW_PAGE_FAILURE:
            return {...state,loadingWithdrawPageObj:null, loadingWithdrawPageStatus:false,loadingWithdrawPageMsg:action.payload.msg,loadingWithdrawPageLoading:false};
        case LOADING_WITHDRAW_PAGE_LOADING:
            return {...state,loadingWithdrawPageLoading:true};
        case INITIALIZE_LOADING_WITHDRAW_PAGE_STATUS:
            return {...state,loadingWithdrawPageStatus:null};

        case COMM_COMMISSION_WITHDRAWAL_SUCCESS:
            return {...state , commCommissionWithdrawalObj:action.payload.value,commCommissionWithdrawalStatus:true,commCommissionWithdrawalLoading:false};
        case COMM_COMMISSION_WITHDRAWAL_FAILURE:
            return {...state,commCommissionWithdrawalObj:null, commCommissionWithdrawalStatus:false,commCommissionWithdrawalMsg:action.payload.msg,commCommissionWithdrawalLoading:false};
        case COMM_COMMISSION_WITHDRAWAL_LOADING:
            return {...state,commCommissionWithdrawalLoading:true};
        case INITIALIZE_COMM_COMMISSION_WITHDRAWAL_STATUS:
            return {...state,commCommissionWithdrawalStatus:null,};

        case PRINCIPAL_WITHDRAWL_SUCCESS:
            return {...state , principalWithdrawlObj:action.payload.value,principalWithdrawlStatus:true,principalWithdrawlLoading:false};
        case PRINCIPAL_WITHDRAWL_FAILURE:
            return {...state,principalWithdrawlObj:null, principalWithdrawlStatus:false,principalWithdrawlMsg:action.payload.msg,principalWithdrawlLoading:false};
        case PRINCIPAL_WITHDRAWL_LOADING:
            return {...state,principalWithdrawlLoading:true};
        case INITIALIZE_PRINCIPAL_WITHDRAWL_STATUS:
            return {...state,principalWithdrawlStatus:null};

        case SUBMIT_CONFIRM_SUCCESS:
            return {...state , submitConfirmObj:action.payload.value,submitConfirmStatus:true,submitConfirmLoading:false};
        case SUBMIT_CONFIRM_FAILURE:
            return {...state,submitConfirmObj:null, submitConfirmStatus:false,submitConfirmMsg:action.payload.msg,submitConfirmLoading:false};
        case SUBMIT_CONFIRM_LOADING:
            return {...state,submitConfirmLoading:true};
        case INITIALIZE_SUBMIT_CONFIRM_STATUS:
            return {...state,submitConfirmStatus:null};

        case LOGOUT_USER:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}
