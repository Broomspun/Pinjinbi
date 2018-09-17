import {
    GET_MEMBER_INVITE_SUCCESS, GET_MEMBER_INVITE_FAIL, GET_MEMBER_INVITE_LOADING,
    IS_NOVICE_TASK_COMPLETED_SUCCESS, IS_NOVICE_TASK_COMPLETED_FAIL, IS_NOVICE_TASK_COMPLETED_LOADING,

} from "./../actions/types";


const INITIAL_STATE = {
    inviteObj: null,
    bInviteLoading: false,
    inviteMsg: '',

    noviceObj: null,
    noviceMsg: '',
    bNoviceLoading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_MEMBER_INVITE_SUCCESS:
        return {...state, inviteObj : action.payload, bInviteLoading: false, inviteMsg: ''};
        case GET_MEMBER_INVITE_FAIL:
            return {...state, inviteObj : null, bInviteLoading: false, inviteMsg: action.payload};
        case GET_MEMBER_INVITE_LOADING:
            return {...state, bInviteLoading : true};

        case IS_NOVICE_TASK_COMPLETED_SUCCESS:
            return {...state, noviceObj : action.payload, bNoviceLoading: false, noviceMsg: ''};
        case IS_NOVICE_TASK_COMPLETED_FAIL:
            return {...state, noviceObj : null, bInviteLoading: false, noviceMsg: action.payload};
        case IS_NOVICE_TASK_COMPLETED_LOADING:
            return {...state, bNoviceLoading : true};
        default:
            return state;
    }
}
