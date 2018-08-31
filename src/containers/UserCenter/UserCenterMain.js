import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, UIManager,Image, View, Text, TouchableOpacity, AsyncStorage} from 'react-native'
import { Container, Content, Button, Footer, FooterTab, Icon} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from "react-native-router-flux/";

class UserCenterMain extends Component {
    state = {selectedTab: 1};
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
        console.log('user main info', props);
    }
    componentDidUpdate() {

    }

    logOut = ()=> {
        AsyncStorage.removeItem('pjinbi_auth_user');
        Actions.auth()
    };

    _renderAvatar = ()=> {
        const {userAvatar} = this.props;
        if(userAvatar==null) {
            return (
                <Image source={{uri: 'http://pjbapi.wtvxin.com'+this.props.user.Avatar}} style={{width: 60, height: 60, borderRadius: 30}} />
            )
        } else {
            return (
                <Image source={{uri: this.props.userAvatar}} style={{width: 60, height: 60, borderRadius: 30}} />
            )
        }

    };

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content >
                    <View style={{flex:1,height: 120}}>
                        <Image source={Images.user_center_back} style={{ flex:1, position: 'absolute',bottom: 0, height: 150, width: '100%'}}/>
                        <View style={{flex:1,flexDirection: 'row', marginHorizontal: 15, marginTop: 20, justifyContent:'center'}}>
                            <View>
                                <TouchableOpacity onPress = {()=>Actions.usercenterinfo()}>
                                    {this._renderAvatar()}
                                    {/*<Image source={{uri: 'http://pjbapi.wtvxin.com'+this.props.user.Avatar}} style={{width: 60, height: 60, borderRadius: 30}} />*/}
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 1, marginLeft: 20, paddingTop: 0}}>
                                <View style={{flex:1}}>
                                    <Text style={{color: 'white', fontSize: Styles.fontSmall}}>ID：{this.props.user.UserId}</Text>
                                    <Text style={{color: 'white', fontSize: Styles.fontSmall}}>用户名：{this.props.user.NickName!==''?this.props.user.NickName:'none' }</Text>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{flex:1}}>
                                            <Text style={{color: 'white', fontSize: Styles.fontSmall, alignSelf: 'flex-start'}}>等级：LO</Text>
                                        </View>
                                        <View style={{flex:1}}>
                                            <Text style={{color: 'white',textDecorationLine: 'underline', fontSize: Styles.fontSmall, alignSelf: 'flex-end'}}>我的夺宝 拷贝</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: -30, marginHorizontal: 15, ...Styles.cardStyleEmpty, borderRadius: 5, paddingVertical: 20}}>
                        <View style={{...Styles.RowCenter}}>
                            <View style={{flex:1, ...Styles.ColumnCenter}}>
                                <Text style={{color: Color.textNormal}}>佣金收益（金）</Text>
                                <Text style={{fontSize: Styles.fontLarge, fontWeight: '600', color: Color.LightBlue1}}>23.50</Text>
                            </View>
                            <View style={{flex:1, ...Styles.ColumnCenter}}>
                                <Text style={{color: Color.textNormal}}>本金总计（元）</Text>
                                <Text style={{fontSize: Styles.fontLarge, fontWeight: '600', color: Color.LightBlue1}}>100.50</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{...Styles.cardStyleEmpty, paddingVertical: 10}}>
                        <View style={{flexDirection: 'row',  paddingBottom: 10, alignItems: 'center'}}>
                            <View style={{flex:1}}>
                                <Text style={{fontSize: Styles.fontSmall, alignSelf: 'flex-start'}}>我的订单</Text>
                            </View>
                            <View style={{flex:1}}>
                                <View style={{flexDirection:'row',alignItems:'center', alignSelf:'flex-end'}}>
                                    <Text style={{fontSize: Styles.fontSmall,color: Color.textLight}}>全部订单 </Text>
                                    <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                                </View>
                            </View>
                        </View>
                        <View style={{...Styles.RowCenter}}>
                            <View style={{flex:1, ...Styles.ColumnCenter}}>
                                <Image source={Images.user_center_icon_02} style={{width: 24, height: 26}}></Image>
                                <Text style={{fontSize: Styles.fontSmaller, color: Color.textLight, marginTop: 5}}>未完成</Text>
                            </View>
                            <View style={{flex:1, ...Styles.ColumnCenter}}>
                                <Image source={Images.user_center_icon_01} style={{width: 25, height: 26}}></Image>
                                <Text style={{fontSize: Styles.fontSmaller, color: Color.textLight, marginTop: 5}}>已完成</Text>
                            </View>
                            <View style={{flex:1, ...Styles.ColumnCenter}}>
                                <Image source={Images.user_center_icon_04} style={{width: 26, height: 26}}></Image>
                                <Text style={{fontSize: Styles.fontSmaller, color: Color.textLight, marginTop: 5}}>已撤销</Text>
                            </View>
                            <View style={{flex:1, ...Styles.ColumnCenter}}>
                                <Image source={Images.user_center_icon_03} style={{width: 23, height: 26}}></Image>
                                <Text style={{fontSize: Styles.fontSmaller, color: Color.textLight, marginTop: 5}}>申诉中</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{...Styles.cardStyleEmpty, paddingVertical: 10}}>
                        <View style={{...Styles.RowCenterLeft, paddingBottom: 10}}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <Image source={Images.user_center_icon_05} style={{width: 18, height: 20}} />
                                <Text style={{marginLeft: 10}}>绑定信息</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                            </View>
                        </View>
                        <View style={{...Styles.RowCenterLeft, paddingBottom: 10}}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <Image source={Images.user_center_icon_06} style={{width: 18, height: 18}} />
                                <Text style={{fontSize: Styles.fontSmall, marginLeft: 10}}>我的VIP</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                            </View>
                        </View>
                        <View style={{...Styles.RowCenterLeft, paddingBottom: 10}}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <Image source={Images.user_center_icon_07} style={{width: 18, height: 18}} />
                                <Text style={{fontSize: Styles.fontSmall, marginLeft: 10}}>申诉中心</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                            </View>
                        </View>
                        <View style={{...Styles.RowCenterLeft, paddingBottom: 10}}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <Image source={Images.user_center_icon_08} style={{width: 18, height: 18}} />
                                <Text style={{fontSize: Styles.fontSmall, marginLeft: 10}}>新手教学</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                            </View>
                        </View>
                        <View style={{...Styles.RowCenterLeft, paddingBottom: 10}}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <Image source={Images.user_center_icon_09} style={{width: 18, height: 18}} />
                                <Text style={{fontSize: Styles.fontSmall, marginLeft: 10}}>版本信息</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                            </View>
                        </View>
                        <View style={{...Styles.RowCenterLeft, paddingBottom: 10}}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <Image source={Images.user_center_icon_10} style={{width: 18, height: 18}} />
                                <Text style={{fontSize: Styles.fontSmall, marginLeft: 10}}>清除缓存</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                            </View>
                        </View>
                    </View>

                    <View style={{...Styles.cardStyleEmpty}}>
                        <Button transparent block onPress={()=>this.logOut()}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontLarge}}>退出登录</Text>
                            <Icon name='log-out' type='Entypo' style={{color: Color.textNormal}}/>
                        </Button>
                    </View>

                </Content>
                <Footer>
                    <FooterTab  style={{flex: 1, flexDirection: 'row',backgroundColor: '#deedff', justifyContent: 'space-around', paddingLeft: 15, paddingRight: 15, alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.home()}>
                                <Image source={Images.homeIcon} style={{width: 26, height: 26}} />
                                <Text style={{fontSize:14, color:Color.textNormal}}>首页</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.totalmissions()}>
                                <Image source={Images.taskIcon} style={{width: 26, height: 26}}/>
                                <Text style={{fontSize:14, color: Color.textNormal}}>全部任务</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{alignItems: 'center' , flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.preordermain()}>
                                <Image source={Images.preorderIcon} style={{width: 26, height: 26}}/>
                                <Text style={{fontSize:14, color:Color.textNormal}}>已接任务 </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <Image source={Images.profileIconActive} style={{width: 26, height: 26}}/>
                            <Text style={{fontSize:14, color:Color.LightBlue1}}>个人中心</Text>
                        </View>
                    </FooterTab>

                </Footer>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {userAvatar} = state.userInfoReducer;
    return {user, userAvatar};
};
export default connect(mapStateToProps, {})(UserCenterMain);
