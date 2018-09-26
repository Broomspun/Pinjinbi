import React, {Component} from 'react';
import {Platform, UIManager, View, Image, TouchableOpacity} from 'react-native'
import { Button, Text} from 'native-base';
import {connect} from 'react-redux';
import {Images, Constants, Color, Styles} from '@common';
import {RowLeftRightBlock} from '@components';
import {getMemberTaskList, getPlatformLists, initializeStatus} from "../../../../actions";
import {Actions} from "react-native-router-flux";

class AdvancedTab1 extends Component{
    constructor(props) {
        super(props);
        this.state = {obj: null};
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(this.props.user) {
            const {UserId, Token} = this.props.user;
            this.props.getMemberTaskList(UserId, Token, 1, 20, 1, 1);
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.getMemberTaskListObj && this.state.obj===null) {
            this.setState({obj: nextProps.getMemberTaskListObj})

        }
    }
    _renderContent (){
        if(this.state.obj===null || (this.state.obj && this.state.obj.AcceptTaskList.length===0))
            return (
                <View style={{flex: 1, ...Styles.ColumnCenter, height: Styles.height - 100}}>
                    <View style={{...Styles.ColumnCenter}}>
                        <Image source={Images.commision_empty_icon} style={{width: 60, height: 60}}/>
                        <Text style={{marginTop: 15, alignSelf: 'center', color: Color.textLight}}>No any task list</Text>
                    </View>
                </View>);

        let contents = null;
        if(this.state.obj && this.state.obj.AcceptTaskList.length>0) {
            contents = this.state.obj.AcceptTaskList.map((order, index)=>{
                return (
                    <TouchableOpacity key={index} style={{backgroundColor: Color.LightGrayColor}} onPress={()=>Actions.acceptedAdvancedTask({TaskAcceptNo: order.TaskAcceptNo})}>
                        <View style={{...Styles.basicStyle,marginBottom: 10, ...Styles.shadowStyle}}>
                            <View style={{ flexDirection: 'row', flex:1, justifyContent:'space-around', alignItems: 'center',borderBottomWidth:1, borderColor: Color.LightBorder, paddingBottom: 10}}>
                                <View style={{flex:1, flexDirection:'row', ...Styles.RowCenterLeft}}>
                                    <Image source={Images.product} style={{ height: 80, width: 80, marginRight:10}}/>
                                    <View style={{flex:1, alignItems: 'flex-start',justifyContent: 'space-between'}}>
                                        <Text style={{flex: 1, flexWrap: 'wrap',color: Color.textNormal, fontSize:Styles.fontSmall}}>{order.ProductName}</Text>
                                        <Text style={{flex: 1, color: Color.orangeColor, fontSize:Styles.fontSmall}}>{order.GetCommission}</Text>
                                        <RowLeftRightBlock leftTitle='最爱打法师' rightTitle={order.AcceptTaskTime.substring(0,10)}
                                                           l_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                                           r_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            })
            return contents;
        }
    }

    render() {

        return (
            <View>
                {this._renderContent()}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {getMemberTaskListObj, getMemberTaskListStatus, getMemberTaskListMsg,} = state.taskReducer;
    const { OrderStatusType} = state.orderStatusReducer;
    return {user, getMemberTaskListObj, getMemberTaskListStatus, getMemberTaskListMsg,OrderStatusType};
};
export default connect(mapStateToProps, {getPlatformLists, getMemberTaskList, initializeStatus})(AdvancedTab1);
