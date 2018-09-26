import React, {Component} from 'react';
import {Platform, UIManager, View, Image, TouchableOpacity, Alert, PixelRatio} from 'react-native'
import {connect} from 'react-redux';
import Modal from "react-native-modal";
import {Button, Container, Content, Text, Textarea} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {initializeStatus, cancelTask, getMyOrdersSummary} from "../../actions";

import Timer from 'react-timer-mixin';
import {Actions} from "react-native-router-flux";
import {
    INITIALIZE_CANCEL_TASK_STATUS,
} from "../../actions/types";

class CancelTask extends Component {

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        this.state = {TaskCancelReasons:'', bShowSubmitCancelModal: false, bShowSubmitStatusModal: false
        };

        console.log(props);
    }

    componentDidUpdate() {
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.cancelTaskStatus!==null) {
            this.setState({bShowSubmitStatusModal: true});
            this.props.initializeStatus(INITIALIZE_CANCEL_TASK_STATUS)
        }
    }

    componentWillUnmount() {
    }


    onSubmitCancel = () => {
        if(this.props.user) {
            const {UserId, Token} = this.props.user;
            this.props.cancelTask(UserId, Token, this.props.loadTaskObj.TaskAcceptNo,this.state.TaskCancelReasons);
            this.setState({bShowSubmitCancelModal: false});
            this.props.initializeStatus(INITIALIZE_CANCEL_TASK_STATUS);
        }
    };

    onGotoNextPage = () => {
        this.setState({bShowSubmitStatusModal: false});
        const {UserId, Token} = this.props.user;
        this.props.getMyOrdersSummary(UserId, Token);
        Timer.setTimeout(async () => {
            Actions.totalmissions()
        }, 2000);
    };

    modalTrigger = ()=>{
        if(this.state.TaskCancelReasons==='') {
            Alert.alert(
                '失败',
                'Please fill cancel reason',
                [
                    {text: 'OK', onPress: () => this.props.initializeStatus(INITIALIZE_CANCEL_TASK_STATUS)},

                ],
            );
            return;
        }
        this.setState({bShowSubmitCancelModal: true})
    };

    showSubmitCancelModalContent = () => {
        return (
            <View style={{flex:1,width: '90%', maxHeight: 150, borderRadius: 10, backgroundColor:'white', paddingBottom: 15 }}>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30,}}>
                    <View style={{ ...Styles.RowCenterBetween, alignItems: 'center', marginTop: 30}}>
                        <Text style={{marginBottom: 30, fontSize: Styles.textNormal, color: Color.textNormal}}>Do you want to cancel the task?</Text>
                    </View>
                    <View style={{...Styles.ColumnCenter}}>
                        <View style={{ ...Styles.RowCenterBetween, alignItems: 'center'}}>
                        <Button small style={{paddingHorizontal: 20, backgroundColor: Color.textLight, marginRight: 15}} onPress={()=>this.setState({bShowSubmitCancelModal: false})}>
                            <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>取消</Text>
                        </Button>

                        <Button small style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue1}} onPress={()=>this.onSubmitCancel()}>
                            <Text small style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                        </Button>
                        </View>

                    </View>
                </View>
            </View>
        )
    };

    showSubmitStatusModal = () => {
        return (
            <View style={{flex:1,width: '90%', maxHeight: 100, borderRadius: 10, backgroundColor:'white', paddingBottom: 15 }}>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30,}}>
                    <View style={{ ...Styles.RowCenterBetween, alignItems: 'center', marginTop: 30}}>
                        <Text>{this.props.cancelTaskMsg || 'Cancelled'}</Text>
                    </View>
                    <View style={{...Styles.ColumnCenter}}>
                        <Button small style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue1}} onPress={()=>{this.onGotoNextPage()}}>
                            <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    };
    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginBottom: 10}}>
                    <Modal  isVisible={this.state.bShowSubmitCancelModal} style={{...Styles.ColumnCenter}}>
                        {this.showSubmitCancelModalContent()}
                    </Modal>

                    <Modal  isVisible={this.state.bShowSubmitStatusModal} style={{...Styles.ColumnCenter}}>
                        {this.showSubmitStatusModal()}
                    </Modal>

                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{paddingBottom: 10}}>
                            <Text style={{...Styles.normalTextStyle}}>Cancel</Text>
                        </View>
                        <View  style={{flex:1, ...Styles.RowCenterLeft, paddingVertical: 10}}>
                            <Textarea value={this.state.TaskCancelReasons} style={{flex:1}}
                                      bordered placeholder="请简要填写申诉说明" rowSpan={5}
                                      onChangeText={(value)=>this.setState({TaskCancelReasons: value})}
                            />
                        </View>
                    </View>

                    <View style={{paddingVertical: 15, paddingHorizontal: 15}}>
                        <TouchableOpacity activeOpacity={.7}
                                          onPress={()=>this.modalTrigger()}
                                          style={{borderRadius: 3, flex:1, paddingVertical: 8, backgroundColor: Color.LightBlue}} block>
                            <Text style={{alignSelf: 'center', color: 'white', fontSize: Styles.fontNormal}}>提交</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {loadTaskObj, cancelTaskStatus} = state.taskReducer;

    return {user, loadTaskObj,cancelTaskStatus };
};

export default connect(mapStateToProps, {initializeStatus, cancelTask, getMyOrdersSummary})(CancelTask);

