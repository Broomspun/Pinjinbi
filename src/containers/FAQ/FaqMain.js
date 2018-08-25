import React, {Component} from 'react';

import {Platform, UIManager, Image, View, Text, PixelRatio} from 'react-native'

import { Container, Content, Button} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {CardBlock} from '@components'

class FaqMain extends Component {

    componentWillMount(){
    }


    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
    }
    render() {
        return(
            <Container style={{backgroundColor: Color.mainBackground, marginTop: 10, marginBottom: 10}}>
                <Content>
                    <View style={{...Styles.shadowStyle}}>
                        <View style={{flex:1, flexDirection: 'row',  paddingVertical: 12,borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.LightBorder }}>
                            <View style={{flex:1,  ...Styles.ColumnCenter}}>
                                <Image source={Images.faq_icon_01} style={{width: 60, height: 60}}/>
                                <Text style={{marginTop: 10, color: Color.textNormal, fontSize: Styles.fontSmall}}>账号管理</Text>
                            </View>
                            <View style={{flex:1, ...Styles.ColumnCenter}}>
                                <Image source={Images.faq_icon_02} style={{width: 60, height: 60}}/>
                                <Text style={{marginTop: 10, color: Color.textNormal, fontSize: Styles.fontSmall}}>任务操作</Text>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection: 'row', paddingVertical: 12, }}>
                            <View style={{flex:1, ...Styles.ColumnCenter}}>
                                <Image source={Images.faq_icon_03} style={{width: 60, height: 60}}/>
                                <Text style={{marginTop: 10, color: Color.textNormal, fontSize: Styles.fontSmall}}>反款问题</Text>
                            </View>
                            <View style={{flex:1, ...Styles.ColumnCenter}}>
                                <Image source={Images.faq_icon_04} style={{width: 60, height: 60}}/>
                                <Text style={{marginTop: 10, color: Color.textNormal, fontSize: Styles.fontSmall}}>其他问题</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ ...Styles.shadowStyle,marginTop: 10,  marginLeft: 15, marginRight: 15, backgroundColor:'transparent'}}>
                        <View style={{flexDirection:'row', ...Styles.RowCenterLeft, paddingVertical: 5, borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.LightBorder}}>
                            <Image source={Images.faq_chat_icon} style={{width: 24, height: 24, marginRight: 10}} />
                            <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>在线客服（09:00-22:00）</Text>
                        </View>
                    </View>
                    <View style={{...Styles.basicStyle}}>
                        <Text style={{color: Color.textNormal}}>

                            所有常见问题都有相应的解决方案，请参考常见问题自主解决，如
                            果常见问题无法解决您的问题在咨询客服，由于客服咨询量较大，
                            请尽可能的描述清楚您的问题，以便快速解决
                        </Text>
                    </View>

                    <Button block style={{marginTop: 20, borderRadius: 5, backgroundColor: Color.LightBlue, marginLeft: 15, marginRight: 15}} >
                        <Text style={{color: 'white',fontSize: Styles.fontLarge}}>QQ咨询</Text>
                    </Button>

                </Content>
            </Container>
        );
    }
}

const styles = {
    cardStyle_1:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems:'flex-start',
        paddingBottom: 10,
        borderColor:
        Color.borderNormal,
        borderBottomWidth:1
    },
    tabStyle: {
        backgroundColor: 'white',

    },
    activeTabStyle: {
        backgroundColor: 'white',
    },
    textStyle: {
        color: Color.textDark
    },
    activeTextStyle: {
        color: Color.LightBlue
    },
    tabBarUnderlineStyle:{
        backgroundColor: Color.LightBlue
    },
    textBlockDownStyle: {fontSize: Styles.fontLarge, color: Color.textInfoOrange, borderTopWidth:1, borderColor: Color.borderNormal},
};

const {cardStyle_1,textBlockDownStyle} = styles;

export default FaqMain;
