import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Image, View, TouchableOpacity, PixelRatio} from 'react-native'
import {Platform, UIManager} from "react-native";

import { Button, Text, Container, Content } from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from "react-native-router-flux";


class BeginnersMain extends Component {
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
                    <View style={{ position: 'relative'}}>
                        <Image source={Images.beginners_back} style={{height: 120, width: null, flex: 1, alignItems: 'center'}} />
                        <View style={{position:'absolute', left:0, right:0, alignItems:'center', justifyContent: 'center', top:0, bottom: 0}}>
                            <Text style={{fontWeight: '700', color: 'white', fontSize: Styles.fontLarge}}>新手必读</Text>
                            <Text style={{color: 'white', fontSize: Styles.fontLarge}}>了解拼金币 从这里开始</Text>
                        </View>
                    </View>

                    <View style={{marginTop: 10, backgroundColor: 'white', paddingHorizontal: 15, ...Styles.shadowStyle, paddingVertical: 15}}>
                        <View style={{paddingBottom: 10, borderBottomWidth: 1/PixelRatio.get(), borderBottomColor: Color.Border}}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>账户注册</Text>
                        </View>
                        <View style={{...Styles.RowCenterBetween, paddingTop: 10}}>
                            <Button rounded style={{backgroundColor: Color.LightBlue1, flex: 1,paddingHorizontal: 3, marginRight: 3}} onPress={()=>Actions.Details()}>
                                <Text style={{color: 'white'}}>注册</Text>
                            </Button>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border,marginRight: 3,paddingHorizontal: 3 }}><Text style={{color: Color.textNormal}}>验证码</Text></Button>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border,marginRight: 3,paddingHorizontal: 3}}><Text style={{color: Color.textNormal}}>安全</Text></Button>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border,paddingHorizontal: 5, }}><Text style={{color: Color.textNormal}}>注销账户</Text></Button>
                        </View>
                    </View>
                    <View style={{marginTop: 10, backgroundColor: 'white', paddingHorizontal: 15, ...Styles.shadowStyle, paddingVertical: 15}}>
                        <View style={{paddingBottom: 10, borderBottomWidth: 1/PixelRatio.get(), borderBottomColor: Color.Border}}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>账户登录</Text>
                        </View>
                        <View style={{...Styles.RowCenterBetween, paddingTop: 10}}>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border,marginRight: 1}}><Text style={{fontSize: Styles.fontSmall,color: Color.textNormal}}>忘记密码</Text></Button>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border,marginRight: 1}}><Text style={{fontSize: Styles.fontSmall,color: Color.textNormal}}>登录</Text></Button>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border,marginRight: 1}}><Text style={{fontSize: Styles.fontSmall,color: Color.textNormal}}>新手任务</Text></Button>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border}}><Text style={{fontSize: Styles.fontSmall,color: Color.textNormal}}>积分等级</Text></Button>
                        </View>
                        <View style={{paddingTop: 10}}>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border,marginRight: 1}}><Text style={{fontSize: Styles.fontSmall,color: Color.textNormal}}>邀请奖励</Text></Button>
                        </View>
                    </View>
                    <View style={{marginTop: 10, backgroundColor: 'white', paddingHorizontal: 15, ...Styles.shadowStyle, paddingVertical: 15}}>
                        <View style={{paddingBottom: 10, borderBottomWidth: 1/PixelRatio.get(), borderBottomColor: Color.Border}}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>账户绑定</Text>
                        </View>
                        <View style={{...Styles.RowCenterBetween, paddingTop: 10}}>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border,marginRight: 1}}><Text style={{fontSize: Styles.fontSmall,color: Color.textNormal}}>淘宝买号</Text></Button>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border,marginRight: 1}}><Text style={{fontSize: Styles.fontSmall,color: Color.textNormal}}>其他平台</Text></Button>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border,marginRight: 1}}><Text style={{fontSize: Styles.fontSmall,color: Color.textNormal}}>审核</Text></Button>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border}}><Text style={{fontSize: Styles.fontSmall,color: Color.textNormal}}>冻结</Text></Button>
                        </View>
                    </View>
                    <View style={{marginTop: 10, backgroundColor: 'white', paddingHorizontal: 15, ...Styles.shadowStyle, paddingVertical: 15}}>
                        <View style={{paddingBottom: 10, borderBottomWidth: 1/PixelRatio.get(), borderBottomColor: Color.Border}}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>信息修改</Text>
                        </View>
                        <View style={{...Styles.RowCenterLeft, paddingTop: 10, paddingBottom: 30}}>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border,marginRight: 1}}><Text style={{fontSize: Styles.fontSmall,color: Color.textNormal}}>账户修改</Text></Button>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border,marginRight: 1}}><Text style={{fontSize: Styles.fontSmall,color: Color.textNormal}}>买号修改</Text></Button>
                            <Button rounded transparent style={{borderWidth: 1/PixelRatio.get(), borderColor: Color.Border,marginRight: 1}}><Text style={{fontSize: Styles.fontSmall,color: Color.textNormal}}>买号删除</Text></Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}


export default BeginnersMain;
