import {
    GET_NOTICE_LIST
} from './../actions/types';


const INITIAL_STATE ={
    noticelists: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_NOTICE_LIST:
            return {...state, noticelists: action.payload};
        default:
            return state;
    }
}
