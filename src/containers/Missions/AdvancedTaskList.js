import React, {Component} from 'react';
import {Platform, UIManager, Dimensions, View, Image, TouchableOpacity, PixelRatio, Alert} from 'react-native'
import {connect} from 'react-redux';
import {Button, Container, Content, FooterTab, Text, Toast} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import MissionBlock from '../../components/MissionBlock'
import {getTaskList, systemSendTask, initializeStatus, UserDetermineTask } from "../../actions";
import {
    INITIALIZE_SYSTEM_SEND_TASK_STATUS,
    INITIALIZE_TASK_LIST_STATUS, INITIALIZE_USER_DETERMINE_TASK_STATUS
} from "../../actions/types";
import {Actions} from "react-native-router-flux";
import Modal from "react-native-modal";
import Spinner1 from "@components";


class AdvancedTaskList extends Component {
    state = {isVisibleTaskContentModal: false};
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(this.props.user) {
            const {AccountId, PlatId, MaxAdvancePayMoney} = this.props;
            const {UserId, Token}  = this.props.user;

            this.props.getTaskList(UserId, Token, AccountId, PlatId, MaxAdvancePayMoney, 1);
        }
    }

    _initializeModalStatus = ()=>{
        this.setState({isVisibleTaskContentModal: false});
        this.props.initializeStatus(INITIALIZE_USER_DETERMINE_TASK_STATUS);
        Actions.advancedTaskList({task_step: 1});
    };

    _renderTaskContentModal = () => {
        if(!this.props.taskObj)
            return (<View></View>);

        const {taskObj} = this.props;


        return (
            <View style={{flex:1,width: '90%', maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 15 }}>
                <View style={{borderTopLeftRadius:10, borderTopRightRadius: 10, paddingVertical: 10, width: null,...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                    <Text style={{color: 'white', fontSize: Styles.fontNormal}}>来任务啦</Text>
                </View>
                <View style={{flex:1,paddingHorizontal: 10, marginTop: 10}}>
                    <View style={{flexDirection: 'row',  justifyContent: 'space-between', borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.Border, paddingVertical: 10}}>
                        <Text style={{color:Color.textNormal, fontSize: Styles.fontNormal}}>任务类型</Text>
                        <Text style={{color:Color.textInfoOrange, fontSize: Styles.fontNormal}}>{taskObj.PlatType}</Text>
                    </View>
                </View>
                <View style={{flex:1, paddingHorizontal: 10}}>
                    <View style={{...Styles.RowCenterBetween, borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.Border, paddingVertical: 10}}>
                        <Text style={{color:Color.textNormal, fontSize: Styles.fontNormal}}>任务佣金</Text>
                        <Text style={{color:Color.textInfoOrange, fontSize: Styles.fontNormal}}>{(taskObj.AdvancePaymentMoney).toFixed(2)}元</Text>
                    </View>
                </View>
                <View style={{flex:1, paddingHorizontal: 10}}>
                    <View style={{...Styles.RowCenterBetween, borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.Border, paddingVertical: 10}}>
                        <Text style={{color:Color.textNormal, fontSize: Styles.fontNormal}}>任务佣金</Text>
                        <Text style={{color:Color.textInfoOrange, fontSize: Styles.fontNormal}}>{(taskObj.TaskCommission).toFixed(2)}金币</Text>
                    </View>
                </View>
                <View style={{flex:1, paddingHorizontal: 10}}>
                    <View style={{...Styles.RowCenterBetween, borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.Border, paddingVertical: 10}}>
                        <Text style={{color:Color.textNormal, fontSize: Styles.fontNormal}}>时间限制</Text>
                        <Text style={{color:Color.textInfoOrange, fontSize: Styles.fontNormal}}>{taskObj.OperationCountdown}分钟</Text>
                    </View>
                </View>

                <View style={{flex:1, ...Styles.ColumnCenter, marginTop: 20}}>
                    <Button small style={{alignSelf: 'center', paddingHorizontal: 20, backgroundColor: Color.LightBlue1}} onPress={()=>this._initializeModalStatus()}>
                        <Text style={{fontSize: Styles.fontNormal,color: 'white'}}>确认</Text>
                    </Button>
                </View>
            </View>
        )
    };
    componentDidUpdate() {
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.systemTaskObjStatus!==null && nextProps.systemTaskObjStatus===false) {
            Alert.alert(
                '失败',
                nextProps.systemTaskObjMsg,
                [
                    {text: 'OK', onPress: () => this.props.initializeStatus(INITIALIZE_SYSTEM_SEND_TASK_STATUS)},
                ],
                {cancelable: false}
            )
        }

        if(nextProps.taskObjStatus!==null && nextProps.taskObjStatus) {
            this.setState({isVisibleTaskContentModal: true});
        }

        if(nextProps.taskObjStatus!==null && nextProps.taskObjStatus===false) {
            Alert.alert(
                '失败',
                nextProps.taskObjMsg,
                [
                    {text: 'OK', onPress: () => this.props.initializeStatus(INITIALIZE_USER_DETERMINE_TASK_STATUS)},
                ],
                {cancelable: false}
            )
        }

        if(nextProps.taskListsObjSuccessed && nextProps.taskListsObj.TaskList.length===0) {
            Toast.show({
                text: 'No task list at this moment',
                buttonText: "是",
                type: "success",
                duration: 2000
            });
            this.props.initializeStatus(INITIALIZE_TASK_LIST_STATUS);
        }
    }

    componentWillUnmount() {
        this.props.initializeStatus(INITIALIZE_TASK_LIST_STATUS);
    }

    onRunSystemSendTask = () => {
        if(this.props.user) {
            const {AccountId, PlatId, MaxAdvancePayMoney} = this.props;
            const {UserId, Token}  = this.props.user;
            this.props.systemSendTask(UserId, Token, AccountId, PlatId, MaxAdvancePayMoney, 1);
        }
    };
    _onGetAdvancedTaskDetail = (taskNo)=>{ //(UserId, Token, AccountId, TaskListNo)
        const {UserId, Token}  = this.props.user;

        this.props.UserDetermineTask(UserId, Token, this.props.AccountId, taskNo)
    };


    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginBottom: 10}}>
                    {this.props.taskListsObj && this.props.taskListsObj.TaskList.map(task=>{
                        return (
                            <MissionBlock onPress={()=>this._onGetAdvancedTaskDetail(task.TaskListNo)} key={task.TaskListNo} point={task.CommissionAvailable} goldValue={task.AdvancePaymentMoney} id={task.TaskListNo} taskType={2} completed={false}/>
                        )
                    })}
                    <Modal  isVisible={this.state.isVisibleTaskContentModal} style={{...Styles.ColumnCenter}}>
                        {this._renderTaskContentModal()}
                    </Modal>
                </Content>
                {this.props.systemTaskObjLoading && (
                    <Spinner1 mode={'overlay'}/>
                )}
                <View style={{height: 60}}>
                    <FooterTab  style={{flex: 1, flexDirection: 'row',backgroundColor: '#deedff', justifyContent: 'space-around', paddingLeft: 15, paddingRight: 15, alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.home()}>
                                <Image source={Images.homeIcon} style={{width: 26, height: 26}} />
                                <Text style={{fontSize:14, color:Color.textNormal}}>首页</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}}>
                                <Image source={Images.taskIconActive} style={{width: 26, height: 26}}/>
                                <Text style={{fontSize:14, color: Color.LightBlue1}}>全部任务</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center' , flex: 1}}>
                        </View>
                        <View  style={{alignItems: 'center' , flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.myorders()}>
                                <Image source={Images.preorderIcon} style={{width: 26, height: 26}}/>
                                <Text style={{fontSize:14, color:Color.textNormal}}>已接任务 </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignItems: 'center', flex: 1}}>
                            <TouchableOpacity block style={{alignItems: 'center', paddingHorizontal: 0}} onPress={()=>Actions.usercentermain({user: this.props.user})}>
                                <Image source={Images.profileIcon} style={{width: 26, height: 26}} />
                                <Text style={{fontSize:14, color:Color.textNormal}}>个人中心</Text>
                            </TouchableOpacity>
                        </View>
                    </FooterTab>
                </View>
                <View style={{alignSelf: 'center', position: 'absolute', width: 60,bottom: 25, zIndex: 99999}} >
                    <View style={styles.footerCenterStyle}>
                        <TouchableOpacity  activeOpacity={.8}
                                           onPress={()=>this.onRunSystemSendTask()}
                                           style={{backgroundColor: Color.LightBlue, width: 50, height: 50, borderRadius: 25, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{fontSize:Styles.fontSmall,color: 'white'}}>接单</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = {
    moneyStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 0,
        shadowColor: Color.LightBlue,
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    footerCenterStyle:{
        backgroundColor: '#fff',
        width: 54,
        height: 54,
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    }
};
const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {taskListsObj,taskListsObjMsg,taskListsObjSuccessed, selectedTaskNo,
        systemTaskObjStatus,systemTaskObjMsg
    } = state.taskReducer;
    return {user,taskListsObj,taskListsObjMsg,taskListsObjSuccessed, selectedTaskNo,
        systemTaskObjStatus,systemTaskObjMsg};
};

export default connect(mapStateToProps, {getTaskList, systemSendTask, initializeStatus, UserDetermineTask })(AdvancedTaskList);

