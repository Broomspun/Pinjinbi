import {Actions} from 'react-native-router-flux';
import axios from 'axios';

import {
    FORGOTTEN_VERIFY_PARAMETER_UPDATED,
    FORGOTTEN_VERIFY_FAIL,
    FORGOTTEN_VERIFY_SUCCESS
} from "./types";

export const forgottenVerifyParameterUpdated = ({ prop, value }) => {
    return {
        type: FORGOTTEN_VERIFY_PARAMETER_UPDATED,
        payload: {prop, value}
    }
};
