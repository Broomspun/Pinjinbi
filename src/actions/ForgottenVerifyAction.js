import {Actions} from 'react-native-router-flux';
import axios from 'axios';

import {
    FORGOTTEN_VERIFY_PARAMETER_UPDATED,
    FORGOTTEN_VERIFY_FAIL,
    FORGOTTEN_VERIFY_SUCCESS,
    REGENERATE_CAPTCHACODE
} from "./types";

export const forgottenVerifyParameterUpdated = ({ prop, value }) => {
    return {
        type: FORGOTTEN_VERIFY_PARAMETER_UPDATED,
        payload: {prop, value}
    }
};
generatorCaptchaCode = (length) => {
    let result = [];
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        let char = possible.charAt(Math.floor(Math.random() * possible.length));
        result.push(char);
    }

    return result.join('')
};

export const regenerateRecaptchaCode = () => {
    return {
        type: REGENERATE_CAPTCHACODE,
        payload: {value: generatorCaptchaCode(4)}
    }
};
