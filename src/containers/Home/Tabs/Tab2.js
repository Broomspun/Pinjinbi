import React, {Component} from 'react';
import {Platform, UIManager, Dimensions, View, Image, TouchableOpacity, PixelRatio} from 'react-native'
import { Container, Content, Button, Text} from 'native-base';

import {Images, Constants, Color, Styles} from '@common';
import {CardBlock} from '@components'

class Tab2 extends Component{
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
    }
    componentDidUpdate() {
    }

    render() {
        return (
            <View style={{backgroundColor: Color.LightGrayColor}}>
                <View style={Styles.mb10}/>
                <CardBlock cardTitle="推广总数" cardTitleColor={Color.textNormal} cardValue='0' cardValueColor={Color.textInfoOrange}>
                    <Text style={{alignSelf:'flex-end', color: Color.textNormal}}>个</Text>
                </CardBlock>
                <View style={{marginTop: 0}}>
                    <Image source={Images.promo_back} style={{flex: 1, height: 100, width: null, marginBottom:10}} />
                    <CardBlock cardTitle="我的邀请码" cardTitleColor={Color.textNormal} />
                    <View style={{ ...Styles.shadowStyle, marginLeft: 15, marginRight: 15, backgroundColor:'transparent'}}>

                        <View style={{flexDirection:'row', ...Styles.RowCenterLeft, paddingVertical: 5, borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.LightBorder}}>
                            <Image source={Images.promo_icon1} style={{width: 24, height: 24, marginRight: 10}} />
                            <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>每日任务要求好友当日做单奖励20金</Text>
                        </View>
                        <View style={{flexDirection:'row', ...Styles.RowCenterLeft, paddingVertical: 5, borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.LightBorder}}>
                            <Image source={Images.promo_icon2} style={{width: 24, height: 24, marginRight: 10}} />
                            <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>受邀人美创接受任务赚取佣金，4个月内你可得到佣金的 10%作为额外奖励</Text>
                        </View>
                    </View>
                    <View style={{...Styles.basicStyle}}>
                        <Text style={{color: Color.textNormal, borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.LightBorder, paddingVertical: 5}}>推广排行榜</Text>
                        <View style={{...Styles.RowCenterLeft,borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.LightBorder, paddingVertical: 10}}>
                            <Text style={{flex:4,color: Color.textNormal, fontSize: Styles.fontSmall}}>S总排行￥</Text>
                            <Text style={{flex:3,color: Color.textNormal, fontSize: Styles.fontSmall}}>S总排行￥</Text>
                            <Text style={{flex:3,color: Color.textNormal, fontSize: Styles.fontSmall}}>S总排行￥</Text>
                        </View>
                        <View style={{...Styles.RowCenterLeft,borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.LightBorder, paddingVertical: 10}}>
                            <View style={{flex:4,  ...Styles.RowCenterLeft}}>
                                <Image source={Images.promo_top1} style={{width: 20, height: 24, marginRight:10}}/>
                                <Text style={{color: Color.textNormal, fontSize: Styles.fontSmall}}>138****0234</Text>
                            </View>
                            <Text style={{flex:3,color: Color.textNormal, fontSize: Styles.fontSmall}}>2365人</Text>
                            <Text style={{flex:3,color: Color.textNormal, fontSize: Styles.fontSmall}}>11285.2金</Text>
                        </View>
                        <View style={{...Styles.RowCenterLeft,borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.LightBorder, paddingVertical: 10}}>
                            <View style={{flex:4,  ...Styles.RowCenterLeft}}>
                                <Image source={Images.promo_top2} style={{width: 20, height: 24, marginRight:10}}/>
                                <Text style={{color: Color.textNormal, fontSize: Styles.fontSmall}}>138****0234</Text>
                            </View>
                            <Text style={{flex:3,color: Color.textNormal, fontSize: Styles.fontSmall}}>2365人</Text>
                            <Text style={{flex:3,color: Color.textNormal, fontSize: Styles.fontSmall}}>11285.2金</Text>
                        </View>
                        <View style={{...Styles.RowCenterLeft,borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.LightBorder, paddingVertical: 10}}>
                            <View style={{flex:4,  ...Styles.RowCenterLeft}}>
                                <Image source={Images.promo_top3} style={{width: 20, height: 24, marginRight:10}}/>
                                <Text style={{color: Color.textNormal, fontSize: Styles.fontSmall}}>138****0234</Text>
                            </View>
                            <Text style={{flex:3,color: Color.textNormal, fontSize: Styles.fontSmall}}>2365人</Text>
                            <Text style={{flex:3,color: Color.textNormal, fontSize: Styles.fontSmall}}>11285.2金</Text>
                        </View>
                    </View>
                    <View style={{height:0}}><Text> </Text></View>
                </View>
            </View>
        )
    }
}

export default Tab2;

