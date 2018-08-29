import {
    AVATAR_SUCCESS,
    AVATAR_SUBMIT
} from './../actions/types';

const INITIAL_STATE = {
    submitting: false,
    userAvatar: null
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AVATAR_SUBMIT:
            return {...state, submitting: true};
        case AVATAR_SUCCESS:
            return {...state, submitting: false, userAvatar: action.payload};
        default:
            return state;
    }
}
