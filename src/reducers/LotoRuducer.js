import {
    GET_LOTO_ACTIVITIES_SUCCESS, GET_LOTO_ACTIVITIES_FAIL, GET_LOTO_ACTIVITIES_LOADING,
    TRIAL_LOTO_SUCCESS, TRIAL_LOTO_FAIL, TRIAL_LOTO_LOADING,
    LOTO_HISTORY_SUCCESS, LOTO_HISTORY_FAIL, LOTO_HISTORY_LOADING, INITIALIZE_LOTO
} from './../actions/types';

const INITIAL_STATE = {
    lotoObj: null, //initial loto
    bLotoLoading: false,
    trialLotoResult: null,  //Loto result in trial time,
    bTrialing: false,
    trialLotoMsg: '',
    lotoHistoryObj: null,
    lotoHistoryMsg: '',
    bLotoHistoryLoading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LOTO_ACTIVITIES_SUCCESS:
            return {...state, lotoObj : action.payload, bLotoLoading: false};
        case GET_LOTO_ACTIVITIES_FAIL:
            return {...state, lotoObj : null, bLotoLoading: false};
        case GET_LOTO_ACTIVITIES_LOADING:
            return {...state, bLotoLoading : true};
        case TRIAL_LOTO_SUCCESS:
            return {...state, trialLotoResult : action.payload, bTrialing: false, trialLotoMsg: ''};
        case TRIAL_LOTO_FAIL:
            return {...state, trialLotoResult : null, bTrialing: false, trialLotoMsg: action.payload};
        case TRIAL_LOTO_LOADING:
            return {...state, bTrialing : true};
        case INITIALIZE_LOTO:
            return {...state, bTrialing : false, trialLotoResult: null, trialLotoMsg:''};

        case LOTO_HISTORY_SUCCESS:
            return {...state, lotoHistoryObj : action.payload, bLotoHistoryLoading: false, lotoHistoryMsg: ''};
        case LOTO_HISTORY_FAIL:
            return {...state, lotoHistoryObj : null, bLotoHistoryLoading: false, lotoHistoryMsg: action.payload};
        case LOTO_HISTORY_LOADING:
            return {...state, bLotoHistoryLoading : true};
        default:
            return state;
    }
}
