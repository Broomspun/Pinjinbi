import React, {Component} from 'react';
import {Platform, UIManager, Image, View, Dimensions} from 'react-native'
import { Container, Content, Text} from 'native-base';


import {Images, Constants, Color, Styles} from '@common';

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
            <View style={{ flex:1, ...Styles.ColumnCenter,height: Styles.height-150}}>
                <View style={{...Styles.ColumnCenter}}>
                    <Image source={Images.tab_2}  style={{width: 60, height: 60}}/>
                    <Text style={{marginTop: 15, alignSelf:'center', color:Color.textLight}}>暂时没有相关数据</Text>
                </View>
            </View>
        )
    }
}

export default Tab2;

