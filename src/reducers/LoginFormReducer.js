import {
    LOGIN_PARAMETER_UPDATED, LOGIN_USER_SUCCESS, LOGIN_USER_ATTEMPTING, LOGIN_USER_FAIL, LOGOUT_USER,
    HOME_LOADING,
    GET_HOME_BANNERS,
    GET_COMMISSION_LIST,
    GET_WALLET_LIST,
    GET_BIND_INFO,
    GET_BIND_INFO_LOADING,
    GET_ID_CARD_INFO,
    GET_PROVINCE_LISTS,
    GET_CITY_LISTS,
    GET_DISTRICT_LISTS,
    GET_INTEGRAL_GRADES,
    AVATAR_SUBMIT,
    AVATAR_CHANGED,
    AVATAR_SUCCESS,
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
    INITIALIZE_LOGIN_STATUS,
    GET_VIP_LISTS_SUCCESS, GET_VIP_LISTS_FAILURE, INITIALIZE_VIP_MESSAGE, LOAD_FROM_STORAGE,
    GET_USER_BANK_INFO_SUCCESS,
    GET_LOADSIGNINPAGE_SUCCESS,
    GET_LOADSIGNINPAGE_FAILURE,
    GET_LOADSIGNINPAGE_LOADING,
    GET_LOADSIGNINPAGE_RELOGIN,
    GET_LOADSIGNINPAGE_SIGNED,
    GET_LOADSIGNINPAGE_SYSTEMERROR,

    SIGN_IN_GET_POINTS_SUCCESS,
    SIGN_IN_GET_POINTS_FAILURE,
    SIGN_IN_GET_POINTS_LOADING,
    SIGN_IN_GET_POINTS_SYSTEMERROR,
    SIGN_IN_GET_POINTS_RELOGIN,
    SIGN_IN_GET_POINTS_INITIAL,
    SIGN_IN_GET_POINTS_SIGNED,
    FIRE_LOGIN_FORM,
} from './../actions/types';
import {UNFIRE_LOGIN_FORM} from "../actions/types";

const INITIAL_STATE = {
    phone: '',
    // phone: '18641568923',
    // phone: '18704153342',
    // password: 'password123',
    password: '',

    loading: false,
    error: '',
    bType: false,
    user: null,
    loginMessage: '',
    bLoginSuccess: null,
    bindInfo: null,
    bBindInfoLoading: false,
    provinces: null, cities: null, districts: null,
    homeBanners: null,
    grades: null,
    userAvatar: null,
    withdrawalObj: null, withdrawalMsg: '', bWithdrawalLoading: false, walletType: 1,
    withdrawalLogsObj: null,withdrawalLogsMsg:'', bWithdrawalLogs: false,
    pointsObj: null,
    pointsMsg: '',
    bPointsLoading: false,
    bPointsSuccessed: false,
    vipListsObj: null,
    vipListsMsg: '',
    bVipListsStatus: null,
    bVipListsLoading: false,
    bankInfo: null,
    logObj: null,
    logObjMsg: '',
    signPoints: null,
    signPointsMsg: '',
    fired_login_form: false,
};

const convertAreas =(areas) => {
    return areas.map(area=>{
        return {label: area.Name, value: area.Code}
    })
};


