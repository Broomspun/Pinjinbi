import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, UIManager,Image, View, Text, TouchableOpacity, PixelRatio} from 'react-native'
import { Container, Content, Button, Icon} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';

import {walletList} from './../../../actions'


class WalletList extends Component {

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        const {UserId, Token} = this.props.user;

        this.props.walletList(this.props.user, UserId, Token);
    }
    componentDidUpdate() {

    }

    componentWillReceiveProps(nextProps){
    }

    _renderWalletList = ()=> {

        const {wallets} = this.props.user;
        if(!wallets) return;

        if(wallets.RecordDetail.length===0) {
            return (
                <View style={{flex: 1, ...Styles.ColumnCenter, height: Styles.height - 300}}>
                    <View style={{...Styles.ColumnCenter}}>
                        <Image source={Images.commision_empty_icon} style={{width: 60, height: 60}}/>
                        <Text style={{marginTop: 15, alignSelf: 'center', color: Color.textLight}}>暂时没有相关数据</Text>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{...Styles.RowBottomBetween, paddingVertical: 10, borderBottomColor: Color.Border, borderBottomWidth: 1/PixelRatio.get()}}>
                    <View style={{flex:1}}>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>系统自动取消任务处理</Text>
                        <Text style={{color: Color.textLight, fontSize: Styles.fontSmall}}>2018-07-25 13:05:23</Text>
                    </View>
                    <View style={{flex:1,justifyContent: 'flex-end',alignItems: 'flex-end'}}>
                        <Text style={{color:Color.lightOrangeColor,fontSize: Styles.fontNormal}}>-2.00</Text>
                    </View>
                </View>
            )
        }
    };

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content >
                    {this.props.user.wallets && (
                        <View>
                            <View style={{backgroundColor: Color.lightOrangeColor, paddingVertical: 10, marginTop: 10, paddingHorizontal: 15}}>
                                <Text style={{color: 'white', fontSize: Styles.fontNormal}}>可提现本金</Text>
                                <View style={{...Styles.RowCenterLeft}}>
                                    <Text style={{color: 'white',fontSize: Styles.fontNormal, fontWeight: '600'}}>{this.props.user.wallets.Amount}</Text>
                                    <Text style={{color: 'white',fontSize: Styles.fontNormal}}>金</Text>
                                </View>
                            </View>
                            <View style={{backgroundColor: Color.GrayColor, paddingVertical: 10, marginVertical: 10, paddingHorizontal: 15}}>
                                <Text style={{color: 'white', fontSize: Styles.fontNormal}}>已冻结本金</Text>
                                <View style={{...Styles.RowCenterLeft}}>
                                    <Text style={{color: 'white',fontSize: Styles.fontNormal, fontWeight: '600'}}>{this.props.user.wallets.FrozenAmount}</Text>
                                    <Text style={{color: 'white',fontSize: Styles.fontNormal}}>金</Text>
                                </View>
                            </View>
                        </View>
                    )}
                    <View style={{backgroundColor:'white', paddingHorizontal: 10}}>
                        <View style={{...Styles.RowCenterBetween, paddingVertical: 10, borderBottomColor: Color.Border, borderBottomWidth: 1/PixelRatio.get()}}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>本月</Text>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>明细</Text>
                        </View>

                        {/* Commission List*/}
                        {this._renderWalletList()}
                    </View>

                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    return {user};
};
export default connect(mapStateToProps, {walletList})(WalletList);
