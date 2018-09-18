import {
    SUBMIT_TABAO_ACCOUNT_SUCCESS, SUBMIT_TABAO_ACCOUNT_FAILURE, SUBMIT_TABAO_ACCOUNT_LOADING,
    GET_PLATFORM_INFO_SUCCESS, GET_PLATFORM_INFO_FAILURE, GET_PLATFORM_INFO_LOADING, LOGOUT_USER,
    GET_PLATFORM_LISTS_SUCCESS, GET_PLATFORM_LISTS_FAILURE, GET_PLATFORM_LISTS_LOADING
} from './../actions/types';

const INITIAL_STATE = {
    tabaoObj: null,
    tabaoMsg:'',
    tabaoLoading: false,
    platObj: null,
    platMsg: '',
    platLoading: false,
    platformLists: null,
    platformListsMsg: '',
    bPlatformListsLoading: false,
    bPlatformBindSubmittedStatus: null
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUBMIT_TABAO_ACCOUNT_SUCCESS:
            return {...state, tabaoObj: action.payload.value, tabaoLoading: false,bPlatformBindSubmittedStatus: true,tabaoMsg: action.payload.msg};
        case SUBMIT_TABAO_ACCOUNT_FAILURE:
            return {...state, tabaoObj: null, tabaoMsg: action.payload.msg, tabaoLoading: false, bPlatformBindSubmittedStatus: false};
        case SUBMIT_TABAO_ACCOUNT_LOADING:
            return {...state, tabaoLoading: true};

        case GET_PLATFORM_INFO_SUCCESS:
            return {...state, platObj: action.payload.value, platLoading: false};
        case GET_PLATFORM_INFO_FAILURE:
            return {...state, platObj: null, platMsg: action.payload.msg, platLoading: false};
        case GET_PLATFORM_INFO_LOADING:
            return {...state, platLoading: true};

        case GET_PLATFORM_LISTS_SUCCESS:
            return {...state, platformLists: action.payload.value, bPlatformListsLoading: false, };
        case GET_PLATFORM_LISTS_FAILURE:
            return {...state, platformLists: null, platformListsMsg: action.payload.msg, bPlatformListsLoading: false};
        case GET_PLATFORM_LISTS_LOADING:
            return {...state, bPlatformListsLoading: true};

        case LOGOUT_USER:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}
