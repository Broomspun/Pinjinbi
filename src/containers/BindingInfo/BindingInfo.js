import React, {Component} from 'react';
import Timer from 'react-timer-mixin';
import {Platform, UIManager,Image, View, Text, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal'

import { Container, Content, Button} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';


class BindingInfo extends Component {

    constructor(props) {
        super(props);


        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
    }
    componentWillMount(){
        console.log('loto state',this.state);

    }
    componentDidUpdate() {

    }

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content>
                    <View>
                        <Text style={{marginTop: 15}}>账号信息(账户信息必填，银行卡信息与身份证一致)</Text>
                        <View style={{...Styles.basicStyle}}>
                            <Text>How are you</Text>

                        </View>
                    </View>

                </Content>
            </Container>

        );
    }
}

export default BindingInfo;
