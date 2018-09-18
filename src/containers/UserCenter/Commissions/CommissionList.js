import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, UIManager,Image, View, Text, TouchableOpacity, PixelRatio, FlatList} from 'react-native'
import { Container, Content, Button, Icon} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from "react-native-router-flux/";
import {commissionList} from './../../../actions'


class CommissionList extends Component {

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
        const {UserId, Token} = this.props.user;

        (async ()=> await this.props.commissionList(this.props.user, UserId, Token))();
    }


    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }

    _renderCommissionRow = (record)=>{
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

    _renderCommissionList = ()=> {
        if(this.props.user && this.props.user.commissions) {

            const {commissions} = this.props.user;
            if (!commissions) return;

            if (commissions.RecordDetail.length === 0) {
                return (
                    <View style={{flex: 1, ...Styles.ColumnCenter, height: Styles.height - 250}}>
                        <View style={{...Styles.ColumnCenter}}>
                            <Image source={Images.commision_empty_icon} style={{width: 60, height: 60}}/>
                            <Text style={{marginTop: 15, alignSelf: 'center', color: Color.textLight}}>暂时没有相关数据</Text>
                        </View>
                    </View>
                )
            }
            else {
                return (
                    <FlatList
                        data= {commissions.RecordDetail}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem = {this._renderCommissionRow}
                    />
                )
            }
        }
    };

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content >
                    {this.props.user.commissions && (
                        <View style={{backgroundColor: Color.lightOrangeColor, paddingVertical: 10, marginVertical: 10, paddingHorizontal: 15}}>
                            <Text style={{color: 'white', fontSize: Styles.fontNormal}}>累计佣金（金）</Text>
                            <View style={{...Styles.RowCenterLeft}}>
                                <Text style={{color: 'white',fontSize: Styles.fontNormal, fontWeight: '600'}}>{parseFloat(this.props.user.Amount).toFixed(2) || 0.00}</Text>
                                <Text style={{color: 'white',fontSize: Styles.fontNormal}}>金</Text>
                            </View>
                        </View>
                    )}
                    <View style={{backgroundColor:'white', paddingHorizontal: 10}}>
                        <View style={{...Styles.RowCenterBetween, paddingVertical: 10, borderBottomColor: Color.Border, borderBottomWidth: 1/PixelRatio.get()}}>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>本月</Text>
                            <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>明细</Text>
                        </View>

                        {/* Commission List*/}
                        {this._renderCommissionList()}
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
export default connect(mapStateToProps, {commissionList})(CommissionList);
