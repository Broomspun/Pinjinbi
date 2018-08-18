/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux'
import Modal from 'react-native-modal'

import {Images, Constants} from '@common';
import {Image, View, UIManager, TouchableOpacity} from 'react-native';
import {
    Container, Content, Item, Input, Form, Icon,
    Button, Text, CheckBox, Toast, StyleProvider

} from 'native-base';

import {Spinner, Spinner1} from "../../components";
import {registerParameterUpdated, generateCaptchaCode_register, requestVerifyCode_register, registerUser} from './../../actions'
import {ReactCaptchaGenerator} from "../../components";

import getTheme from './../../../native-base-theme/components';
import platform from './../../../native-base-theme/variables/platform';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: null,
            bTerm: false
        };
    }

    componentWillMount() {

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.rg_verified !=null) {
            Toast.show({
                text: nextProps.rg_verify_msg,
                buttonText: "是",
                type: nextProps.rg_verified ? "success": "danger",
                duration: 1000
            });
        }
        if(nextProps.rg_registered != null) {
            Toast.show({
                text: nextProps.rg_register_msg,
                buttonText: "是",
                type: nextProps.rg_registered ? "success": "danger",
                duration: 1000
            });
        }
    }

    _renderModalContent = () => (
        <Container style={{borderRadius: 5}}>
            <View style={{backgroundColor: '#5c91f1', height: 50, borderTopLeftRadius: 5, borderTopRightRadius: 5, }}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white'}}>拼金币用户注册协议</Text>
                </View>
                <View style={{position: 'absolute', right: 5}}>
                    <Button transparent onPress={()=> this.setState({visibleModal: null, bTerm: true})}>
                        <Icon style={{color: 'white'}} name='close' />
                    </Button>
                </View>
            </View>
            <Content padder >
                <View>
                    <Text style={{marginBottom: 20, fontSize: 14}}>欢迎您加入拼金币会员！</Text>
                    <Text style={styles.modalTextStyle}>在注册之前，请您详细阅读以下有关拼金币的使用条件与规则，并确认同意在您使用任何拼金币提供的信息、服务与活动时，皆能遵守。</Text>
                    <Text style={styles.modalTextStyle}>§ 拼金币 使用 手机号码 做为使用者验证、服务启用、密码查询与变更之依据。因此在您申请加入 拼金币 时，请务必确认 您所填写的手机号码是正确的。</Text>
                    <Text style={styles.modalTextStyle}>§ 拼金币 使用个人信息如习惯语言、国别、生日、联系资料等作为系统设定、提供服务、系统查询等依据，因此在您申请加入 拼金币 时，请务必详实填写个人信息。</Text>
                    <Text style={styles.modalTextStyle}>§ 您有妥善保管注册信息的责任与义务，我们建议您不要将自己的账号、服务经由转借、出售或任何方式提供他人使用。您对因您个人保管不当所造成的任何损失，应负全部责任。</Text>
                    <Text style={styles.modalTextStyle}>§ 您使用拼金币提供的信息、服务、活动时，皆应遵守著作权、专利权、商标权、肖像权等相关法律规范，任何侵犯拼金币与他人权利的行为，您应负全部责任。</Text>
                    <Text style={styles.modalTextStyle}>§ 不得利用本站危害国家安全、泄露国家秘密，不得侵犯国家社会集体的和公民的合法权益，不得利用本站制作、复制和传播下列信息：</Text>
                    <Text style={styles.modalTextStyle}>（一）煽动抗拒、破坏宪法和法律、行政法规实施的；</Text>
                    <Text style={styles.modalTextStyle}>（二）煽动颠覆国家政权，推翻社会主义制度的；</Text>
                    <Text style={styles.modalTextStyle}>（三）煽动分裂国家、破坏国家统一的；</Text>
                    <Text style={styles.modalTextStyle}>（四）煽动民族仇恨、民族歧视，破坏民族团结的；</Text>
                    <Text style={styles.modalTextStyle}>（五）捏造或者歪曲事实，散布谣言，扰乱社会秩序的；</Text>
                    <Text style={styles.modalTextStyle}>（六）宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；</Text>
                    <Text style={styles.modalTextStyle}>（七）公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；</Text>
                    <Text style={styles.modalTextStyle}>（八）损害国家机关信誉的；</Text>
                    <Text style={styles.modalTextStyle}>（九）其他违反宪法和法律行政法规的；</Text>
                    <Text style={styles.modalTextStyle}>（十）进行商业广告行为的。</Text>
                </View>
            </Content>
        </Container>
    );


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
            this.props.requestVerifyCode_register({rg_phone});
    }

    registerUser() {
        const {bTerm} = this.state;
        const {rg_phone,rg_password,rg_captcha_match,rg_captcha_code,rg_verify_code, rg_invite_code, rg_qq_code,rg_qq_group} = this.props;

        if(!bTerm) {
            Toast.show({
                text: "点击 “立即注册” 表示同意",
                buttonText: "是",
                type: "warning",
                duration: 2000
            });
            return;
        }

        if(rg_captcha_code !== rg_captcha_match) {
            Toast.show({
                text: "Incorrect captcha code",
                buttonText: "是",
                type: "warning",
                duration: 2000
            });
            return;
        }

        if(rg_verify_code==='') {
            Toast.show({
                text: "Please enter verify code from your phone",
                buttonText: "是",
                type: "warning",
                duration: 2000
            });
            return;
        }

        if(rg_phone==='') {
            Toast.show({
                text: "Please enter phone number",
                buttonText: "是",
                type: "danger",
                duration: 2000
            });
            return;
        }
        if(rg_password ==='') {
            Toast.show({
                text: "Please enter password",
                buttonText: "是",
                type: "danger",
                duration: 2000
            });
            return;
        }

        this.props.registerUser( {rg_phone, rg_verify_code, rg_password, rg_invite_code } );
    }

    render() {
        return (
            <StyleProvider style={getTheme(platform)}>
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
                        <Modal isVisible={this.state.visibleModal === 1}>
                            {this._renderModalContent()}
                        </Modal>

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
                                    <CheckBox checked={this.state.bTerm} color="white" style={{borderColor: '#ccc' }} onPress={()=> this.setState({bTerm: !this.state.bTerm})} />
                                </View>
                                <View style={{marginLeft: 20, flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{fontSize: 14}}>点击 “立即注册” 表示同意</Text>
                                    <Button transparent light onPress={()=>this.setState({visibleModal: 1})}><Text style={{color: 'red'}}>《用户协议》</Text></Button>
                                </View>
                            </View>
                            <Button block style={{ marginTop: 10, borderRadius: 5, backgroundColor: '#5c91f0', height: 42}} onPress={this.registerUser.bind(this)}>
                                <Text style={{fontSize: 18}}>立即注册</Text>
                            </Button>
                        </Form>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 10}}>
                            <View>
                                <Text style={{ color: '#000', fontSize: 16}}>已有账号?</Text>
                            </View>
                            <Button transparent onPress={()=>Actions.login()}>
                                <Text style={{ color: 'red', fontSize: 16}}>立即登录</Text>
                            </Button>
                        </View>
                    </Content>
                    {this.props.rg_verify_loading ? <Spinner1 mode={'overlay'}/> : null}
                </Container>
            </StyleProvider>
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
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 26,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalTextStyle: {
        marginBottom: 5,
        fontSize: 12
    }
};


const mapStateToProps = (state) => {
    const {rg_phone, rg_password, rg_captcha_match, rg_captcha_code,rg_invite_code,rg_register_msg, rg_registered,
        rg_verify_code,rg_qq_code, rg_qq_group, rg_verified, rg_verify_msg,rg_verify_loading} = state.registerForm;

    return {rg_phone, rg_password, rg_captcha_match, rg_captcha_code, rg_invite_code,rg_register_msg,rg_registered,
        rg_verify_code,rg_qq_code, rg_qq_group, rg_verified, rg_verify_msg,rg_verify_loading};
};
export default connect(mapStateToProps,
    {
        registerParameterUpdated,
        generateCaptchaCode_register,
        requestVerifyCode_register,
        registerUser
    })(Register);