export default (state = INITIAL_STATE, action) => {
    console.log(action);

    let areas;

    if(action.type===GET_PROVINCE_LISTS  || action.type===GET_CITY_LISTS || action.type===GET_DISTRICT_LISTS)
        areas = convertAreas(action.payload);

    switch (action.type) {
        case LOGIN_PARAMETER_UPDATED:
            return {...state, [action.payload.prop]: action.payload.value, bType: true};
        case LOGIN_USER_ATTEMPTING:
            return {...state, loading: true, error: ''};
        case LOGIN_USER_SUCCESS:
            return {...state, user: action.payload.user,bLoginSuccess: true, loginMessage: action.payload.msg };
        case LOGIN_USER_FAIL:
            return {...state, error: action.payload, loading: false, user: null, bLoginSuccess: false};
        case INITIALIZE_LOGIN_STATUS:
            return {...state, bLoginSuccess: null, loading: false};
        case LOAD_FROM_STORAGE:
            return {...state, phone: action.payload.phone, password: action.payload.pass};
        case LOGOUT_USER:
            return {...INITIAL_STATE};


        case HOME_LOADING:
            return {...state, user: action.payload};
        case GET_COMMISSION_LIST:
            return {...state, user:{ ...action.payload}};
        case GET_WALLET_LIST:
            return {...state, user:{ ...action.payload}};
        case GET_BIND_INFO:
            return {...state, bindInfo: action.payload, user:{...state.user, bindInfo: action.payload}, bBindInfoLoading: false};
        case GET_BIND_INFO_LOADING:
            return {...state, bBindInfoLoading: true};
        case GET_ID_CARD_INFO:
            return {...state, bindInfo: action.payload, user:{...state.user, id_card: action.payload}};

        case GET_PROVINCE_LISTS:
            return {...state, provinces: areas, cities: null, districts: null};
        case GET_CITY_LISTS:
            return {...state, cities: areas, districts: null};
        case GET_DISTRICT_LISTS:
            return {...state, districts : areas};
        case GET_HOME_BANNERS:
            return {...state, homeBanners : action.payload};
        case GET_INTEGRAL_GRADES:
            return {...state, grades : action.payload};
        case AVATAR_SUBMIT:
            return {...state, submitting: true};
        case AVATAR_CHANGED:
            return {...state, userAvatar: action.payload};
        case AVATAR_SUCCESS:
            return {...state, submitting: false, user:{...state.user, Avatar:  action.payload.replace('http://pjb.wtvxin.com','')}, userAvatar: action.payload};
        case GET_WITHRAWAL_OBJECT_SUCCESS:
            return {...state, withdrawalObj: action.payload.value, bWithdrawalLoading: false};
        case GET_WITHRAWAL_OBJECT_FAILURE:
            return {...state,withdrawalObj: null, withdrawalMsg: action.payload.msg, bWithdrawalLoading: false};
        case GET_WITHRAWAL_OBJECT_LOADING:
            return {...state,bWithdrawalLoading: true};
        case INITIALIZE_WITHDRAWAL_DATA:
            return {...state,bWithdrawalLoading: false, withdrawalMsg: '',withdrawalObj: null };
        case INITIALIZE_WITHDRAWAL_MESSAGE:
            return {...state,bWithdrawalLoading: false, withdrawalMsg: ''};
        case SET_WALLET_TYPE:
            return {...state, walletType: action.payload};

        case GET_WITHRAWAL_LOGS_SUCCESS:
            return {...state, withdrawalLogsObj: action.payload.value, bWithdrawalLogs: false};
        case GET_WITHRAWAL_LOGS_FAILURE:
            return {...state,withdrawalLogsObj: null, withdrawalLogsMsg: action.payload.msg, bWithdrawalLogs: false};
        case GET_WITHRAWAL_LOGS_LOADING:
            return {...state, bWithdrawalLogs: true};

        case GET_POINT_LIST_SUCCESS:
            return {...state, pointsObj: action.payload.value, bWithdrawalLogs: false};
        case GET_POINT_LIST_FAILURE:
            return {...state,withdrawalLogsObj: null, withdrawalLogsMsg: action.payload.msg, bWithdrawalLogs: false};
        case GET_POINT_LIST_LOADING:
            return {...state, bWithdrawalLogs: true};

        case GET_VIP_LISTS_SUCCESS:
            return {...state, vipListsObj: action.payload.value, bVipListsLoading: false, bVipListsStatus: true};
        case GET_VIP_LISTS_FAILURE:
            return {...state,vipListsObj: null, vipListsMsg: action.payload.msg, bVipListsLoading: false, bVipListsStatus: false};
        case INITIALIZE_VIP_MESSAGE:
            return {...state, bVipListsStatus: null};

        case GET_USER_BANK_INFO_SUCCESS:
            return {...state, user: {...state.user, bankInfo: action.payload.value}};

        case SIGN_IN_GET_POINTS_SUCCESS:
            return {...state, signPoints:action.payload.value};
        case SIGN_IN_GET_POINTS_FAILURE:
            return {...state,signPoints:null,signPointsMsg: action.payload.msg};
        case SIGN_IN_GET_POINTS_LOADING:
            return {...state,signPoints:action.payload};
        case SIGN_IN_GET_POINTS_RELOGIN:
            return {...state,signPoints:action.payload};
        case SIGN_IN_GET_POINTS_SYSTEMERROR:
            return {...state, signPoints:action.payload};
        case SIGN_IN_GET_POINTS_SIGNED:
            return {...state, signPoints:action.payload};

        case GET_LOADSIGNINPAGE_SUCCESS:
            return {...state, logObj: action.payload.value};
        case GET_LOADSIGNINPAGE_FAILURE:
            return {...state,logObj: null, logObjMsg: action.payload.msg};
        case GET_LOADSIGNINPAGE_LOADING:
            return {...state,logObj: action.payload};
        case GET_LOADSIGNINPAGE_RELOGIN:
            return {...state,logObj: action.payload};
        case GET_LOADSIGNINPAGE_SIGNED:
            return {...state,logObj: action.payload};
        case GET_LOADSIGNINPAGE_SYSTEMERROR:
            return {...state,logObj: action.payload};
        case FIRE_LOGIN_FORM:
            return {...state, fired_login_form: true};
        case UNFIRE_LOGIN_FORM:
            return {...state, fired_login_form: false};

        default:
            return state;
    }
}

