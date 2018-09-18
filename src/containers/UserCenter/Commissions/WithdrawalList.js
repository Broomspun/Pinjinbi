import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, UIManager,Image, View, Text, TouchableOpacity, PixelRatio} from 'react-native'
import { Container, Content, Button, Icon} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from "react-native-router-flux/";
import {commissionList} from './../../../actions'


class WithdrawalList extends Component {

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        console.log('withdrawalList', this.props);
    }
    componentDidMount() {
        if(this.props.user && this.props.walletType===0) {
            Actions.withdrawallist({title: '本金提现记录'});
        }
    }
    componentWillMount(){

    }

    componentWillReceiveProps(nextProps){
    }

    _renderWithdrawallList = ()=> {

           return (
                <View>
                    <View style={{...Styles.RowCenterBetween, paddingVertical: 10, borderBottomColor: Color.Border, borderBottomWidth: 1/PixelRatio.get()}}>
                        <View style={{flex:1}}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>任务佣金提现</Text>
                            <Text style={{color: Color.textLight, fontSize: Styles.fontSmall}}>2018-07-25 13:05:23</Text>
                        </View>
                        <View style={{flex:1,...Styles.ColumnCenterRight}}>
                            <Text style={{color:Color.LightBlue1,fontSize: Styles.fontNormal}}>+68.00</Text>
                        </View>
                    </View>
                    <View style={{...Styles.RowCenterBetween, paddingVertical: 10, borderBottomColor: Color.Border, borderBottomWidth: 1/PixelRatio.get()}}>
                        <View style={{flex:1}}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>任务佣金提现</Text>
                            <Text style={{color: Color.textLight, fontSize: Styles.fontSmall}}>2018-07-25 13:05:23</Text>
                        </View>
                        <View style={{flex:1,justifyContent: 'flex-end',alignItems: 'flex-end'}}>
                            <Text style={{color:Color.lightOrangeColor,fontSize: Styles.fontNormal}}>-68.00</Text>
                        </View>
                    </View>
                </View>
            )
    };

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content >
                    <View style={{backgroundColor:'white', paddingHorizontal: 15, marginTop: 10}}>
                        {/* Withdrawal List*/}
                        {this._renderWithdrawallList()}
                    </View>

                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    const {user, walletType} = state.loginForm;
    return {user, walletType};
};
export default connect(mapStateToProps, {})(WithdrawalList);
