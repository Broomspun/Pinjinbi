import {
    GET_SYSTEM_MESSAGES_SUCCESS, GET_SYSTEM_MESSAGES_LOADING, GET_SYSTEM_MESSAGES_FAIL,
    GET_SYSTEM_MESSAGE_DETAIL_SUCCESS, GET_SYSTEM_MESSAGE_DETAIL_LOADING, GET_SYSTEM_MESSAGE_DETAIL_FAIL,
    GET_ANNOUNCE_MESSAGES_SUCCESS, GET_ANNOUNCE_MESSAGES_LOADING, GET_ANNOUNCE_MESSAGES_FAIL,
    GET_HELP_LISTS_SUCCESS,GET_HELP_LISTS_FAIL, GET_HELP_LISTS_LOADING,
    GET_HELP_DETAIL_SUCCESS, GET_HELP_DETAIL_FAIL, GET_HELP_DETAIL_LOADING,
} from './../actions/types';


const INITIAL_STATE ={
    systemMessages: null,
    bSystemMessageLoading: false,
    system_error_msg: '',

    systemMessageDetail: null,
    bSystemMessageDetailLoading: false,
    system_detail_error_msg: '',

    announceMessages: null,
    bAnnounceMessageLoading: false,
    announce_error_msg: '',

    helpLists: null,
    bHelpListsLoading: false,
    help_error_msg: false,
    qqConsult: '',

    helpDetail: null,
    bHelpDetailLoading: false,
    help_detail_error_msg: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_SYSTEM_MESSAGES_SUCCESS:
            return {...state, systemMessages: action.payload, bSystemMessageLoading: false,system_error_msg: ''};
        case GET_SYSTEM_MESSAGES_LOADING:
            return {...state, bSystemMessageLoading: true};
        case GET_SYSTEM_MESSAGES_FAIL:
            return {...state, systemMessages: null, bSystemMessageLoading: false, system_error_msg: action.payload};

        case GET_SYSTEM_MESSAGE_DETAIL_SUCCESS:
            return {...state, systemMessageDetail: action.payload, bSystemMessageDetailLoading: false,system_detail_error_msg: ''};
        case GET_SYSTEM_MESSAGE_DETAIL_LOADING:
            return {...state, bSystemMessageDetailLoading: true};
        case GET_SYSTEM_MESSAGE_DETAIL_FAIL:
            return {...state, systemMessageDetail: null, bSystemMessageDetailLoading: false, system_detail_error_msg: action.payload};

        case GET_ANNOUNCE_MESSAGES_SUCCESS:
            return {...state, announceMessages: action.payload, bAnnounceMessageLoading: false,announce_error_msg: ''};
        case GET_ANNOUNCE_MESSAGES_LOADING:
            return {...state, bAnnounceMessageLoading: true};
        case GET_ANNOUNCE_MESSAGES_FAIL:
            return {...state, announceMessages: null, bAnnounceMessageLoading: false, announce_error_msg: action.payload};

        case GET_HELP_LISTS_SUCCESS:
            return {...state, helpLists: action.payload.helplists, qqConsult: action.payload.qqConsult, bHelpListsLoading: false,help_error_msg: ''};
        case GET_HELP_LISTS_LOADING:
            return {...state, bHelpListsLoading: true};
        case GET_HELP_LISTS_FAIL:
            return {...state, helpLists: null, bHelpListsLoading: false, help_error_msg: action.payload};

        case GET_HELP_DETAIL_SUCCESS:
            return {...state, helpDetail: action.payload, bHelpDetailLoading: false,help_detail_error_msg: ''};
        case GET_HELP_DETAIL_LOADING:
            return {...state, bHelpDetailLoading: true};
        case GET_HELP_DETAIL_FAIL:
            return {...state, helpDetail: null, bHelpDetailLoading: false, help_detail_error_msg: action.payload};

        default:
            return state;
    }
}
