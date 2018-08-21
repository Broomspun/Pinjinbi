import React, {Component} from 'react';
import {Platform, UIManager, Dimensions, View, Image, TouchableOpacity} from 'react-native'
import { Container, Content, Button, Text} from 'native-base';

import {Images, Constants, Color, Styles} from '@common';
import {RowLeftRightBlock} from '@components';

class Tab5 extends Component{
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
                <View style={{...Styles.basicStyle,marginBottom: 10, ...Styles.shadowStyle}}>
                    <View style={{flexDirection:'row', ...Styles.RowCenterLeft, marginBottom: 10}}>
                        <Image source={Images.prendig_review} style={{width: 15, height: 15, marginRight: 10}} />
                        <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>李乐***店</Text>
                    </View>
                    <View style={{ flexDirection: 'row', flex:1, justifyContent:'space-around', alignItems: 'center',borderBottomWidth:1, borderColor: Color.LightBorder, paddingBottom: 10}}>
                        <View style={{flex:1, flexDirection:'row', ...Styles.RowCenterLeft}}>
                            <Image source={Images.product} style={{ height: 80, width: 80, marginRight:10}}/>
                            <View style={{flex:1, alignItems: 'flex-start',justifyContent: 'space-between'}}>
                                <Text style={{flex: 1, flexWrap: 'wrap',color: Color.textNormal, fontSize:Styles.fontSmall}}>英国Vanow高档保温杯男士女316不锈钢便携水 杯子商务定制刻字茶杯</Text>
                                <Text style={{flex: 1, color: Color.orangeColor, fontSize:Styles.fontSmall}}>0.9</Text>
                                <RowLeftRightBlock leftTitle='最爱打法师' rightTitle='最爱打法师'
                                      l_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                      r_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                            />
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Button small rounded bordered style={{borderColor: Color.LightBorder, alignSelf:'flex-end'}}>
                            <Text style={{color: Color.LightBlue1}}>评价</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

export default Tab5;

