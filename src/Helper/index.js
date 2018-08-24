import {AsyncStorage} from "react-native";
import {Actions} from "react-native-router-flux";

export const generatorCaptchaCode = (length) => {
    let result = [];
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        let char = possible.charAt(Math.floor(Math.random() * possible.length));
        result.push(char);
    }

    return result.join('')
};

export const _retrieveUserData = async () => {
    try {
        let user = await AsyncStorage.getItem('pjinbi_auth_user');
        if (user !== null) {
            console.log('fetched user', user);
            return user;
        } else {
            console.log('none user');
            Actions.auth();
        }
    } catch (error) {
        console.log('error');
    }
};
