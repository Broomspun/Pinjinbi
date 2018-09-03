import React, {Component} from 'react';
import {Platform, UIManager, Dimensions, View} from 'react-native'
import { Container, Content, Text} from 'native-base';

import {Images, Constants, Color, Styles} from '@common';

class Tab3 extends Component{
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
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginBottom: 10}}>
                    <View style={Styles.basicStyle}>

                    </View>


                </Content>
            </Container>
        )
    }
}

export default Tab3;

