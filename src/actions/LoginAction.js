import {Actions} from 'react-native-router-flux';
import axios from 'axios';
import {AsyncStorage} from 'react-native'

import {
    LOGIN_PARAMETER_UPDATED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER,
    LOGIN_USER_ATTEMPTING,LOAD_FROM_STORAGE,
    INITIALIZE_LOGIN_STATUS,
    HOME_LOADING,
    GET_HOME_BANNERS,
    GET_COMMISSION_LIST,
    GET_WALLET_LIST,
    GET_INTEGRAL_GRADES,
    GET_ID_CARD_INFO,
    GET_PROVINCE_LISTS,
    GET_CITY_LISTS,
    GET_DISTRICT_LISTS,
    GET_WITHRAWAL_OBJECT_SUCCESS,
    GET_WITHRAWAL_OBJECT_FAILURE,
    GET_WITHRAWAL_OBJECT_LOADING,
    INITIALIZE_WITHDRAWAL_DATA,
    SET_WALLET_TYPE,
    INITIALIZE_WITHDRAWAL_MESSAGE,
    GET_WITHRAWAL_LOGS_SUCCESS,
    GET_WITHRAWAL_LOGS_FAILURE,
    GET_WITHRAWAL_LOGS_LOADING,
    GET_POINT_LIST_SUCCESS,
    GET_POINT_LIST_FAILURE,
    GET_POINT_LIST_LOADING,
    SUBMIT_RESET_LOGIN_PASSWORD_SUCCESS, SUBMIT_RESET_LOGIN_PASSWORD_FAILURE, SUBMIT_RESET_LOGIN_PASSWORD_LOADING,
    GET_VIP_LISTS_SUCCESS, GET_VIP_LISTS_FAILURE,

} from "./types";

import {getMemberInfo, requestPOST_API,requestGET_API} from "../Services";

export const loginParameterUpdated = ({ prop, value }) => {
    return {
        type: LOGIN_PARAMETER_UPDATED,
        payload: {prop, value}
    }
};

export const loginUser = ({phone, password}) => {
    return (dispatch) => {
        dispatch ({type: LOGIN_USER_ATTEMPTING});//For Spinner

        let instance = axios.create({
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
        });
        instance.post('http://pjbapi.wtvxin.com/api/Login/LoginByMobile',
            `Mobile=${phone}&PassWord=${password}`
        )
            .then(user =>{
                if(user.data.errcode ===0) {
                    loginUserSuccess(dispatch, user.data.obj, user.data.msg);

                } else {
                    loginUserFail(dispatch, user.data.msg);
                }
            })
            .catch(() =>  loginUserFail(dispatch, 'Failed'));
    };
};

export const submitResetLoginPassword = (Mobile, NewLoginPwd) => {
    return (dispatch) => {
        dispatch ({type: SUBMIT_RESET_LOGIN_PASSWORD_LOADING});//For Spinner

        (async ()=>{
            let res = await requestPOST_API('Member/SubmitResetLoginPwd',
                {Mobile: Mobile, NewLoginPwd: NewLoginPwd}
            );
            if(res.status===200) {
                dispatch({
                    type: SUBMIT_RESET_LOGIN_PASSWORD_SUCCESS,
                    payload: {value: res.data, msg: res.msg}
                });
            }
            else {
                dispatch({
                    type: SUBMIT_RESET_LOGIN_PASSWORD_FAILURE,
                    payload: {value: null, msg: res.msg, errCode: res.status}
                });
            }
        })();
    };
};


const loginUserFail = (dispatch, msg)=>{
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: msg
    })
};

const loginUserSuccess = async (dispatch, user, msg) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: {user: user, msg: msg}
    });
};

export const loadFromStorage = (phone, password)=>{
    return (
        {
            type: LOAD_FROM_STORAGE,
            payload: {phone: phone, pass: password}
        }
    )
}


export const homeLoading = (UserId, Token, user)=> {
    return (dispatch) =>{
        (async ()=>{
            let memberInfo = await getMemberInfo(UserId, Token);
            if(memberInfo.status===200) {
                dispatch({
                    type: HOME_LOADING,
                    payload: {...memberInfo.data, ...user}
                });
            }
        })();
    }
};

export const commissionList = (user, UserId, Token, WalletType=0,Page=1, IsNewMonth=0, Type=0, PageSize=20)=> {
    return (dispatch) =>{
        (async ()=>{
            let res = await requestPOST_API('Money/GetWalletLogList',
                {UserId:UserId, Token:Token, Page:Page, WalletType: WalletType,IsNewMonth:IsNewMonth, Type:Type, PageSize:PageSize}
            );
            if(res.status===200) {
                dispatch({
                    type: GET_COMMISSION_LIST,
                    payload: {commissions: res.data, ...user}
                });
            }
        })();
    }
};

export const walletList = (user, UserId, Token, WalletType=1,Page=1, IsNewMonth=0, Type=0, PageSize=20)=> {
    return (dispatch) =>{
        (async ()=>{
            let res = await requestPOST_API('Money/GetWalletLogList',
                {UserId:UserId, Token:Token, Page:Page, WalletType: WalletType,IsNewMonth:IsNewMonth, Type:Type, PageSize:PageSize}
            );
            if(res.status===200) {
                dispatch({
                    type: GET_WALLET_LIST,
                    payload: {wallets: res.data, ...user}
                });
            }
        })();
    }
};

