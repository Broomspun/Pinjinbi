import {
    SUBMIT_TABAO_ACCOUNT_SUCCESS, SUBMIT_TABAO_ACCOUNT_FAILURE, SUBMIT_TABAO_ACCOUNT_LOADING,
    GET_PLATFORM_INFO_SUCCESS, GET_PLATFORM_INFO_FAILURE, GET_PLATFORM_INFO_LOADING, LOGOUT_USER,
    GET_PLATFORM_LISTS_SUCCESS, GET_PLATFORM_LISTS_FAILURE, GET_PLATFORM_LISTS_LOADING,
    GET_SHOPPING_CATEGORIES_SUCCESS, GET_SHOPPING_CATEGORIES_FAILURE, GET_SHOPPING_CATEGORIES_LOADING,INITIALIZE_TABAO_SUBMIT_STATUS

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
    bPlatformBindSubmittedStatus: null,
    shopCategoryObj: null,
    shopCategoryMsg: '',
    bShopCategoryLoading: false,

};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SUBMIT_TABAO_ACCOUNT_SUCCESS:
            return {...state, tabaoObj: action.payload.value, tabaoLoading: false,bPlatformBindSubmittedStatus: true,tabaoMsg: action.payload.msg};
        case SUBMIT_TABAO_ACCOUNT_FAILURE:
            return {...state, tabaoObj: null, tabaoMsg: action.payload.msg, tabaoLoading: false, bPlatformBindSubmittedStatus: false};
        case SUBMIT_TABAO_ACCOUNT_LOADING:
            return {...state, tabaoLoading: true};
        case INITIALIZE_TABAO_SUBMIT_STATUS:
            return {...state, bPlatformBindSubmittedStatus: null};

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


        case GET_SHOPPING_CATEGORIES_SUCCESS:
            return {...state, shopCategoryObj: action.payload.value, bShopCategoryLoading: false, };
        case GET_SHOPPING_CATEGORIES_FAILURE:
            return {...state, shopCategoryObj: null, shopCategoryMsg: action.payload.msg, bShopCategoryLoading: false};
        case GET_SHOPPING_CATEGORIES_LOADING:
            return {...state, bShopCategoryLoading: true};


        case LOGOUT_USER:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}
