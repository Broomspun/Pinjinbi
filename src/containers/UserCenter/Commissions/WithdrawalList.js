import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, UIManager, View, Text, PixelRatio, FlatList, Image} from 'react-native'
import { Container, Content, } from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from "react-native-router-flux/";
import { getWithdrawalLogs } from '@actions'

class WithdrawalList extends Component {

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(this.props.user){
            console.log('withdrawalList', this.props);
            const {UserId, Token} = this.props.user;
            this.props.getWithdrawalLogs(UserId, Token, this.props.walletType);
        }
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

    _renderLogRow = (record)=>{
        return (
            <View style={{
                ...Styles.RowBottomBetween,
                paddingVertical: 10,
                borderBottomColor: Color.Border,
                borderBottomWidth: 1 / PixelRatio.get()
            }}>
                <View style={{flex: 1}}>
                    <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>{record.item.Remark}</Text>
                    <Text style={{color: Color.textLight, fontSize: Styles.fontSmall}}>{record.item.AddTime.substring(0,10)+' '+record.item.AddTime.substring(11,19)}</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    <Text style={{color: record.item.Change>0 ? Color.LightBlue:Color.lightOrangeColor, fontSize: Styles.fontNormal}}>{record.item.Change>0?'+':''}{record.item.Change.toFixed(2)}</Text>
                </View>
            </View>
        )
    };

    _renderWithdrawallList = ()=> {
        if(this.props.user && this.props.withdrawalLogsObj && this.props.withdrawalLogsObj.WithdrawList.length>0) {
            const {WithdrawList} = this.props.withdrawalLogsObj;
            return (
                <FlatList
                    data= {WithdrawList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem = {this._renderLogRow}
                />
            )
        }
        else {
            return (
                <View style={{flex: 1, ...Styles.ColumnCenter, height: Styles.height-100}}>
                    <View style={{...Styles.ColumnCenter}}>
                        <Image source={Images.commision_empty_icon} style={{width: 60, height: 60}}/>
                        <Text style={{marginTop: 15, alignSelf: 'center', color: Color.textLight}}>暂时没有相关数据</Text>
                    </View>
                </View>
            )
        }

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
    const {user, walletType,
        withdrawalLogsObj, withdrawalLogsMsg, bWithdrawalLogs,
    } = state.loginForm;

    return {user, walletType,
        withdrawalLogsObj, withdrawalLogsMsg, bWithdrawalLogs,
    };
};
export default connect(mapStateToProps, {getWithdrawalLogs})(WithdrawalList);
