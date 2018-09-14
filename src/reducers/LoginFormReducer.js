import {
    LOGIN_PARAMETER_UPDATED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ATTEMPTING,
    LOGIN_USER_FAIL,
    LOGOUT_USER,
    HOME_LOADING,
    GET_COMMISSION_LIST,
    GET_WALLET_LIST,
    GET_BIND_INFO,
    GET_ID_CARD_INFO,
    GET_PROVINCE_LISTS, GET_CITY_LISTS, GET_DISTRICT_LISTS, GET_HOME_BANNERS,
} from './../actions/types';

const INITIAL_STATE = {
    // phone: '18641568923',
    phone: '18704153342',
    password: 'password123',
    // password: '123456',
    remember: true,
    loading: false,
    error: '',
    user: null,
    bindInfo: null,
    provinces: null, cities: null, districts: null,
    homeBanners: null
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
            return {...state, bindInfo: action.payload, user:{...state.user, bindInfo: action.payload}};
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
        default:
            return state;
    }
}
