import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, UIManager,Image, View, Text, TouchableOpacity, PixelRatio} from 'react-native'
import { Container, Content, Button, Footer, FooterTab, Icon} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from "react-native-router-flux/";
import Modal from "react-native-modal";

import {logout, setWalletType, getMyOrdersSummary} from './../../actions'
class UserCenterMain extends Component {
    state = {
        bShowVersionInfo: false,
        bClearCache: false,
        bShowLogoutModal: false
    };
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(this.props.user) {
            const {UserId, Token} = this.props.user;

            if(this.props.taskSummaryObj===null)
                this.props.getMyOrdersSummary(UserId, Token);
        }
        console.log('user main info', props);
    }
    componentDidUpdate() {

    }

    logOut = async ()=> {
        await this.props.logout();
    };
    onShowVersionInfo() {

    }

    onClearCache() {

    }

    componentWillUnmount(){
        this.setState({bShowLogoutModal: false});
    }

    _renderVersionInfo = () => {
        return (
            <View style={{width: '100%',marginHorizontal: 15, maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 30 }}>
                <View style={{borderTopLeftRadius:10, height: 60,borderTopRightRadius: 10, ...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                    <Text style={{color: 'white', fontSize: Styles.fontLarge}}>是否重新安装？</Text>
                </View>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30,}}>
                    <View style={{paddingVertical: 30}}>
                        <Text style={{alignSelf: 'center',color:Color.textNormal, fontSize: Styles.fontNormal}}>当前已经是最新版本</Text>
                    </View>
                </View>
                <View style={{ flexDirection:'row',justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
                    <Button onPress={()=>this.setState({bShowVersionInfo: false})}
                            style={{paddingHorizontal: 20, marginRight: 20, backgroundColor:'#ededed', borderColor: Color.LightBorder, borderWidth: 1/PixelRatio.get()}}>
                        <Text style={{fontSize: Styles.fontLarge,color: Color.textNormal}}>取消</Text>
                    </Button>
                    <Button style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue}} onPress={this.onShowVersionInfo.bind(this)}>
                        <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                    </Button>
                </View>
            </View>

        )
    };

    _renderClearCache = () => {
        return (
            <View style={{width: '100%',marginHorizontal: 15, maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 30 }}>
                <View style={{borderTopLeftRadius:10, height: 60,borderTopRightRadius: 10, ...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                    <Text style={{color: 'white', fontSize: Styles.fontLarge}}>温馨提示</Text>
                </View>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 15,}}>
                    <View style={{paddingVertical: 20}}>
                        <Text style={{alignSelf: 'center',color:Color.textNormal, fontSize: Styles.fontNormal}}>清缓存后会重启应用，确认清缓存吗？</Text>
                    </View>
                </View>
                <View style={{ flexDirection:'row',justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <Button onPress={()=>this.setState({bClearCache: false})}
                            style={{paddingHorizontal: 20, marginRight: 20, backgroundColor:'#ededed', borderColor: Color.LightBorder, borderWidth: 1/PixelRatio.get()}}>
                        <Text style={{fontSize: Styles.fontLarge,color: Color.textNormal}}>取消</Text>
                    </Button>
                    <Button style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue}} onPress={this.onClearCache.bind(this)}>
                        <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                    </Button>
                </View>
            </View>

        )
    };

    _renderLogoutModal = () => {
        return (
            <View style={{width: '100%',marginHorizontal: 15, maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 30 }}>
                <View style={{borderTopLeftRadius:10, height: 60,borderTopRightRadius: 10, ...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                    <Text style={{color: 'white', fontSize: Styles.fontLarge}}>系统提示</Text>
                </View>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 15,}}>
                    <View style={{paddingVertical: 20}}>
                        <Text style={{alignSelf: 'center',color:Color.textNormal, fontSize: Styles.fontNormal}}>确定退出</Text>
                    </View>
                </View>
                <View style={{ flexDirection:'row',justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <Button onPress={()=>this.setState({bShowLogoutModal: false})}
                            style={{paddingHorizontal: 20, marginRight: 20, backgroundColor:'#ededed', borderColor: Color.LightBorder, borderWidth: 1/PixelRatio.get()}}>
                        <Text style={{fontSize: Styles.fontLarge,color: Color.textNormal}}>取消</Text>
                    </Button>
                    <Button style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue}} onPress={()=>this.logOut()}>
                        <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                    </Button>
                </View>
            </View>

        )
    };

    _renderAvatar = ()=> {
        if(this.props.user) {
            const {Avatar} = this.props.user;
            if (this.props.user && this.props.user.Avatar !== '') {
                return (
                    <Image source={{uri: 'http://pjb.wtvxin.com' + this.props.user.Avatar}}
                           style={{width: 60, height: 60, borderRadius: 30}}/>
                )
            }
            else
                return (
                    <Image source={Images.user_center_avatar} style={{width: 60, height: 60, borderRadius: 30}}/>
                )
        }
    };

    _renderTasks = ()=> {
        if(this.props.user && this.props.taskSummaryObj ) {
            const {AdvanceCompleted,AdvanceUndone, AdvanceRevoked, AdvanceAppeal} = this.props.taskSummaryObj;
            const {BrowseCompleted,BrowseUndone, BrowseRevoked, BrowseAppeal} = this.props.taskSummaryObj;
            return (
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
                            <View style={{position: 'relative'}}>
                                <TouchableOpacity onPress={()=>Actions.myorders()}>
                                    <Image source={Images.user_center_icon_02} style={{width: 24, height: 26}}></Image>
                                </TouchableOpacity>
                                {BrowseUndone>0 && (
                                    <View style={{position: 'absolute', width: 16, height: 16, backgroundColor: Color.orangeColor, ...Styles.ColumnCenter, right: -6, top:-6, borderRadius: 10}}>

                                        <Text style={{color: 'white', fontSize: 12}}>{BrowseUndone}</Text>

                                    </View>
                                )}
                            </View>
                            <Text style={{fontSize: Styles.fontSmaller, color: Color.textLight, marginTop: 5}}>未完成</Text>
                        </View>
                        <View style={{flex:1, ...Styles.ColumnCenter}}>
                            <Image source={Images.user_center_icon_01} style={{width: 25, height: 26}}></Image>
                            {BrowseCompleted>0 && (
                                <View style={{position: 'absolute', width: 16, height: 16, backgroundColor: Color.orangeColor, ...Styles.ColumnCenter, right: -6, top:-6, borderRadius: 10}}>

                                    <Text style={{color: 'white', fontSize: 12}}>{BrowseCompleted}</Text>

                                </View>
                            )}
                                <Text style={{fontSize: Styles.fontSmaller, color: Color.textLight, marginTop: 5}}>已完成</Text>
                        </View>
                        <View style={{flex:1, ...Styles.ColumnCenter}}>
                            <View style={{position: 'relative'}}>
                                <Image source={Images.user_center_icon_04} style={{width: 26, height: 26}}></Image>
                                {BrowseRevoked>0 && (
                                    <View style={{position: 'absolute', width: 16, height: 16, backgroundColor: Color.orangeColor, ...Styles.ColumnCenter, right: -6, top:-6, borderRadius: 10}}>

                                        <Text style={{color: 'white', fontSize: 12}}>{BrowseRevoked}</Text>

                                    </View>
                                )}
                                <Text style={{fontSize: Styles.fontSmaller, color: Color.textLight, marginTop: 5}}>已撤销</Text>
                            </View>
                        </View>
                        <View style={{flex:1, ...Styles.ColumnCenter}}>
                            <Image source={Images.user_center_icon_03} style={{width: 23, height: 26}}></Image>
                            {BrowseAppeal>0 && (
                                <View style={{position: 'absolute', width: 16, height: 16, backgroundColor: Color.orangeColor, ...Styles.ColumnCenter, right: -6, top:-6, borderRadius: 10}}>

                                    <Text style={{color: 'white', fontSize: 12}}>{BrowseAppeal}</Text>

                                </View>
                            )}
                            <Text style={{fontSize: Styles.fontSmaller, color: Color.textLight, marginTop: 5}}>申诉中</Text>
                        </View>
                    </View>

                </View>
            )
        }

    };

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content >
                    <Modal  isVisible={this.state.bShowVersionInfo} style={{...Styles.ColumnCenter}}>
                        {this._renderVersionInfo()}
                    </Modal>
                    <Modal  isVisible={this.state.bClearCache} style={{...Styles.ColumnCenter}}>
                        {this._renderClearCache()}
                    </Modal>
                    <Modal  isVisible={this.state.bShowLogoutModal} style={{...Styles.ColumnCenter}}>
                        {this._renderLogoutModal()}
                    </Modal>
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
                                    <Text style={{color: 'white', fontSize: Styles.fontSmall}}>ID：{this.props.user?this.props.user.UserId:''}</Text>
                                    <Text style={{color: 'white', fontSize: Styles.fontSmall}}>用户名：{this.props.user && this.props.user.NickName!==''? this.props.user.NickName:'none' }</Text>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{flex:1}}>
                                            <Text style={{color: 'white', fontSize: Styles.fontSmall, alignSelf: 'flex-start'}}>等级：LO</Text>
                                        </View>
                                        <TouchableOpacity style={{flex:1}} onPress={()=>Actions.rules()}>
                                            <Text style={{color: 'white',textDecorationLine: 'underline', fontSize: Styles.fontSmall, alignSelf: 'flex-end'}}>查看等级规则</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {this.props.user && (
                        <View style={{marginTop: -30, marginHorizontal: 15, ...Styles.cardStyleEmpty, borderRadius: 5, paddingVertical: 20}}>
                            <View style={{...Styles.RowCenter}}>
                                <TouchableOpacity style={{flex:1, ...Styles.ColumnCenter, borderRightWidth: 1/PixelRatio.get(), borderRightColor: Color.textLight}} onPress={()=>{this.props.setWalletType(1);Actions.commissionlist()}}>
                                    <Text style={{color: Color.textNormal}}>佣金收益（金）</Text>
                                    <Text style={{fontSize: Styles.fontLarge, fontWeight: '600', color: Color.LightBlue1}}>{this.props.user.Amount}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1, ...Styles.ColumnCenter}} onPress={()=>{this.props.setWalletType(0);Actions.walletlist()}}>
                                    <Text style={{color: Color.textNormal}}>本金总计（元）</Text>
                                    <Text style={{fontSize: Styles.fontLarge, fontWeight: '600', color: Color.LightBlue1}}>{this.props.user.Wallet}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {this._renderTasks()}
                    <View style={{...Styles.cardStyleEmpty, paddingVertical: 10}}>
                        <TouchableOpacity style={{...Styles.RowCenterLeft, paddingBottom: 10}} onPress={()=>Actions.verifymain()}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <Image source={Images.user_center_icon_05} style={{width: 18, height: 20}} />
                                <Text style={{marginLeft: 10}}>绑定信息</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...Styles.RowCenterLeft, paddingBottom: 10}} onPress={()=>Actions.vipMain()}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <Image source={Images.user_center_icon_06} style={{width: 18, height: 18}} />
                                <Text style={{fontSize: Styles.fontSmall, marginLeft: 10}}>我的VIP</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...Styles.RowCenterLeft, paddingBottom: 10}} onPress={()=>Actions.appealsList()}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <Image source={Images.user_center_icon_07} style={{width: 18, height: 18}} />
                                <Text style={{fontSize: Styles.fontSmall, marginLeft: 10}}>申诉中心</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...Styles.RowCenterLeft, paddingBottom: 10}} onPress={()=>Actions.BeginnersMain()}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <Image source={Images.user_center_icon_08} style={{width: 18, height: 18}} />
                                <Text style={{fontSize: Styles.fontSmall, marginLeft: 10}}>新手教学</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...Styles.RowCenterLeft, paddingBottom: 10}} onPress={()=>{this.setState({bShowVersionInfo: true})}}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <Image source={Images.user_center_icon_09} style={{width: 18, height: 18}} />
                                <Text style={{fontSize: Styles.fontSmall, marginLeft: 10}}>版本信息</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...Styles.RowCenterLeft, paddingBottom: 10}} onPress={()=>this.setState({bClearCache: true})}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <Image source={Images.user_center_icon_10} style={{width: 18, height: 18}} />
                                <Text style={{fontSize: Styles.fontSmall, marginLeft: 10}}>清除缓存</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{...Styles.cardStyleEmpty}}>
                        <Button transparent block onPress={()=>this.setState({bShowLogoutModal: true})}>
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
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.totalmissions({taskType: 1})}>
                                <Image source={Images.taskIcon} style={{width: 26, height: 26}}/>
                                <Text style={{fontSize:14, color: Color.textNormal}}>全部任务</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{alignItems: 'center' , flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.myorders()}>
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
    const {user,walletType} = state.loginForm;
    const {taskSummaryObj} = state.taskReducer;
    return {user,walletType, taskSummaryObj};
};
export default connect(mapStateToProps, {logout, setWalletType, getMyOrdersSummary})(UserCenterMain);