export const getPointList = (user, UserId, Token, WalletType=2,Page=1, IsNewMonth=0, Type=0, PageSize=20)=> {
    return (dispatch) =>{
        dispatch({type: GET_POINT_LIST_LOADING});
        (async ()=>{
            let res = await requestPOST_API('Money/GetWalletLogList',
                {UserId:UserId, Token:Token, Page:Page, WalletType: WalletType,IsNewMonth:IsNewMonth, Type:Type, PageSize:PageSize}
            );
            if(res.status===200) {
                dispatch({
                    type: GET_POINT_LIST_SUCCESS,
                    payload: {pointsObj: res.data, pointsMsg: res.msg, ...user}
                });
            }
            else {
                dispatch({
                    type: GET_POINT_LIST_FAILURE,
                    payload: {pointsObj: null, pointsMsg: res.msg, ...user}
                });

            }
        })();
    }
};

export const get_idcardInfo = (UserId, Token) => {
    return (dispatch) => {
        (async ()=>{
            let res = await requestPOST_API('/Member/GetUserBindIdCardInfo',
                { UserId: UserId, Token: Token }
            );

            if(res.status===200)
                dispatch({
                    type: GET_ID_CARD_INFO,
                    payload: res.data
                });
        })();
    };
};

export const logout = ()=>{
    return (dispatch) => {
        dispatch({type: LOGOUT_USER});//For Spinner

        Actions.auth();
    }
};


export const getAreaLists = (areaSymbol, areaCode='110000') => {
    let area = 'area';
    if(areaSymbol==='Province'){
        area = 'Province';
    }
    let listType;
    switch (areaSymbol) {
        case 'Province':
            listType = GET_PROVINCE_LISTS;
            break;
        case 'City':
            listType = GET_CITY_LISTS;
            break;
        case 'District':
            listType = GET_DISTRICT_LISTS;
    }


    return (dispatch) => {
        (async ()=>{
            let res = await requestPOST_API('/Area/GetAreaList',
                { AreaType: area, AreaCode: areaCode }
            );

            if(res.status===200)
                dispatch({
                    type: listType,
                    payload: res.data
                });
        })();
    };
};

export const getHomeBanners = () => {
    return (dispatch) => {
        (async ()=>{
            let res = await requestGET_API('/Advertisement/GetHomeBanners');

            if(res.status===200) {

                let banners = res.data.map(banner=>{
                    return banner.Pic;
                });
                dispatch({
                    type: GET_HOME_BANNERS,
                    payload: banners
                });
            }
        })();
    };
};

export const getIntegralGrades = () => {
    return (dispatch) => {
        (async ()=>{
            let res = await requestGET_API('/Member/GetMemberGrade');

            if(res.status===200) {

                let grades = res.data.map(grade=>{
                    return {key: grade.GradeName, content: grade.Content, MinScore: grade.MinScore, MaxScore: grade.MaxScore};
                });

                dispatch({
                    type: GET_INTEGRAL_GRADES,
                    payload: grades
                });
            }
        })();
    };
};


export const getWithdrawalData = (UserId, Token)=> {
    return (dispatch) => {
        dispatch({type: GET_WITHRAWAL_OBJECT_LOADING});

        (async ()=>{
            let res = await requestPOST_API('Withdraw/LoadingWithdrawPage',
                {UserId: UserId, Token: Token}
            );

            if(res.status===200) {
                dispatch({
                    type: GET_WITHRAWAL_OBJECT_SUCCESS,
                    payload: {msg: res.msg, value: res.data}
                });
            } else {
                dispatch({
                    type: GET_WITHRAWAL_OBJECT_FAILURE,
                    payload: {msg: res.msg}
                })
            }
        })();
    };
};
export const initializeWithdrawalData = (bOnlyMessage=false) => {
    if(bOnlyMessage)
        return {
            type: INITIALIZE_WITHDRAWAL_MESSAGE
        };
    else {
        return {
            type: INITIALIZE_WITHDRAWAL_DATA
        }
    }
};

export const setWalletType = (walletType)=> {
    return {
        type: SET_WALLET_TYPE,
        payload: walletType
    }
};

export const getWithdrawalLogs = (UserId, Token, WalletType=0, Page=1, PageSize=10) => {

    return (dispatch) => {
        dispatch({type: GET_WITHRAWAL_LOGS_LOADING});

        (async ()=>{
            let res = await requestPOST_API('Withdraw/GetWithdrawLogPage', //API 7.9
                {UserId: UserId, Token: Token, Page: Page, PageSize: PageSize, WalletType: WalletType});
            if(res.status===200) {
                dispatch({
                    type: GET_WITHRAWAL_LOGS_SUCCESS,
                    payload: {value: res.data, msg: res.msg}
                });
            }
            else {
                dispatch({
                    type: GET_WITHRAWAL_LOGS_FAILURE,
                    payload: {value: null, msg: res.msg}
                });
            }
        })();
    };
};

export const initializeLoginStatus = () => {
    return {
        type: INITIALIZE_LOGIN_STATUS
    };
};


/**
 * API 4.2,  http://pjbapi.wtvxin.com/api/Money/GetVIPList
 * @returns {Function}
 */
export const getVIPLists = () => {
    return (dispatch) => {
        (async ()=>{
            let res = await requestGET_API('Money/GetVIPList');

            if(res.status===200) {
                dispatch({
                    type: GET_VIP_LISTS_SUCCESS,
                    payload: {value: res.data, msg: res.msg}
                });
            } else {
                dispatch({
                    type: GET_VIP_LISTS_FAILURE,
                    payload: {value: null, msg: res.msg}
                });

            }
        })();
    };
};
