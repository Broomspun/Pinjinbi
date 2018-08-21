import React, {Component} from 'react';
import {Platform, UIManager, Dimensions, View, Image, TouchableOpacity} from 'react-native'
import { Container, Content, Button, Text} from 'native-base';

import {Images, Constants, Color, Styles} from '@common';

class Tab1 extends Component{
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
                <View style={{marginBottom: 10}}>
                    <View style={{...Styles.basicStyle, ...Styles.shadowStyle, flexDirection: 'row', flex:1, justifyContent:'space-around', alignItems: 'center'}}>
                        <View style={{flex:1,flexDirection:'row', justifyContent: 'space-around', height: 80}}>
                            <Image source={Images.product} style={{ height: 80, width: 80, marginRight:10}}/>
                            <View style={{flex:1, justifyContent:'space-around'}}>
                                <View style={{flexDirection:'row', ...Styles.RowCenterLeft}}>
                                    <Image source={Images.orange_head} style={{width: 15, height: 15, marginRight: 10}} />
                                    <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>最爱打法师</Text>
                                </View>
                                <Text style={{color: Color.orangeColor, fontSize:Styles.fontSmall}}>佣金：6.60</Text>
                                <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>垫付129.00元</Text>
                            </View>
                        </View>
                        <View style={{flex:1}}>
                            <View style={{height: 80,  justifyContent:'space-around'}}>
                                <Text style={{fontSize: Styles.fontSmall, alignSelf:'flex-end', color: Color.textNormal}}>  任务ID:286693</Text>
                                <View style={{flexDirection:'row',...Styles.RowCenterRight}}>
                                    <Text style={{alignItems:'center', fontSize: Styles.fontSmall, color: Color.textNormal, marginRight: 5}}>平台返款</Text>
                                    <TouchableOpacity style={{borderColor: Color.LightBorder, borderWidth: 1, borderRadius: 3, padding: 5, marginHorizontal: 0}} >
                                        <Text style={{color: Color.LightBlue1, fontSize:Styles.fontSmall}}>待操作</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{fontSize: Styles.fontSmall, alignSelf:'flex-end', color: Color.orangeColor}}>提交倒计时：00：09:52</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{height:0}}><Text> </Text></View>
                </View>
            </View>
        )
    }
}

export default Tab1;
