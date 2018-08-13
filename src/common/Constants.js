import {Dimensions} from 'react-native';
// const {height, width} = Dimensions.get('screen');
const {width, height} = Dimensions.get("window");

const Constants = {
    RTL: false,
    Language: 'China', // Arabic
    fontFamily: 'OpenSans',
    fontHeader: 'Baloo',
    fontHeaderAndroid: 'Baloo',
    SplashScreen: {
        Duration: 2000,
    },
    AsyncCode: {
        Intro: 'async.intro',
    },
    Dimension: {
        ScreenWidth(percent = 1) {
            return Dimensions.get('window').width * percent
        },
        ScreenHeight(percent = 1) {
            return Dimensions.get('window').height * percent
        },
    },

    Window: {
        width: width,
        height: height,
        headerHeight: 65 * height / 100,
        headerBannerAndroid: 55 * height / 100,
        profileHeight: 45 * height / 100
    },
};

export default Constants;
