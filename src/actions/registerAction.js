import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REGISTER_PARAMETER_UPDATED,
    REGISTER_REGENERATE_CAPTCHACODE,
    REGISTER_VERIFY_FAIL,
    REGISTER_VERIFY_SUCCESS, REGENERATE_CAPTCHACODE,
} from './types'
import {generatorCaptchaCode} from "../Helper";

export const registerParameterUpdated = ( {prop, value}) => {
  return {
      type: REGISTER_PARAMETER_UPDATED,
      payload: {prop, value}
  }
};

export const generateCaptchaCode_register = () => {
    return {
        type: REGISTER_REGENERATE_CAPTCHACODE,
        payload: {value: generatorCaptchaCode(4)}
    }
};
