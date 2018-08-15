/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'

import {Images, Constants} from '@common';
import {Image, View, UIManager, TouchableOpacity} from 'react-native';
import {
    Container, Content, Item, Input, Form, Label, Icon,
    Button, Text, CheckBox, Toast

} from 'native-base';

import {Spinner, Spinner1} from "../../components";
import {registerParameterUpdated, generateCaptchaCode_register, requestVerifyCode_register} from './../../actions'

import {ReactCaptchaGenerator} from "../../components";


class Register extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.rg_verified !=null) {
            Toast.show({
                text: nextProps.rg_verify_msg,
                buttonText: "是",
                type: nextProps.rg_verified ? "success": "danger",
                duration: 1000
            });
        }
    }


    onRegenerateRecaptcahaCode() {
        this.props.generateCaptchaCode_register();
        Toast.show({
            text: "Captcha code changed!",
            buttonText: "是",
            type: "success"
        });
    }

    getUserSMSVerifyCode() {
        const { rg_phone, rg_captcha_match, rg_captcha_code} = this.props;

        if(rg_captcha_match !== rg_captcha_code) {
            Toast.show({
                text: "Captcha code incorrect!",
                buttonText: "是",
                type: "danger"
            });
            return
        }

        if(rg_phone && rg_captcha_match === rg_captcha_code)
            this.props.requestVerifyCode_register({rg_phone,  rg_captcha_match});
    }

    render() {

        console.log(this.props);
        return (
            <Container>
                <Content padder style={styles.contentStyle}>
                    <View style={styles.logoStyle}>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={{width: 36, height: 50}} source={Images.splashScreen}/>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={styles.textLarge}>拼金币</Text>
                                <Text style={styles.textSmall}>www.pinjinbi.com</Text>
                            </View>
                        </View>
                    </View>
                    <Form style={{marginBottom: 0}}>
                        <Item regular style={styles.itemStyle}>
                            <Icon style={{color: '#ccc'}} active name='mobile' type="FontAwesome" />
                            <Input
                                placeholderTextColor='#ccc'
                                style={styles.inputStyle}
                                placeholder="请输入手机号码，用于登录和找回密码"
                                value = {this.props.rg_phone}
                                onChangeText = { value => this.props.registerParameterUpdated({ prop: 'rg_phone', value})}
                            />
                        </Item>
                        <View style={styles.cardStyle}>
                            <View style={{flex: 1, flexDirection: 'row', paddingBottom: 0, marginBottom: 0, alignItems: 'center'}}>
                                <View style={{flex: 3, flexDirection: 'row', alignItems: 'center'}}>
                                    <Image style={{marginLeft: 10, width: 16, height: 16, justifyContent: 'center' }} source={Images.imageIcon} />
                                    <Input
                                        style={styles.inputStyle}
                                        placeholderTextColor='#ccc'
                                        placeholder="请输入图形验证码"
                                        value = {this.props.rg_captcha_match}
                                        onChangeText = { value => this.props.registerParameterUpdated({ prop: 'rg_captcha_match', value})}
                                    />
                                </View>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <TouchableOpacity onPress={this.onRegenerateRecaptcahaCode.bind(this)} style={{flex: 1, height: null, justifyContent: 'center' }}>
                                        <Image style={{position: 'absolute'}} source={Images.captchBackground} />
                                        <ReactCaptchaGenerator captchaCode={this.props.rg_captcha_code} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{height: 37, borderWidth: 1, borderRadius: 5, borderColor: '#ccc',  marginTop: 10, backgroundColor: '#fff'}}>
                            <View style={{flex: 1, flexDirection: 'row', paddingBottom: 0, marginBottom: 0}}>
                                <View style={{flex: 3, flexDirection: 'row', borderTopWidth: 0, alignItems: 'center'}}>
                                    <Image style={{marginLeft: 10, width: 16, height: 16}} source={Images.smsIcon}/>
                                    <Input
                                        style={styles.inputStyle}
                                        placeholderTextColor='#ccc'
                                        placeholder="请输入图像验证码"
                                        value = {this.props.rg_verify_code}
                                        onChangeText = { value => this.props.registerParameterUpdated({ prop: 'rg_verify_code', value})}
                                    />
                                </View>
                                <View style={{flex: 1, backgroundColor:'#6ccf8d', flexDirection: 'column'}}>
                                    <TouchableOpacity
                                        style={{flex: 1, height: null, justifyContent: 'center' }}
                                        onPress={this.getUserSMSVerifyCode.bind(this)}
                                    >
                                        <Text style={{color: 'white', paddingLeft: 10, fontSize: 14}}>获取验证码</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Item regular style={styles.itemStyle}>
                            <Image style={{marginLeft: 10, width: 16, height: 16}} source={Images.lockIIcon}/>
                            <Input
                                style={styles.inputStyle}
                                placeholderTextColor='#ccc'
                                placeholder="请输入6到16位数字、字母组合登录密码"
                                secureTextEntry
                                value = {this.props.rg_password}
                                onChangeText = { value => this.props.registerParameterUpdated({ prop: 'rg_password', value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Image style={{marginLeft: 10, width: 16, height: 16}} source={Images.qqIcon}/>
                            <Input
                                style={styles.inputStyle}
                                placeholderTextColor='#ccc'
                                placeholder="请输入QQ号"
                                value = {this.props.rg_qq_code}
                                onChangeText = { value => this.props.registerParameterUpdated({ prop: 'rg_qq_code', value})}

                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Image style={{marginLeft: 10, width: 16, height: 16}} source={Images.handIcon}/>
                            <Input style={styles.inputStyle} placeholderTextColor='#ccc' placeholder="没有邀请人不用填写" />
                        </Item>
                        <View regular style={styles.itemQQStyle} >
                            <Input
                                style={styles.inputStyle1}
                                placeholderTextColor='#606060'
                                placeholder="官方新人QQ群"
                                value = {this.props.rg_qq_group}
                                onChangeText = { value => this.props.registerParameterUpdated({ prop: 'rg_qq_group', value})}
                            />
                            <Button rounded style={styles.qqGroupStyle}>
                                <View style={{borderRightWidth: 1, borderColor: 'white', paddingRight: 10 }}>
                                <Image style={{ marginLeft: 10, width: 16, height: 16 }} source={Images.qqIcon_white}/>
                                </View>
                                <Text style={{justifyContent: 'flex-start', marginLeft: 0, paddingLeft: 10}}>加入QQ群</Text>
                            </Button>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row',alignItems: 'center', justifyContent: 'flex-start', marginTop: 10}}>
                            <View>
                                <CheckBox checked={true} color="black" style={{}} />
                            </View>
                            <View style={{marginLeft: 20}}>
                                <Text style={{fontSize: 14}}>点击 “立即注册” 表示同意《用户协议》</Text>
                            </View>
                        </View>
                        <Button block style={{ marginTop: 10, borderRadius: 5, backgroundColor: '#5c91f0', height: 42}}>
                            <Text style={{fontSize: 18}}>立即注册</Text>
                        </Button>
                    </Form>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 10}}>
                        <View>
                            <Text style={{ color: '#000', fontSize: 16}}>已有账号?</Text>
                        </View>
                        <Button transparent>
                            <Text style={{ color: 'red', fontSize: 16}}>立即登录</Text>
                        </Button>
                    </View>
                </Content>
                {this.props.rg_verify_loading ? <Spinner1 mode={'overlay'}/> : null}
            </Container>
        );
    }
}

