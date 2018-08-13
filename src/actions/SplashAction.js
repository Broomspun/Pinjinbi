import Timer from 'react-timer-mixin';
import {Actions} from 'react-native-router-flux';

import {SPLASH_SCREEN_DRAWN} from './types';

export const drawSplashScreen = () => {
    return (dispatch) => {
        Timer.setInterval(SplashScreenDrawn(dispatch), 2000);
    }
};

const SplashScreenDrawn = (dispatch) => {
    dispatch({
        type: SPLASH_SCREEN_DRAWN,
        payload: 'DrawSplashScreen'
    });

    Actions.auth();
};
