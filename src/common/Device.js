import {Dimensions, Platform} from 'react-native';

const {width, height, scale} = Dimensions.get("window");
const isIphoneX = (height * scale) > 2000 && Platform.OS === 'ios';

export default {
    isIphoneX,
    ToolbarHeight: isIphoneX ? 35 : 0
}
