import {
    LOGIN_PARAMETER_UPDATED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ATTEMPTING,
    LOGIN_USER_FAIL,
    HOME_LOADING,
    GET_COMMISSION_LIST,
    GET_WALLET_LIST
} from './../actions/types';

const INITIAL_STATE = {
    phone: '18641568923',
    // phone: '13612345678',
    password: 'password123',
    // password: '123456',
    remember: true,
    loading: false,
    error: '',
    user: null
};
let remember_status = INITIAL_STATE.remember;

export default (state = INITIAL_STATE, action) => {
    console.log(action);
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
        default:
            return state;
    }
}
