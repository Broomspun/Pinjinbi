import {
    ID_CARD_SUBMIT_SUCCESS,ID_CARD_SUBMIT_FAILURE, INITIALIZE_ID_CARD_MESSAGE,
    BANK_INFO_SUBMIT_SUCCESS,
    QQ_SUBMIT_SUCCESS, QQ_SUBMIT_FAILURE, INITIALIZE_QQ_MESSAGE,
    LOGOUT_USER
} from './../actions/types';

const INITIAL_STATE = {
    idObj: null,
    idMsg: '',
    bIdCardSubmitSuccess: null,
    idCardErrorCode: null,
    qq_res: null,
    bQqSubmitSuccess: null,
    qqMsg: '',
    qqErrorCode: null,
};


export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case QQ_SUBMIT_SUCCESS:
            return {...state, qq_res: action.payload.value, bQqSubmitSuccess: true, qqMsg: action.payload.msg};
        case QQ_SUBMIT_FAILURE:
            return {...state, qq_res: action.payload.value, bQqSubmitSuccess: false, qqMsg: action.payload.msg, qqErrorCode: action.payload.errCode};
        case INITIALIZE_QQ_MESSAGE:
            return {...state, bQqSubmitSuccess: null};

        case ID_CARD_SUBMIT_SUCCESS:
             return {...state, idObj: action.payload.value, bIdCardSubmitSuccess: true, idMsg: action.payload.msg};
        case ID_CARD_SUBMIT_FAILURE:
            return {...state, idObj: null, idMsg: action.payload.msg, bIdCardSubmitSuccess: false, idCardErrorCode: action.payload.errCode};
        case INITIALIZE_ID_CARD_MESSAGE:
            return {...state, bIdCardSubmitSuccess: null};
        // case BANK_INFO_SUBMIT_SUCCESS:
        //     return {...state, bank_res: action.payload};
        case LOGOUT_USER:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}
