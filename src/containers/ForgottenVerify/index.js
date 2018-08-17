import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, UIManager, Image, View,TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux';
import {Spinner} from "../../components";
import {ReactCaptchaGenerator} from "../../components";

import {Images} from "../../common";
import { Container, Form, Item, Content, Input, Button, Icon, Text,Toast } from 'native-base';
import {
    forgottenVerifyParameterUpdated,
    regenerateRecaptchaCode,
    requestVerifyCode
} from "../../actions";

class ForgottenVerify extends Component {
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.fv_phone==='') {
            Toast.show({
                text: "Please type phone number!",
                buttonText: "是",
                type: "danger",
                duration: 1000
            });
        }

        if(nextProps.verified) {
            Toast.show({
                text: nextProps.verify_msg,
                buttonText: "是",
                type: "success",
                duration: 1000
            });
        }
    }

    onRegenerateRecaptcahaCode() {
        this.props.regenerateRecaptchaCode();
        Toast.show({
            text: "Captcha code changed!",
            buttonText: "是",
            type: "success"
        });
    }

    getUserSMSVerifyCode() {
        const {fv_phone, fv_recaptchaMatch, fv_recaptchaCode} = this.props;
        if(fv_recaptchaMatch!==fv_recaptchaCode) {
            Toast.show({
                text: "Captcha code incorrect!",
                buttonText: "是",
                type: "danger"
            });
            return
        }

        console.log('code=',fv_recaptchaCode, fv_phone);
        if(fv_phone && fv_recaptchaMatch===fv_recaptchaCode)
            this.props.requestVerifyCode({fv_phone,  fv_recaptchaCode});

    }

    render() {
        return(
            <Container>
                <Content padder style={styles.contentStyle}>
                    <Form>
                        <Item regular underline={false} style={{borderRadius: 5, backgroundColor: 'white', height: 37}}>
                            <Icon style={{color: '#ccc'}} active name='mobile' type="FontAwesome" />
                            <Input style={styles.inputStyle}
                                placeholderTextColor='#ccc'
                                placeholder="请输入手机号码"
                                value = {this.props.fv_phone}
                                onChangeText = {value => this.props.forgottenVerifyParameterUpdated({prop: 'fv_phone', value})}
                            />
                        </Item>
                        <View style={styles.cardStyle}>
                            <View style={{flex: 1, flexDirection: 'row', paddingBottom: 0, marginBottom: 0, alignItems: 'center'}}>
                                <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                                    <Image style={{marginLeft: 10, width: 20, height: 20, justifyContent: 'center' }} source={Images.imageIcon} />
                                    <Input style={styles.inputStyle}
                                        placeholderTextColor='#ccc'
                                        placeholder="请输入图形验证码"
                                        value = {this.props.fv_recaptchaMatch}
                                        onChangeText = {value => this.props.forgottenVerifyParameterUpdated({prop: 'fv_recaptchaMatch', value})}
                                    />
                                </View>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <TouchableOpacity onPress={this.onRegenerateRecaptcahaCode.bind(this)} style={{flex: 1, height: null, justifyContent: 'center' }}>
                                        <Image style={{position: 'absolute'}} source={Images.captchBackground} />
                                        {/*<Image style={{position: 'absolute'}} source={{uri:'http://pjbapi.wtvxin.com/api/Member/GetImageCode'}}  style={{ width: null, height: 30}}/>*/}
                                        <ReactCaptchaGenerator captchaCode={this.props.fv_recaptchaCode} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.cardStyle}>
                            <View style={{flex: 1, flexDirection: 'row', paddingBottom: 0, marginBottom: 0, alignItems: 'center'}}>
                                <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                                    <Image style={{marginLeft: 10, width: 20, height: 20}} source={Images.verifyCodeIcon} />
                                    <Input style={styles.inputStyle}
                                        placeholderTextColor='#ccc'
                                        placeholder="请输入验证码"
                                        value = {this.props.fv_verifycode}
                                        onChangeText = {value => this.props.forgottenVerifyParameterUpdated({prop: 'fv_verifycode', value})}
                                    />
                                </View>
                                <View style={{flex: 1, backgroundColor: '#6ccf8d', flexDirection: 'column'}}>
                                    <TouchableOpacity style={{flex: 1, height: null, justifyContent: 'center' }} onPress={this.getUserSMSVerifyCode.bind(this)}>
                                        <Text style={{paddingLeft: 10, color: '#fff', fontSize: 14}}>
                                            获取验证码
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Button block style={styles.buttonStyle} onPress = {()=> Actions.forgottenpassword()}>
                            <Text style={{fontSize: 18}}>下一步</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles ={
    contentStyle: {
        paddingLeft: 0, paddingRight: 0, backgroundColor:'#f8f8f8'
    },
    itemStyle: {
        borderRadius: 5, marginTop: 10, backgroundColor: 'white', height: 37
    },
    buttonStyle: {
        marginTop: 20, borderRadius: 5, backgroundColor: '#5c91f0', height: 42
    },
    captchaStyle: {
        borderRadius: 5, marginTop: 10, backgroundColor: 'white',flex: 1, flexDirection: 'row',
        justifyContent: 'center', borderColor: '#ccc',borderWidth: 1
    },
    cardStyle: {borderWidth: 1, borderRadius: 5, borderColor: '#ccc',  marginTop: 10, backgroundColor: '#fff', height: 37},
    inputStyle:{
        fontSize: 14
    }
};

const mapStateToProps = (state) => {
    const {fv_phone, fv_recaptchaMatch, fv_verifycode, fv_recaptchaCode,loading, verified,verify_msg, verify_show,error} = state.forgottenVerifyForm;
    return  {fv_phone, fv_recaptchaMatch, fv_verifycode, fv_recaptchaCode,loading, verified,verify_msg,verify_show, error};
};

export default connect(mapStateToProps, {forgottenVerifyParameterUpdated, regenerateRecaptchaCode, requestVerifyCode})(ForgottenVerify);

