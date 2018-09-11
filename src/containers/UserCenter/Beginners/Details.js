import React, {Component} from 'react';

import {Image, View, TouchableOpacity, PixelRatio} from 'react-native'
import {Platform, UIManager} from "react-native";

import { Button, Text, Container, Content } from 'native-base';
import {Images, Constants, Color, Styles} from '@common';

class Details extends Component {
    state= {bShowStartOrderModal: false, orderStartBtn: false, orderCancelBtn: true};
    constructor(props) {

        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

    }

    componentWillMount() {

    }
    componentDidUpdate() {
    }

    render() {
        return(
            <Container  style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginTop: 15}}>
                    <View style={{backgroundColor: 'white', paddingHorizontal: 15, ...Styles.shadowStyle, paddingVertical: 15}}>
                        <View style={{paddingBottom: 10, borderBottomWidth: 1/PixelRatio.get(), borderBottomColor: Color.Border}}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>任务佣金发放通知</Text>
                        </View>
                        <View style={{paddingTop: 10}}>
                            <Text style={{color: Color.textNormal}}>
                                完成任务奖励6.00金币已发放到账，请注意查收，如果疑问，可联
                                系客服！完成任务奖励6.00金币已发放到账，请注意查收，如果疑
                                问，可联系客服！完成任务奖励6.00金币已发放到账，请注意查收，
                                如果疑问，可联系客服！完成任务奖励6.00金币已发放到账，请注
                                意查收，如果疑问，可联系客服！可联系客服！完成任务奖励6.00
                                金币已发放到账，请注意查收，如果疑问，可联系客服！完成任务
                                奖励6.00金币已发放到账，如果疑问，可联系客服！
                            </Text>
                        </View>
                    </View>

                </Content>
            </Container>
        );
    }
}


export default Details;
