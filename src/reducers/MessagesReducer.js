import {
    GET_SYSTEM_MESSAGES_SUCCESS, GET_SYSTEM_MESSAGES_LOADING, GET_SYSTEM_MESSAGES_FAIL,
    GET_ANNOUNCE_MESSAGES_SUCCESS, GET_ANNOUNCE_MESSAGES_LOADING, GET_ANNOUNCE_MESSAGES_FAIL,
} from './../actions/types';


const INITIAL_STATE ={
    systemMessages: null,
    bSystemMessageLoading: false,
    system_error_msg: '',
    announceMessages: null,
    bAnnounceMessageLoading: false,
    announce_error_msg: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_SYSTEM_MESSAGES_SUCCESS:
            return {...state, systemMessages: action.payload, bSystemMessageLoading: false,system_error_msg: ''};
        case GET_SYSTEM_MESSAGES_LOADING:
            return {...state, bSystemMessageLoading: true};
        case GET_SYSTEM_MESSAGES_FAIL:
            return {...state, systemMessages: null, bSystemMessageLoading: false, system_error_msg: action.payload};
        case GET_ANNOUNCE_MESSAGES_SUCCESS:
            return {...state, announceMessages: action.payload, bAnnounceMessageLoading: false,announce_error_msg: ''};
        case GET_ANNOUNCE_MESSAGES_LOADING:
            return {...state, bAnnounceMessageLoading: true};
        case GET_ANNOUNCE_MESSAGES_FAIL:
            return {...state, announceMessages: null, bAnnounceMessageLoading: false, announce_error_msg: action.payload};

        default:
            return state;
    }
}
