import {Dimensions, Platform} from 'react-native';
const _height = Dimensions.get('window').height;
const {height} = Dimensions.get('window');
const {heightWindow} = Dimensions.get('window');

export default Styles ={
    cardStyle: {
        flexDirection:'row',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems:'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        elevation: 1,
        marginBottom: 10
    },
    cardStyleColumn: {
        flexDirection:'column',
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        elevation: 1,
        marginBottom: 10
    },
    cardStyleEmpty: {
        flexDirection:'column',
        paddingLeft: 15,
        paddingRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        elevation: 1,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    shadowStyle: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        elevation: 1,
    },
    buttonStyle: {
        marginTop: 10, borderRadius: 5, backgroundColor: '#5c91f0'
    },

    fontLarger: 22,
    fontLarge: 20,
    fontNormal: 16,
    fontSmall: 14,
    fontSmaller: 12,

    width: Dimensions.get('window').width,
    height: Platform.OS !== 'ios' ? _height : (_height - 50),
    navBarHeight: Platform !== 'ios' ? (height - heightWindow) : 0,
    headerHeight: Platform.OS === 'ios' ? 40 : 56,

    thumbnailRatio: 1.2, //Thumbnail ratio, the product display height = width * thumbnail ratio

    FontSize: {
        tiny: 12,
        small: 14,
        medium: 16,
        big: 18,
        large: 20,
    },
    IconSize: {
        TextInput: 25,
        ToolBar: 18,
        Inline: 20,
    },
    FontFamily: {},
    ColumnCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ColumnCenterTop: {
        alignItems: 'center',
    },
    ColumnCenterBottom: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    ColumnCenterLeft: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    ColumnCenterRight: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    Row: {
        flexDirection: 'row',
    },
    RowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    RowCenterTop: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    RowCenterBottom: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    RowCenterLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    RowCenterRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    RowCenterBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    //More traits

    IconSearchView: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 10,
        borderRadius: 50,

        shadowOffset: {width: 0, height: -4},
        shadowColor: 'rgba(0,0,0, .3)',
        elevation: 10,
        shadowOpacity: 0.1,
        zIndex: 9999,
    },
    IconSearch: {
        width: 20,
        height: 20,
        margin: 12,
        zIndex: 9999,
    },
    logo:{
        width: Platform.OS === 'ios' ? 180 : 300,
        height: Platform.OS === 'ios' ? 20 : 60,
        resizeMode:"contain",
        marginTop: 4
    },

    toolbarIcon: {
        "width": 16,
        "height": 16,
        "resizeMode": "contain",
        "marginTop": 12,
        "marginRight": 12,
        "marginBottom": 12,
        "marginLeft": 8,
        "opacity": 0.8,
    },
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 65,
        borderTopWidth: 65,
        borderRightColor: 'transparent',
        borderTopColor: 'rgba(0,0,0,.4)'
    },
    basicStyle:{paddingHorizontal: 15, marginTop: 10, backgroundColor: 'white', paddingVertical: 10}

};
