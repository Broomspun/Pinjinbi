import {
    GET_MY_ORDERS_SUMMARY_SUCCESS,
    GET_MY_ORDERS_SUMMARY_FAILURE,
    GET_MY_ORDERS_SUMMARY_LOADING,

    GET_MEMBER_CAN_RECEIVE_ACCOUNT_SUCCESS,
    GET_MEMBER_CAN_RECEIVE_ACCOUNT_LOADING,
    GET_MEMBER_CAN_RECEIVE_ACCOUNT_FAILURE,

    GET_TASK_LIST_SUCCESS,
    GET_TASK_LIST_LOADING,
    GET_TASK_LIST_FAILURE,
    USER_DETERMINE_TASK_LOADING,
    USER_DETERMINE_TASK_SUCCESS,
    USER_DETERMINE_TASK_FAILURE,
    SYSTEM_SEND_TASK_FAILURE,
    SYSTEM_SEND_TASK_SUCCESS,
    SYSTEM_SEND_TASK_LOADING,

    LOAD_OPERATIONAL_SUCCESS,
    LOAD_OPERATIONAL_LOADING,
    LOAD_OPERATIONAL_FAILURE,

    GET_MEMBER_TASK_ACCEPT_LOADING,
    GET_MEMBER_TASK_ACCEPT_SUCCESS,
    GET_MEMBER_TASK_ACCEPT_FAILURE,

    //API 6.5
    VERIFY_SHOP_NAME_SUCCESS,
    VERIFY_SHOP_NAME_LOADING,
    VERIFY_SHOP_NAME_FAILURE,

    //API 6.6
    SUBMIT_TASK_SUCCESS,
    SUBMIT_TASK_LOADING,
    SUBMIT_TASK_FAILURE,

    //API 6.7
    REMINDING_REFUNDS_SUCCESS,
    REMINDING_REFUNDS_LOADING,
    REMINDING_REFUNDS_FAILURE,


    //API 6.8
    COMPLETE_TASK_SUCCESS,
    COMPLETE_TASK_LOADING,
    COMPLETE_TASK_FAILURE,

    //API 6.9
    CANCEL_TASK_SUCCESS,
    CANCEL_TASK_LOADING,
    CANCEL_TASK_FAILURE,

    //API 7.0
    GET_APPLY_STATEMENT_TYPE_SUCCESS,
    GET_APPLY_STATEMENT_TYPE_LOADING,
    GET_APPLY_STATEMENT_TYPE_FAILURE,

    //API 7.1
    INITIATE_APPEAL_SUCCESS,
    INITIATE_APPEAL_LOADING,
    INITIATE_APPEAL_FAILURE,

    //API 7.2
    GET_MEMBER_TASK_LIST_SUCCESS,
    GET_MEMBER_TASK_LIST_LOADING,
    GET_MEMBER_TASK_LIST_FAILURE,

    //API 7.3
    GET_APPEAL_LIST_PAGE_SUCCESS,
    GET_APPEAL_LIST_PAGE_LOADING,
    GET_APPEAL_LIST_PAGE_FAILURE,

    //API 7.4
    GET_APPEAL_INFO_SUCCESS,
    GET_APPEAL_INFO_LOADING,
    GET_APPEAL_INFO_FAILURE,

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
} from "./types";


import { requestPOST_API,requestGET_API} from "../Services";

/**
 * API 9.3 http://pjbapi.wtvxin.com/api/Task/GetMyOrderCount
 *         Get the total number of orders in different states under different task types
 * @param UserId
 * @param Token
 * @returns {Function}
 */
export const getMyOrdersSummary = (UserId, Token)=> {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_MY_ORDERS_SUMMARY_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/GetMyOrderCount',
                {UserId: UserId, Token: Token}
            );

            if(res.status===200) {
                dispatch({
                    type: GET_MY_ORDERS_SUMMARY_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: GET_MY_ORDERS_SUMMARY_FAILURE,
                    payload: {value:res.msg, msg: res.msg}
                });
            }
        })();
    };
}
;
/**
 * API 6.0 http://pjbapi.wtvxin.com/api/Task/GetMemberCanReceiveAccount
 * @param UserId
 * @param Token
 * @param PlatId
 * @param TaskType
 * @returns {Function}
 */
