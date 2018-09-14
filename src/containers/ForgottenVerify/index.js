import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, UIManager, Image, View,TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux';
import {Spinner1} from "../../components";

import {Images, Styles} from "../../common";
import { Container, Form, Item, Content, Input, Button, Icon, Text,Toast } from 'native-base';
import {
    forgottenVerifyParameterUpdated,
    regenerateRecaptchaCode,
    requestVerifyCode
} from "../../actions";
import {generatorCaptchaCode} from "../../Helper";

class ForgottenVerify extends Component {
    constructor(props) {
        super(props);


        this.state = {
            OnlyVal: null
        };

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
    }

    componentDidMount() {
        this.generateCaptchacode();
    }


    generateCaptchacode () {
        let today = new Date();
        let month = parseInt(today.getMonth())+1;
        let date = parseInt(today.getDate());
        let hour = parseInt(today.getHours());
        let minute = parseInt(today.getMinutes());
        let second = parseInt(today.getSeconds());
        let milisecond = parseInt(today.getMilliseconds());

        if(month<10)   month = '0'+ month;
        if(date<10)   date = '0'+ date;
        if(hour<10)   hour = '0'+ hour;
        if(minute<10)   minute = '0'+ minute;
        if(second<10)   second = '0'+ second;
        if(milisecond<100)   milisecond = '0'+ milisecond;

        let OnlyVal = today.getFullYear()+month+date+hour+minute+second+milisecond+generatorCaptchaCode(6);

        this.setState({OnlyVal: OnlyVal})

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

    onGotoForgottenPassword() {
        if(this.props.fv_phone==='') {
            Toast.show({
                text: "Please enter phone number!",
                buttonText: "是",
                type: "danger"
            });
            return
        }

        if(this.props.fv_recaptchaCode==='') {
            Toast.show({
                text: "Please enter captch code!",
                buttonText: "是",
                type: "danger"
            });
            return
        }
        if(this.props.verified)
            Actions.forgottenpassword();
        else {
            Toast.show({
                text: this.props.verify_msg,
                buttonText: "是",
                type: "danger"
            });
        }
    }

    getUserSMSVerifyCode() {
        const {fv_phone, fv_recaptchaCode} = this.props;
        if(fv_phone==='') {
            Toast.show({
                text: "Please enter phone number!",
                buttonText: "是",
                type: "danger"
            });
            return
        }

        if(fv_recaptchaCode==='') {
            Toast.show({
                text: "Please enter captch code!",
                buttonText: "是",
                type: "danger"
            });
            return
        }
        this.props.requestVerifyCode(fv_phone,  fv_recaptchaCode, this.state.OnlyVal);
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
                                        value = {this.props.fv_recaptchaCode}
                                        onChangeText = {value => this.props.forgottenVerifyParameterUpdated({prop: 'fv_recaptchaCode', value})}
                                    />
                                </View>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <TouchableOpacity style={{flex: 1, height: null, justifyContent: 'center' }} onPress={()=>this.generateCaptchacode()}>
                                        {this.state.OnlyVal && (
                                        <Image style={{flex: 1, position: 'absolute', height: 26, right: 0, width: 100}} source={{uri: `http://pjbapi.wtvxin.com/api/Member/GetImageCode?OnlyVal=${this.state.OnlyVal}`}}/>
                                        )}
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
                        <Button block style={styles.buttonStyle} onPress = {()=> this.onGotoForgottenPassword()}>
                            <Text style={{fontSize: 18}}>下一步</Text>
                        </Button>
                    </Form>
                </Content>
                {this.props.bForgottenLoading ? <Spinner1 mode={'overlay'}/> : null}
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
        fontSize: Styles.fontNormal
    }
};

const mapStateToProps = (state) => {
    const {fv_phone, fv_recaptchaCode, fv_verifycode, verified,verify_msg, verify_show,error,bForgottenLoading} = state.forgottenVerifyForm;
    return  {fv_phone, fv_recaptchaCode, fv_verifycode, verified,verify_msg,verify_show, error,bForgottenLoading};
};

export default connect(mapStateToProps, {forgottenVerifyParameterUpdated, requestVerifyCode})(ForgottenVerify);

