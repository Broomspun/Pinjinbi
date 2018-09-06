import {
    ID_CARD_SUBMIT_SUCCESS, QQ_SUBMIT_SUCCESS, BANK_INFO_SUBMIT_SUCCESS
} from './../actions/types';

const INITIAL_STATE = {
    qq_res: null,
    id_res: null
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case QQ_SUBMIT_SUCCESS:
            return {...state, qq_res: action.payload};
        case ID_CARD_SUBMIT_SUCCESS:
            console.log('id_res', action.payload);
            return {...state, id_res: action.payload};
        case BANK_INFO_SUBMIT_SUCCESS:
            console.log('bank_res', action.payload);
            return {...state, bank_res: action.payload};
        default:
            return state;
    }
}
