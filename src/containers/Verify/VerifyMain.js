import React, {Component} from 'react';
import {Platform, UIManager,Image, View, Text, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux';
import {Actions} from "react-native-router-flux";
import { Container, Content, Button, Icon} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {get_bindInfo, get_idcardInfo} from './../../actions'
import {getBindingInfo} from "../../Services";

class VerifyMain extends Component {

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
        this.state = {user: props.user};

        const {UserId, Token} = this.state.user;
        if(this.props.user && !this.props.user.bindInfo)
        (async ()=>{
            await this.props.get_bindInfo(UserId, Token);  //API 5.4
            await this.props.get_idcardInfo(UserId, Token);
        })();

        // this.props.get_bindInfo(UserId, Token);
        // this.props.get_idcardInfo(UserId, Token);
    }
    componentWillMount(){
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {
        console.log('user', nextProps);
    }

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content>
                    <View>
                        <Text style={{marginVertical: 15, paddingHorizontal: 15, color: Color.redColor}}>账号信息(账户信息必填，银行卡信息与身份证一致)</Text>
                        <View style={{flex:1, flexDirection: 'row', alignItems: 'center',...Styles.basicNoMarginStyle, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Image source={Images.icon_passport} style={{width:26, height:26, marginRight:10}}/>
                                <Text style={{color: Color.textNormal}}>绑定身份证</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <TouchableOpacity style={{...Styles.RowCenterRight,flexDirection:'row'}} activeOpacity={0.8} onPress={()=>Actions.verifypassport({user: this.props.user})}>
                                    <Text style={{color: Color.LightBlue}}>{this.props.user.bindInfo ? this.props.user.bindInfo.IsAUTStr:''}</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection: 'row', alignItems: 'center',...Styles.basicNoMarginStyle, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Image source={Images.icon_bankcard} style={{width:26, height:26, marginRight:10}}/>
                                <Text style={{color: Color.textNormal}}>绑定银行卡</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <TouchableOpacity style={{...Styles.RowCenterRight,flexDirection:'row'}} activeOpacity={0.8} onPress={()=>Actions.verifybanks({user: this.props.user})}>
                                    <Text style={{color: Color.LightBlue}}>{this.props.user.bindInfo ? this.props.user.bindInfo.BankStr: ''}</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection: 'row', alignItems: 'center',...Styles.basicNoMarginStyle, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Image source={Images.icon_qq_number} style={{width:26, height:26, marginRight:10}}/>
                                <Text style={{color: Color.textNormal}}>QQ号</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <TouchableOpacity style={{...Styles.RowCenterRight,flexDirection:'row'}} activeOpacity={0.8} onPress={()=>Actions.verifyqq({user: this.props.user, qq:this.props.user.bindInfo ? this.props.user.bindInfo.QQStr:''})}>
                                    <Text style={{color: Color.LightBlue}}>{this.props.user.bindInfo ? this.props.user.bindInfo.QQStr:''}</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={{marginVertical: 15, paddingHorizontal: 15, color: Color.redColor}}>账号信息(任意绑定一个号并通过审核即可完成新手任务)</Text>

                        <TouchableOpacity style={{flex:1, flexDirection: 'row', alignItems: 'center',...Styles.basicNoMarginStyle, ...Styles.bottomBorderStyle}} onPress={()=>Actions.TabaoMain()} >
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Image source={Images.mission_01} style={{width:26, height:26, marginRight:10}}/>
                                <Text style={{color: Color.textNormal}}>绑定淘宝账号</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <View style={{...Styles.RowCenterRight,flexDirection:'row'}} activeOpacity={0.8}>
                                    <Text style={{color: Color.LightBlue}}>随便</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{flex:1, flexDirection: 'row', alignItems: 'center',...Styles.basicNoMarginStyle, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Image source={Images.icon_jd} style={{width:26, height:26, marginRight:10}}/>
                                <Text style={{color: Color.textNormal}}>绑定京东账号</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <TouchableOpacity style={{...Styles.RowCenterRight,flexDirection:'row'}} activeOpacity={0.8} >
                                    <Text style={{color: Color.LightBlue}}>未绑定</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection: 'row', alignItems: 'center',...Styles.basicNoMarginStyle, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Image source={Images.mission_02} style={{width:26, height:26, marginRight:10}}/>
                                <Text style={{color: Color.textNormal}}>绑定拼多多账号</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <TouchableOpacity style={{...Styles.RowCenterRight,flexDirection:'row'}} activeOpacity={0.8} >
                                    <Text style={{color: Color.LightBlue}}>未绑定</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection: 'row', alignItems: 'center',...Styles.basicNoMarginStyle, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Image source={Images.mission_06} style={{width:26, height:26, marginRight:10}}/>
                                <Text style={{color: Color.textNormal}}>绑定蘑菇街账号</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <TouchableOpacity style={{...Styles.RowCenterRight,flexDirection:'row'}} activeOpacity={0.8} >
                                    <Text style={{color: Color.LightBlue}}>未绑定</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection: 'row', alignItems: 'center',...Styles.basicNoMarginStyle, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Image source={Images.mission_07} style={{width:26, height:26, marginRight:10}}/>
                                <Text style={{color: Color.textNormal}}>绑定美丽说账号</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <TouchableOpacity style={{...Styles.RowCenterRight,flexDirection:'row'}} activeOpacity={0.8} >
                                    <Text style={{color: Color.LightBlue}}>未绑定</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Content>
            </Container>

        );
    }
}
 const mapStateToProps = (state) => {
     const {user, bindInfo} = state.loginForm;
     return {user, bindInfo};
 };
export default connect(mapStateToProps, {get_bindInfo, get_idcardInfo})(VerifyMain);