export const getMemberCanReceiveAccount = (UserId, Token,PlatId, TaskType)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_MEMBER_CAN_RECEIVE_ACCOUNT_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/GetMemberCanReceiveAccount',
                {UserId: UserId, Token: Token, PlatId: PlatId,TaskType: TaskType}
            );
            if(res.status===200) {
                dispatch({
                    type: GET_MEMBER_CAN_RECEIVE_ACCOUNT_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: GET_MEMBER_CAN_RECEIVE_ACCOUNT_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
};

/**
 * API 6.1 http://pjbapi.wtvxin.com/api/Task/GetTaskList
 * @param UserId
 * @param Token
 * @param AccountId
 * @param PlatId
 * @param MaxAdvandcePayMoney
 * @param TaskType 1: Advanced Task, 2: Browse Task
 * @param Page = 1 (default)
 * @param PageSize = 10 (default)
 * @returns {Function}
 */
export const getTaskList = (UserId, Token, AccountId, PlatId, MaxAdvandcePayMoney, TaskType, Page=1, PageSize=10)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_TASK_LIST_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/GetTaskList',
                {UserId: UserId, Token: Token, Page: Page,PageSize: PageSize,AccountId: AccountId,PlatId:PlatId,MaxAdvandcePayMoney:MaxAdvandcePayMoney,TaskType: TaskType}
            );
            if(res.status===200) {
                dispatch({
                    type: GET_TASK_LIST_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: GET_TASK_LIST_FAILURE,
                    payload: {value:null, msg: res.msg, errCode: res.status}
                });
            }
        })();
    };
};

/**
 * API 8.5 http://pjbapi.wtvxin.com/api/Task/SystemSendTask, System dispatch
 * @param UserId
 * @param Token
 * @param AccountId
 * @param PlatId
 * @param MaxAdvandcePayMoney
 * @param TaskType
 * @returns {Function}
 */
export const systemSendTask = (UserId, Token, AccountId, PlatId, MaxAdvandcePayMoney, TaskType)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: SYSTEM_SEND_TASK_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/SystemSendTask',
                {UserId: UserId, Token: Token, AccountId: AccountId,PlatId:PlatId,MaxAdvandcePayMoney:MaxAdvandcePayMoney,TaskType: TaskType}
            );
            if(res.status===200) {
                dispatch({
                    type: SYSTEM_SEND_TASK_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: SYSTEM_SEND_TASK_FAILURE,
                    payload: {value:null, msg: res.msg, errCode: res.status}
                });
            }
        })();
    };
};

/**
 * API 6.2 http://pjbapi.wtvxin.com/api/Task/UserDetermineTask
 * @param UserId
 * @param Token
 * @param AccountId: PlatAccount
 * @param TaskListNo: Task List Number
 * @returns {Function}
 */
export const UserDetermineTask = (UserId, Token, AccountId, TaskListNo) => {
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: USER_DETERMINE_TASK_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/UserDetermineTask',
                {UserId: UserId, Token: Token, AccountId: AccountId, TaskListNo: TaskListNo}
            );
            if(res.status===200) {
                dispatch({
                    type: USER_DETERMINE_TASK_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: USER_DETERMINE_TASK_FAILURE,
                    payload: {value:null, msg: res.msg, errCode: res.status}
                });
            }
        })();
    };
};


/**
 * API 6.3
 *        http://pjbapi.wtvxin.com/api/Task/GetMemberTaskAccept
 * @param UserId
 * @param Token
 * @param TaskAcceptNo
 * @returns {Function}
 */
