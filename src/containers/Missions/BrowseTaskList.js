import React, {Component} from 'react';
import {Platform, UIManager, Dimensions, View, Image, TouchableOpacity, PixelRatio, Alert} from 'react-native'
import {connect} from 'react-redux';
import {Button, Container, Content, FooterTab, Text} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import MissionBlock from '../../components/MissionBlock'
import {getTaskList, systemSendTask, initializeStatus} from "../../actions";
import {
    INITIALIZE_SELECTED_TASK_NO,
    INITIALIZE_SYSTEM_SEND_TASK_STATUS,
    INITIALIZE_TASK_LIST_STATUS
} from "../../actions/types";
import {Actions} from "react-native-router-flux";
import Modal from "react-native-modal";
import Spinner1 from "@components";


class BrowseTaskList extends Component {
    state = {isVisibleTaskContentModal: false};
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(this.props.user) {
            const {AccountId, PlatId, MaxAdvancePayMoney} = this.props;
            const {UserId, Token}  = this.props.user;
            this.props.getTaskList(UserId, Token, AccountId, PlatId, MaxAdvancePayMoney, 2);
        }
    }

    _initializeModalStatus = ()=>{
        this.setState({isVisibleTaskContentModal: false});
        this.props.initializeStatus(INITIALIZE_SELECTED_TASK_NO)
    };

    _renderTaskContentModal = () => {
        const fakeTasklist = {
            PlatType: "淘宝任务",
            TaskAcceptNo: "jd18082411471110988855",
            CommissionAvailable: 10,
            OperationCountdown: 120
        };

        return (
            <View style={{flex:1,width: '90%', maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 15 }}>
                <View style={{borderTopLeftRadius:10, borderTopRightRadius: 10, paddingVertical: 10, width: null,...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                    <Text style={{color: 'white', fontSize: Styles.fontNormal}}>来任务啦</Text>
                </View>
                <View style={{flex:1,paddingHorizontal: 10, marginTop: 10}}>
                    <View style={{flexDirection: 'row',  justifyContent: 'space-between', borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.Border, paddingVertical: 10}}>
                        <Text style={{color:Color.textNormal, fontSize: Styles.fontNormal}}>任务类型</Text>
                        <Text style={{color:Color.textInfoOrange, fontSize: Styles.fontNormal}}>{fakeTasklist.PlatType}</Text>
                    </View>
                </View>
                <View style={{flex:1, paddingHorizontal: 10}}>
                    <View style={{...Styles.RowCenterBetween, borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.Border, paddingVertical: 10}}>
                        <Text style={{color:Color.textNormal, fontSize: Styles.fontNormal}}>任务佣金</Text>
                        <Text style={{color:Color.textInfoOrange, fontSize: Styles.fontNormal}}>{(fakeTasklist.CommissionAvailable).toFixed(2)}金币</Text>
                    </View>
                </View>
                <View style={{flex:1, paddingHorizontal: 10}}>
                    <View style={{...Styles.RowCenterBetween, borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.Border, paddingVertical: 10}}>
                        <Text style={{color:Color.textNormal, fontSize: Styles.fontNormal}}>时间限制</Text>
                        <Text style={{color:Color.textInfoOrange, fontSize: Styles.fontNormal}}>{fakeTasklist.CommissionAvailable}分钟</Text>
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
        if(nextProps.selectedTaskNo)
            this.setState({isVisibleTaskContentModal: true});

        if(nextProps.systemTaksObjStatus===false) {
            Alert.alert(
                '失败',
                nextProps.systemTaksObjMsg,
                [
                    {text: 'OK', onPress: () => this.props.initializeStatus(INITIALIZE_SYSTEM_SEND_TASK_STATUS)},
                ],
                {cancelable: false}
            )
        }
    }

    componentWillUnmount() {
        this.props.initializeStatus(INITIALIZE_TASK_LIST_STATUS);
    }

    onRunSystemSendTask = () => {
        if(this.props.user) {
            const {AccountId, PlatId} = this.props;
            const {UserId, Token}  = this.props.user;
            this.props.systemSendTask(UserId, Token, AccountId, PlatId, 0, 2);
        }
    };

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginBottom: 10}}>
                    <MissionBlock point={21.35} goldValue={16.35} id={435354789230457432735} taskType={2} completed={false}/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} taskType={2} completed={false}/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} taskType={2} completed={false}/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} taskType={2} completed={false}/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} taskType={2} completed={false}/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} taskType={2} completed={false}/>

                    <Modal  isVisible={this.state.isVisibleTaskContentModal} style={{...Styles.ColumnCenter}}>
                        {this._renderTaskContentModal()}
                    </Modal>
                </Content>
                {this.props.systemTaksObjLoading && (
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
                            <Text style={{fontSize:Styles.fontSmall,color: 'white'}}>派单中</Text>
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
        systemTaksObjStatus,systemTaksObjMsg
    } = state.taskReducer;
    return {user,taskListsObj,taskListsObjMsg,taskListsObjSuccessed, selectedTaskNo,
        systemTaksObjStatus,systemTaksObjMsg};
};

export default connect(mapStateToProps, {getTaskList, systemSendTask, initializeStatus})(BrowseTaskList);

