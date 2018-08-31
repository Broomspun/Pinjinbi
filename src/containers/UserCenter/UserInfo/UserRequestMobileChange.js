/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Spinner1} from '@components';
import {Images, Constants, Styles, Color} from '@common';
import { Button, Container, Content, Form, Icon, Input, Item, Text, Toast } from 'native-base';
import {ReactCaptchaGenerator} from "../../../components";

import {generateCaptchaCode_mc,getVerifyCode_mc} from './../../../actions'

class UserRequestMobileChange extends Component {
    state = {
      phone: '',
      verifyCode: '',
      captchaCode: '',
    };

    onButtonPress() {
        const { captchaCode, phone,verifyCode} = this.state;
        const { mc_captchaGenCode} = this.props;

        if(phone==='') {
            Toast.show({
                text: "Please enter phone number",
                buttonText: "是",
                type: "warning",
                duration: 1000
            });
            return;
        }

        if(captchaCode !== mc_captchaGenCode) {
            Toast.show({
                text: "Incorrect captcha code",
                buttonText: "是",
                type: "warning",
                duration: 1000
            });
            return;
        }

        if(verifyCode==='') {
            Toast.show({
                text: "Please enter verify code from your phone",
                buttonText: "是",
                type: "warning",
                duration: 1000
            });
            return;
        }

        this.props.loginUser({phone, password});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.error) {
            Toast.show({
                text: `${nextProps.error}`,
                buttonText: "是",
                type: "danger"
            })
        }

        if(nextProps.user) {
            Toast.show({
                text: `${nextProps.msg}`,
                buttonText: "是",
                type: "success",
                duration: 100
            })
        }
    }

    componentWillUpdate(){
    }

    renderError() {

    }

    renderButton() {
        if(this.props.loading) {
            return <Spinner1 mode={'overlay'}/>
        }

        return (
            <Button block style={styles.buttonStyle}  onPress = {this.onButtonPress.bind(this)} >
                <Text style={{fontSize: Styles.fontLarge}}>下一步</Text>
            </Button>
        );
    }

    onMCRecaptcahaGenCode() {
        this.props.generateCaptchaCode_mc();
        Toast.show({
            text: "Captcha code changed!",
            buttonText: "是",
            type: "success"
        });
    }


    getUserMCSMSVerifyCode() {
        const { captchaCode, phone} = this.state;
        const { mc_captchaGenCode} = this.props;

        if(captchaCode !== mc_captchaGenCode) {
            Toast.show({
                text: "Captcha code incorrect!",
                buttonText: "是",
                type: "danger"
            });
        }
        else {
            this.props.getVerifyCode_mc(phone, 6, captchaCode);
        }
    }
    render() {
        return (
            <Container>
                <Content padder style={{backgroundColor:'#f8f8f8'}}>
                    <View style={{marginBottom: 10}}>
                    <Text style={{fontSize: Styles.fontNormal, color: Color.textNormal}}>原用户名可接受短信的用户可自主验证修改用户名，修改后原有 邀请关心不受影响，原用户无法接受短信的用户，需联系在线客 服验证后修</Text>
                    </View>
                    <Form>
                        <Item regular underline={false} style={styles.itemStyle}>
                            <Icon style={{color: '#ccc'}} active name='mobile' type="FontAwesome" />
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入手机号码"
                                value = {this.state.phone}
                                onChangeText = {value => this.setState({phone: value})}
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
                                        value = {this.state.captchaCode}
                                        onChangeText = { value => this.setState({ captchaCode: value})}
                                    />
                                </View>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <TouchableOpacity onPress={()=>this.onMCRecaptcahaGenCode()} style={{flex: 1, height: null, justifyContent: 'center' }}>
                                        <Image style={{position: 'absolute'}} source={Images.captchBackground} />
                                        <ReactCaptchaGenerator captchaCode={this.props.mc_captchaGenCode} />
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
                                        value = {this.props.verifyCode}
                                        onChangeText = { value => this.setState({ verifyCode: value})}
                                    />
                                </View>
                                <View style={{flex: 1, backgroundColor:'#6ccf8d', flexDirection: 'column'}}>
                                    <TouchableOpacity
                                        style={{flex: 1, height: null, justifyContent: 'center' }}
                                        onPress={()=>this.getUserMCSMSVerifyCode()}
                                    >
                                        <Text style={{color: 'white', paddingLeft: 10, fontSize: 14}}>获取验证码</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {this.renderError()}
                        { this.renderButton() }
                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles ={
    contentStyle: {
        backgroundColor:'#f8f8f8',
        flex:1
    },
    itemStyle: {
        borderRadius: 5, backgroundColor: 'white', marginTop: 10, height: 37
    },
    cardStyle: {borderWidth: 1, borderRadius: 5, borderColor: '#ccc',  marginTop: 10, backgroundColor: '#fff', height: 36},
    buttonStyle: {
        marginTop: 10, borderRadius: 5, backgroundColor: '#5c91f0'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
} ;

const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {mc_captchaGenCode,mc_msg} = state.userInfoReducer;
    return {user,mc_captchaGenCode,mc_msg};
};
export default connect(mapStateToProps, {generateCaptchaCode_mc, getVerifyCode_mc})(UserRequestMobileChange);