const styles ={
    contentStyle: {
        paddingLeft: 0, paddingRight: 0, backgroundColor:'#f8f8f8'
    },
    itemStyle: {
        borderRadius: 5, marginTop: 10, backgroundColor: 'white', padding:0, height: 38
    },
    itemQQStyle: {
        flex: 1, flexDirection: 'row',
        borderRadius: 5, marginTop: 10, backgroundColor: 'white', padding:0, height: 38,
        alignItems: 'center', borderWidth: 1, borderColor: '#ccc'
    },
    textLarge: {
        marginLeft: 5,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#5c91f0'
    },
    textSmall: {
        marginLeft: 5,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#9b9b9b'
    },
    logoStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 30,
        backgroundColor: 'white'
    },
    inputStyle:{
        height: 37, padding: 0,  margin:0, fontSize: 14
    },
    inputStyle1:{
        height: 37, padding: 0,  margin:10, fontSize: 14, flex: 2
    },
    cardStyle: {borderWidth: 1, borderRadius: 5, borderColor: '#ccc',  marginTop: 10, backgroundColor: '#fff', height: 36},
    qqGroupStyle: {
        flexDirection: 'row',
        height: 30, marginRight: 10, backgroundColor: '#76a7ff', marginTop: 3
    }

};


const mapStateToProps = (state) => {
    const {rg_phone, rg_password, rg_captcha_match, rg_captcha_code,
        rg_verify_code,rg_qq_code, rg_qq_group, rg_verified, rg_verify_msg,rg_verify_loading} = state.registerForm;

    return {rg_phone, rg_password, rg_captcha_match, rg_captcha_code,
        rg_verify_code,rg_qq_code, rg_qq_group, rg_verified, rg_verify_msg,rg_verify_loading};
};
export default connect(mapStateToProps,
    {
        registerParameterUpdated,
        generateCaptchaCode_register,
        requestVerifyCode_register
    })(Register);
