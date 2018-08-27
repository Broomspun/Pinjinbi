import {
    GET_BIND_INFO, QQ_SUBMIT_SUCCESS
} from './../actions/types';

const INITIAL_STATE = {
    bindInfo: null,
    qq_res: null
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BIND_INFO:
            return {...state, bindInfo: action.payload};
        case QQ_SUBMIT_SUCCESS:
            return {...state, qq_res: action.payload};
        default:
            return state;
    }
}
