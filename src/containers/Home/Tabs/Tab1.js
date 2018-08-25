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
               <Text>Promotion Tab1 Content</Text>
            </View>
        )
    }
}

export default Tab1;

