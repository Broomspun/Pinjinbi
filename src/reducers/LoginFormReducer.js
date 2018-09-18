import {
    LOGIN_PARAMETER_UPDATED, LOGIN_USER_SUCCESS, LOGIN_USER_ATTEMPTING, LOGIN_USER_FAIL, LOGOUT_USER,
    HOME_LOADING, GET_HOME_BANNERS,
    GET_COMMISSION_LIST,
    GET_WALLET_LIST,
    GET_BIND_INFO,GET_BIND_INFO_LOADING,
    GET_ID_CARD_INFO,
    GET_PROVINCE_LISTS,
    GET_CITY_LISTS,
    GET_DISTRICT_LISTS,
    GET_INTEGRAL_GRADES,
    AVATAR_SUBMIT,
    AVATAR_CHANGED,
    AVATAR_SUCCESS,
    GET_WITHRAWAL_OBJECT_SUCCESS, GET_WITHRAWAL_OBJECT_FAILURE, GET_WITHRAWAL_OBJECT_LOADING, INITIALIZE_WITHDRAWAL_DATA, SET_WALLET_TYPE, INITIALIZE_WITHDRAWAL_MESSAGE,
    GET_WITHRAWAL_LOGS_SUCCESS, GET_WITHRAWAL_LOGS_FAILURE, GET_WITHRAWAL_LOGS_LOADING,
} from './../actions/types';

const INITIAL_STATE = {
    // phone: '',
    phone: '18641568923',
    // phone: '18704153342',
    password: 'password123',
    // password: '',
    // password: '123456',
    remember: true,
    loading: false,
    error: '',
    user: null,
    bindInfo: null,
    bBindInfoLoading: false,
    provinces: null, cities: null, districts: null,
    homeBanners: null,
    grades: null,
    userAvatar: null,
    withdrawalObj: null, withdrawalMsg: '', bWithdrawalLoading: false, walletType: 1,
    withdrawalLogsObj: null,withdrawalLogsMsg:'', bWithdrawalLogs: false,
};
let remember_status = INITIAL_STATE.remember;

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
            if(action.payload.prop==='remember') {
                remember_status = !remember_status;
                return {...state, [action.payload.prop]: remember_status};
            }
            // action.payload === {prop: 'name', value: 'jane' }
            return {...state, [action.payload.prop]: action.payload.value};
        case LOGIN_USER_ATTEMPTING:
            return {...state, loading: true, error: ''};
        case LOGIN_USER_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload.user, msg: action.payload.msg };
        case LOGIN_USER_FAIL:
            return {...state, error: action.payload, loading: false, user: null};
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
        case LOGOUT_USER:
            return {...INITIAL_STATE};
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


        default:
            return state;
    }
}

//    withdrawalWalletLogsObj: null,withdrawalWalletLogsMsg:'', bWithdrawalWalletLogs: false,
//     withdrawalCommissionLogsObj: null,withdrawalCommissionMsg:'', bWithdrawalCommissionLogs: false
