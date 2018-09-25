import React, {Component} from 'react';
import {Platform, UIManager, View, Image, TouchableOpacity, Alert, PixelRatio} from 'react-native'
import {connect} from 'react-redux';
import Modal from "react-native-modal";
import {Button, Container, Content, Text, Textarea} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {initializeStatus, cancelTask} from "../../actions";
import { SelectMultipleButton } from 'react-native-selectmultiple-button'
import ImagePicker from "react-native-image-picker";

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
    }

    componentDidUpdate() {
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.cancelTaskStatus!==null && nextProps.cancelTaskStatus) {
            this.setState({bShowSubmitStatusModal: true});
            this.props.initializeStatus(INITIALIZE_CANCEL_TASK_STATUS)
        }
    }

    componentWillUnmount() {
    }

    _singleTapDisputeButtons = (valueTap, option, index)=>{
        this.setState({
            bShowDisputeModal: false
        });

        const {UserId, Token} = this.props.user;
        const {AppealMsg,QuestionImgF,QuestionImgS,QuestionImgT} = this.state;
        this.props.initiateAppeal(UserId, Token,this.props.taskObj.TaskAcceptNo,index, AppealMsg, QuestionImgF, QuestionImgS, QuestionImgT);
        // Timer.setTimeout(async () => {
        //     this.props.initiateAppeal(UserId, Token,this.props.taskObj.TaskAcceptNo,index, AppealMsg, QuestionImgF, QuestionImgS, QuestionImgT);
        // }, 2000);
    };

    showDisputeModal() {
        let disputeOptions;
        if(this.props.getApplyStatementTypeObj===null) {
            return (
                <View></View>
            )
        }

        if(this.props.getApplyStatementTypeObj) {

            disputeOptions = this.props.getApplyStatementTypeObj.map(option => {
                return option.TypeText
            });

            let disputeModalContents = disputeOptions.map((option, index) => (
                <SelectMultipleButton
                    key={option}
                    value={option}
                    buttonViewStyle={{
                        borderRadius: 20,
                        height: 36,
                        paddingHorizontal: 15
                    }}
                    highLightStyle={{
                        borderColor: "gray",
                        backgroundColor: "transparent",
                        textColor: Color.LightBlue,
                        borderTintColor: Color.LightBlue,
                        backgroundTintColor: Color.LightBlue,
                        textTintColor: "white"
                    }}
                    selected={this.state.selectedDisputeOption === option}
                    singleTap={valueTap =>
                        this._singleTapDisputeButtons(valueTap, option, index)
                    }
                />
            ))


            if(disputeOptions) {
                return (
                    <View style={{flex:1,width: '90%', maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 15 }}>
                        <View style={{borderTopLeftRadius:10, borderTopRightRadius: 10, paddingVertical: 10, width: null,...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                            <Text style={{color: 'white', fontSize: Styles.fontNormal}}>请选择申诉类型</Text>
                        </View>
                        <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30, paddingTop: 10}}>
                            {disputeModalContents}
                        </View>
                    </View>
                )
            }
        }
    }

    selectPhotoTapped(id) {
        const options = {
            title:'选择一张照片',
            takePhotoButtonTitle:'拍照',
            chooseFromLibraryButtonTitle:'从相册选取',
            cancelButtonTitle:'取消',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // let source = { uri: response.uri };

                // You can also display the image using data:
                let source = { uri: `data:${response.type};base64,` + response.data };

                switch (id) {
                    case 1:
                        this.setState({
                            QuestionImgF: source
                        });
                        break;
                    case 2:
                        this.setState({
                            QuestionImgS: source
                        });
                        break;
                    case 3:
                        this.setState({
                            QuestionImgT: source
                        });
                        break;
                }
            }
        });
    }

    onSubmitCancel = () => {
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

        if(this.props.user) {
            const {UserId, Token} = this.props.user;
            this.props.cancelTask(UserId, Token, this.props.taskObj.TaskAcceptNo,this.state.TaskCancelReasons);
            this.setState({bShowSubmitCancelModal: false});
            this.props.initializeStatus(INITIALIZE_CANCEL_TASK_STATUS);
            Actions.totalmissions();
        }
    };

    showSubmitModal = () => {
        return (
            <View style={{flex:1,width: '90%', maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 15 }}>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30,}}>
                    <View style={{ ...Styles.RowCenterBetween, alignItems: 'center', marginTop: 30}}>
                        <Button style={{paddingHorizontal: 20, backgroundColor: Color.textLight}} onPress={()=>this.setState({bShowSubmitCancelModal: false})}>
                            <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>取消</Text>
                        </Button>

                        <Button style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue1}} onPress={()=>this.onSubmitCancel()}>
                            <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    };

    showSubmitStatusModal = () => {
        return (
            <View style={{flex:1,width: '90%', maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 15 }}>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30,}}>
                    <View style={{ ...Styles.RowCenterBetween, alignItems: 'center', marginTop: 30}}>
                        <Text>Cancelled</Text>
                        <Button style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue1}} onPress={()=>{this.setState({bShowSubmitStatusModal: false}); }}>
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
                        {this.showSubmitModal()}
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
                                          onPress={()=>this.setState({bShowSubmitCancelModal: true})}
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
    const {taskObj, acceptTaskObj, cancelTaskObj, cancelTaskStatus, cancelTaskMsg} = state.taskReducer;

    return {user, taskObj, acceptTaskObj, cancelTaskObj,cancelTaskStatus, cancelTaskMsg };
};

export default connect(mapStateToProps, {initializeStatus, cancelTask})(CancelTask);

