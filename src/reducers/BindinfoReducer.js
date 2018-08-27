import {
    GET_BIND_INFO
} from './../actions/types';

const INITIAL_STATE = {
    bindInfo: null
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BIND_INFO:
            return {...state, bindInfo: action.payload};
        default:
            return state;
    }
}
