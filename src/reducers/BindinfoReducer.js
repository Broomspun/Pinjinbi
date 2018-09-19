import {
    ID_CARD_SUBMIT_SUCCESS, QQ_SUBMIT_SUCCESS, BANK_INFO_SUBMIT_SUCCESS,QQ_SUBMIT_FAILURE, INITIALIZE_QQ_MESSAGE, INITIALIZE_QQ_DATA, LOGOUT_USER
} from './../actions/types';

const INITIAL_STATE = {
    qq_res: null,
    id_res: null,
    bQqSubmitSuccess: null,
    qqMsg: '',
    qqErrorCode: null
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case QQ_SUBMIT_SUCCESS:
            return {...state, qq_res: action.payload.value, bQqSubmitSuccess: true, qqMsg: action.payload.msg};
        case QQ_SUBMIT_FAILURE:
            return {...state, qq_res: action.payload.value, bQqSubmitSuccess: false, qqMsg: action.payload.msg, qqErrorCode: action.payload.errCode};
        // case ID_CARD_SUBMIT_SUCCESS:
        //     return {...state, id_res: action.payload};
        // case BANK_INFO_SUBMIT_SUCCESS:
        //     return {...state, bank_res: action.payload};
        case INITIALIZE_QQ_MESSAGE:
            return {...state, bQqSubmitSuccess: null};
        case INITIALIZE_QQ_DATA:
        case LOGOUT_USER:
            return {...INITIAL_STATE};
        default:
            return state;
    }
}