export const getMemberTaskAccept = (UserId, Token,TaskAcceptNo)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_MEMBER_TASK_ACCEPT_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/GetMemberTaskAccept',
                {UserId: UserId, Token: Token,TaskAcceptNo: TaskAcceptNo}
            );
            if(res.status===200) {
                dispatch({
                    type: GET_MEMBER_TASK_ACCEPT_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: GET_MEMBER_TASK_ACCEPT_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}


/**
 * API 6.4, http://pjbapi.wtvxin.com/api/Task/LoadOperationalTask
 *        Operational tasks page data load
 * @param UserId
 * @param Token
 * @param TaskAcceptNo
 * @returns {Function}
 */
export const loadOperationTask = (UserId, Token,TaskAcceptNo)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: LOAD_OPERATIONAL_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/LoadOperationalTask',
                {UserId: UserId, Token: Token,TaskAcceptNo: TaskAcceptNo}
            );
            if(res.status===200) {
                dispatch({
                    type: LOAD_OPERATIONAL_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: LOAD_OPERATIONAL_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
};


/**
 * API 6.5
 * http://pjbapi.wtvxin.com/api/Task/VerifyShopName
 * @param UserId
 * @param Token
 * @param TaskAcceptNo
 * @param ShopName
 * @returns {Function}
 */
export const verifyShopName = (UserId, Token,TaskAcceptNo,ShopName)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: VERIFY_SHOP_NAME_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/VerifyShopName',
                {UserId: UserId, Token: Token,TaskAcceptNo: TaskAcceptNo,ShopName:ShopName}
            );
            if(res.status===200) {
                dispatch({
                    type: VERIFY_SHOP_NAME_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: VERIFY_SHOP_NAME_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}



/**
 * API 6.6
 * http://pjbapi.wtvxin.com/api/Task/SubmitTask
 * @param UserId
 * @param Token
 * @param TaskAcceptNo
 * @param ImgJson
 * @param PlatOrderNo
 * @returns {Function}
 */
export const submitTask = (UserId, Token,TaskAcceptNo,ImgJson,PlatOrderNo)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: SUBMIT_TASK_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/SubmitTask',
                {UserId: UserId, Token: Token,TaskAcceptNo: TaskAcceptNo,ImgJson:ImgJson,PlatOrderNo:PlatOrderNo}
            );
            if(res.status===200) {
                dispatch({
                    type: SUBMIT_TASK_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: SUBMIT_TASK_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}


/**
 * API 6.7
 * http://pjbapi.wtvxin.com/api/Task/RemindingRefunds
 * @param UserId
 * @param Token
 * @param TaskAcceptNo
 * @returns {Function}
 */
export const remindingrefunds = (UserId, Token,TaskAcceptNo)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: REMINDING_REFUNDS_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/RemindingRefunds',
                {UserId: UserId, Token: Token,TaskAcceptNo: TaskAcceptNo}
            );
            if(res.status===200) {
                dispatch({
                    type: REMINDING_REFUNDS_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: REMINDING_REFUNDS_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}


/**
 * API 6.8
 * http://pjbapi.wtvxin.com/api/Task/CompleteTask
 * @param UserId
 * @param Token
 * @param TaskAcceptNo
 * @param OkImgJson
 * @returns {Function}
 */
export const completeTask = (UserId, Token,TaskAcceptNo,OkImgJson)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: COMPLETE_TASK_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/CompleteTask',
                {UserId: UserId, Token: Token,TaskAcceptNo: TaskAcceptNo,OkImgJson:OkImgJson}
            );
            if(res.status===200) {
                dispatch({
                    type: COMPLETE_TASK_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: COMPLETE_TASK_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}

/**
 * API 6.9
 * http://pjbapi.wtvxin.com/api/Task/CancelTask
 * @param UserId
 * @param Token
 * @param TaskAcceptNo
 * @param TaskCancelReasons
 * @returns {Function}
 */

export const cancelTask = (UserId, Token,TaskAcceptNo,TaskCancelReasons)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: CANCEL_TASK_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/CancelTask',
                {UserId: UserId, Token: Token,TaskAcceptNo: TaskAcceptNo,TaskCancelReasons:TaskCancelReasons}
            );
            if(res.status===200) {
                dispatch({
                    type: CANCEL_TASK_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: CANCEL_TASK_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}

/**
 * API 7.0
 * http://pjbapi.wtvxin.com/api/Task/GetApplyStatementType
 * @returns {Function}
 */
export const getApplyStatementType = ()=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_APPLY_STATEMENT_TYPE_LOADING}); //for Spinner;
            let res = await requestGET_API('Task/GetApplyStatementType');
            if(res.status===200) {
                dispatch({
                    type: GET_APPLY_STATEMENT_TYPE_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: GET_APPLY_STATEMENT_TYPE_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}


/**
 * API 7.1
 * http://pjbapi.wtvxin.com/api/Task/InitiateAppeal
 * @param UserId
 * @param Token
 * @param TaskAcceptNo
 * @param AppealTypeId
 * @param AppealMsg
 * @param QuestionImgF
 * @param QuestionImgS
 * @param QuestionImgT
 * @returns {Function}
 */
export const initiateAppeal = (UserId, Token,TaskAcceptNo,AppealTypeId,AppealMsg,QuestionImgF,QuestionImgS,QuestionImgT)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: INITIATE_APPEAL_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/InitiateAppeal',
                {UserId: UserId, Token: Token,TaskAcceptNo: TaskAcceptNo,AppealTypeId:AppealTypeId,AppealMsg:AppealMsg,QuestionImgF:QuestionImgF,QuestionImgS:QuestionImgS,QuestionImgT:QuestionImgT}
            );
            if(res.status===200) {
                dispatch({
                    type: INITIATE_APPEAL_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: INITIATE_APPEAL_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}

/**
 * API 7.2
 * http://pjbapi.wtvxin.com/api/Task/GetMemberTaskList
 * @param UserId
 * @param Token
 * @param Page
 * @param PageSize
 * @param MemberAcceptTaskStatus
 * @param TaskType
 * @returns {Function}
 */
export const getMemberTaskList = (UserId, Token,Page,PageSize,MemberAcceptTaskStatus,TaskType)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_MEMBER_TASK_LIST_LOADING}); //for Spinner;
            let res = await requestPOST_API('Task/GetMemberTaskList',
                {UserId: UserId, Token: Token,Page: Page,PageSize:PageSize,MemberAcceptTaskStatus:MemberAcceptTaskStatus,TaskType:TaskType}
            );
            if(res.status===200) {
                dispatch({
                    type: GET_MEMBER_TASK_LIST_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: GET_MEMBER_TASK_LIST_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}

/**
 * API 7.3
 * http://pjbapi.wtvxin.com/api/Appeal/GetAppealListPage
 * @param UserId
 * @param Token
 * @param Page
 * @param PageSize
 * @param Complainant
 * @returns {Function}
 */
export const getAppealListPage = (UserId, Token,Page,PageSize,Complainant)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_APPEAL_LIST_PAGE_LOADING}); //for Spinner;
            let res = await requestPOST_API('Appeal/GetAppealListPage',
                {UserId: UserId, Token: Token,Page: Page,PageSize:PageSize,Complainant:Complainant}
            );
            if(res.status===200) {
                dispatch({
                    type: GET_APPEAL_LIST_PAGE_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: GET_APPEAL_LIST_PAGE_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}


/**
 * API 7.4
 * http://pjbapi.wtvxin.com/api/Appeal/GetAppealInfo
 * @param UserId
 * @param Token
 * @param AppealId
 * @returns {Function}
 */
export const getAppealInfo = (UserId, Token,AppealId)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: GET_APPEAL_INFO_LOADING}); //for Spinner;
            let res = await requestPOST_API('Appeal/GetAppealInfo',
                {UserId: UserId, Token: Token,AppealId: AppealId}
            );
            if(res.status===200) {
                dispatch({
                    type: GET_APPEAL_INFO_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: GET_APPEAL_INFO_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}



/**
 * API 7.5
 * http://pjbapi.wtvxin.com/api/Appeal/InitiatePlatformInvolvement
 * @param UserId
 * @param Token
 * @param AppealId
 * @returns {Function}
 */
export const initiatePlateformInvolvement = (UserId, Token,AppealId)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: INITIATE_PLATEFORM_INVOLVEMENT_LOADING}); //for Spinner;
            let res = await requestPOST_API('Appeal/InitiatePlatformInvolvement',
                {UserId: UserId, Token: Token,AppealId: AppealId}
            );
            if(res.status===200) {
                dispatch({
                    type: INITIATE_PLATEFORM_INVOLVEMENT_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: INITIATE_PLATEFORM_INVOLVEMENT_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}


/**
 * API 7.6
 * http://pjbapi.wtvxin.com/api/Withdraw/LoadingWithdrawPage
 * @param UserId
 * @param Token
 * @returns {Function}
 */
export const loadingWithdrawPage = (UserId, Token)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: LOADING_WITHDRAW_PAGE_LOADING}); //for Spinner;
            let res = await requestPOST_API('Withdraw/LoadingWithdrawPage',
                {UserId: UserId, Token: Token}
            );
            if(res.status===200) {
                dispatch({
                    type: LOADING_WITHDRAW_PAGE_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: LOADING_WITHDRAW_PAGE_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}


/**
 * API 7.7
 * http://pjbapi.wtvxin.com/api/Withdraw/CommCommissionWithdrawal
 * @param UserId
 * @param Token
 * @param WithdrawalAmount
 * @param LoginPassWord
 * @returns {Function}
 */
export const commCommissionWithdrawal = (UserId, Token,WithdrawalAmount,LoginPassWord)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: COMM_COMMISSION_WITHDRAWAL_LOADING}); //for Spinner;
            let res = await requestPOST_API('Withdraw/CommCommissionWithdrawal',
                {UserId: UserId, Token: Token,WithdrawalAmount:WithdrawalAmount,LoginPassWord:LoginPassWord}
            );
            if(res.status===200) {
                dispatch({
                    type: COMM_COMMISSION_WITHDRAWAL_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: COMM_COMMISSION_WITHDRAWAL_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}

/**
 * API 7.8
 * http://pjbapi.wtvxin.com/api/Withdraw/PrincipalWithdrawal
 * @param UserId
 * @param Token
 * @param WithdrawalAmount
 * @param LoginPassWord
 * @returns {Function}
 */
export const principalWithdrawal = (UserId, Token,WithdrawalAmount,LoginPassWord)=> {
    return (dispatch) => {
        (async () => {
            dispatch({type: PRINCIPAL_WITHDRAWL_LOADING}); //for Spinner;
            let res = await requestPOST_API('Withdraw/PrincipalWithdrawal',
                {UserId: UserId, Token: Token, WithdrawalAmount: WithdrawalAmount, LoginPassWord: LoginPassWord}
            );
            if (res.status === 200) {
                dispatch({
                    type: PRINCIPAL_WITHDRAWL_SUCCESS,
                    payload: {value: res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: PRINCIPAL_WITHDRAWL_FAILURE,
                    payload: {value: null, msg: res.msg, errCode: res.status}
                });
            }
        })();
    }
};



/**
 * API 8.8
 * http://pjbapi.wtvxin.com/api/Integral/SubmitConfirm
 * @param UserId
 * @param Token
 * @param ActivitiesId
 * @param WinningLogId
 * @param ConsigneeName
 * @param ConsigneeMobile
 * @param AddressInfo
 * @returns {Function}
 */
export const submitConfirm = (UserId, Token,ActivitiesId,WinningLogId,ConsigneeName,ConsigneeMobile,AddressInfo)=>{
    return (dispatch) =>{
        (async ()=> {
            dispatch({type: SUBMIT_CONFIRM_LOADING}); //for Spinner;
            let res = await requestPOST_API('Integral/SubmitConfirm',
                {UserId: UserId, Token: Token,ActivitiesId:ActivitiesId,WinningLogId:WinningLogId,ConsigneeName:ConsigneeName,ConsigneeMobile:ConsigneeMobile,AddressInfo:AddressInfo}
            );
            if(res.status===200) {
                dispatch({
                    type: SUBMIT_CONFIRM_SUCCESS,
                    payload: {value:res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: SUBMIT_CONFIRM_FAILURE,
                    payload: {value:null, msg: res.msg,errCode: res.status}
                });
            }
        })();
    };
}
