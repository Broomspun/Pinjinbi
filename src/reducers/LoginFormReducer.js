import {LOGIN_PARAMETER_UPDATED} from './../actions/types';

const INITIAL_STATE = {
    phone: '',
    password: '',
    remember: true
};
let remember_status = INITIAL_STATE.remember;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_PARAMETER_UPDATED:
            console.log(action.payload.prop);
            if(action.payload.prop==='remember') {
                remember_status = !remember_status;
                return {...state, [action.payload.prop]: remember_status};
            }
            // action.payload === {prop: 'name', value: 'jane' }
            return {...state, [action.payload.prop]: action.payload.value};
        default:
            return state;
    }
}
