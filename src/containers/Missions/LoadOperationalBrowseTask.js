import React, {Component} from 'react';
import {Platform, UIManager, View, Image, TouchableOpacity, PixelRatio, Alert} from 'react-native';
import Timer from 'react-timer-mixin';
import {connect} from 'react-redux';
import {Button, Container, Content, Text, Textarea} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {loadOperationTask, initializeStatus, verifyShopName, submitTask, getMemberTaskAccept} from "../../actions";
import ImagePicker from "react-native-image-picker";

import {
    INITIALIZE_LOAD_OPERATIONAL_STATUS,
    INITIALIZE_SUBMIT_TASK_STATUS,
} from "../../actions/types";

import {Actions} from "react-native-router-flux";
import Modal from "react-native-modal";
import Spinner1 from "@components";
import {RowLeftRightBlock} from "../../components";

class LoadOperationalBrowseTask extends Component {
    state = {isVisibleTaskContentModal: false};
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
        this.state = {taskType: '操作任务',
            SearchPageImg: null,
            TargetProductTopImg: null,
            TargetProductBottomImg: null,
            isVisibleSubmitModal: false,
            shopName: '',
        };

        if(this.props.user && (this.props.taskObj || this.props.loadTaskObj)) {
            const {taskObj} = this.props;
            const {UserId, Token}  = this.props.user;
            if(!this.props.loadTaskObj)
                this.props.loadOperationTask(UserId, Token,taskObj.TaskAcceptNo);
        }
    }

    componentDidUpdate() {
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.loadTaskStatus!==null && nextProps.loadTaskStatus===false) {
            Alert.alert(
                '失败',
                nextProps.loadTaskMsg,
                [
                    {text: 'OK', onPress: () => this.props.initializeStatus(INITIALIZE_LOAD_OPERATIONAL_STATUS)},
                ],
                {cancelable: false}
            )
        }

        if(nextProps.submitTaskStatus!==null && nextProps.submitTaskStatus){
            this.setState({isVisibleSubmitModal: true});
        }

    }

    componentWillUnmount() {
        this.props.initializeStatus(INITIALIZE_LOAD_OPERATIONAL_STATUS);
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
                            SearchPageImg: source
                        });
                        break;
                    case 2:
                        this.setState({
                            TargetProductTopImg: source
                        });
                        break;
                    case 3:
                        this.setState({
                            TargetProductBottomImg: source
                        });
                        break;
                }
            }
        });
    }

    onSubmitBrowseTask = () => {
      if(this.props.user) {
          const {UserId, Token} = this.props.user;
          const {SearchPageImg, TargetProductTopImg, TargetProductBottomImg} = this.state;

          if(!SearchPageImg || !TargetProductTopImg || !TargetProductBottomImg){
              Alert.alert(
                  '失败',
                  'Choose 3 all images',
                  [
                      {text: 'OK', onPress: () => this.props.initializeStatus(INITIALIZE_LOAD_OPERATIONAL_STATUS)},
                  ],
                  {cancelable: false}
              );
              return;
          }

          console.log(SearchPageImg, TargetProductTopImg, TargetProductBottomImg);

          let imgJson = {"SearchPageImg": SearchPageImg.uri,
              "TargetProductTopImg": TargetProductTopImg.uri,
              "TargetProductBottomImg": TargetProductBottomImg.uri
          };

        this.props.submitTask(UserId, Token,this.props.loadTaskObj.TaskAcceptNo,  JSON.stringify(imgJson), 0, this.props.loadTaskObj.TaskType)
      }
    };

    onTouchModalCloseButton = () => {
        this.setState({isVisibleSubmitModal: false});
        this.props.initializeStatus(INITIALIZE_SUBMIT_TASK_STATUS);

        if(this.props.user && (this.props.taskObj || this.props.loadTaskObj)) {
            const {taskObj, loadTaskObj} = this.props;
            const {UserId, Token}  = this.props.user;

            if(this.props.loadTaskObj)
                this.props.loadOperationTask(UserId, Token,loadTaskObj.TaskAcceptNo);
            // this.props.getMemberTaskAccept(UserId, Token,taskObj.TaskAcceptNo);
            else
                this.props.loadOperationTask(UserId, Token,taskObj.TaskAcceptNo);
        }

        Timer.setTimeout(async () => {
            Actions.acceptedTask({task_step: 2});
        }, 2000);

    };


    _renderTaskSubmitModal = () => {

        return (
            <View style={{flex:1,width: '90%', maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 15 }}>
                <View style={{borderTopLeftRadius:10, borderTopRightRadius: 10, paddingVertical: 10, width: null,...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                    <Text style={{color: 'white', fontSize: Styles.fontNormal}}>系统提示</Text>
                </View>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 30,}}>
                    <View style={{borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.textNormal, paddingVertical: 30}}>
                        <Text style={{color:Color.textNormal, fontSize: Styles.fontNormal}}>提交任务成功</Text>
                    </View>
                    <View style={{ ...Styles.ColumnCenter, alignItems: 'center', marginTop: 30}}>
                        <Button style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue1}} onPress={()=>this.onTouchModalCloseButton()}>
                            <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    };


    _renderConent = () =>{
        if(this.props.loadTaskObj===null)
            return (<View></View>);
        const {loadTaskObj} = this.props;

        return (
            <View>
                <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                    <View style={{paddingBottom: 10}}>
                        <View style={{flexDirection:'row', ...Styles.RowCenterLeft}}>
                            <Image source={Images.prendig_review} style={{width: 20, height: 20, marginRight: 10}} />
                            <Text style={{...Styles.normalTextStyle}}>{loadTaskObj.ProductName}</Text>
                        </View>
                    </View>
                    <View style={{flex:1, ...Styles.RowCenterLeft, paddingVertical: 10}}>
                        <View style={{flex: 1}}>
                            <Image source={Images.product} style={{ height: 80, width: 80}}/>
                        </View>
                        <View style={{flex:3, marginLeft: 10}}>
                            <View>
                                <View style={{...Styles.RowCenterLeft}}>
                                    <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>目标商品 </Text>
                                    <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall,marginLeft: 10}}></Text>
                                </View>
                            </View>
                            <View>
                                <View style={{...Styles.RowCenterLeft}}>
                                    <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>搜索展示价格</Text>
                                    <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall,marginLeft: 10}}>{loadTaskObj.ProductPrice}元</Text>
                                </View>
                            </View>
                            <View>
                                <View style={{...Styles.RowCenterLeft}}>
                                    <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>件数或规格 </Text>
                                    <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall, marginLeft: 10}}>{loadTaskObj.ProductNum}件</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                    <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>卖家额外要求</Text>
                </View>

                <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                    <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                        <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>任务要点</Text>
                    </View>
                    <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                        <RowLeftRightBlock leftTitle='任务类型' rightTitle='浏览任务'
                                           l_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                           r_style={{color: Color.textInfoOrange, fontSize:Styles.fontSmall}}
                        />
                    </View>
                    <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                        <RowLeftRightBlock leftTitle='排序方式' rightTitle={loadTaskObj.SortBy}
                                           l_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                           r_style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}
                        />
                    </View>
                    <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                        <RowLeftRightBlock leftTitle='排序方式' rightTitle={`约${loadTaskObj.PayNumber}人付款`}
                                           l_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                           r_style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}
                        />
                    </View>
                    <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                        <RowLeftRightBlock leftTitle='价位区间' rightTitle={`${loadTaskObj.StartPrice}-${loadTaskObj.EndPrice}`}
                                           l_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                           r_style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}
                        />
                    </View>
                    <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                        <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>评论要求</Text>
                    </View>
                    <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                        <RowLeftRightBlock leftTitle='搜索关键字' rightTitle={loadTaskObj.KeyWord}
                                           l_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                           r_style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}
                        />
                    </View>
                </View>

                <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                    <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                        <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>浏览任务</Text>
                    </View>
                    <View style={{paddingBottom: 10}}>
                        <Text style={{fontSize: Styles.fontSmall, color: '#e00000'}}>核对店铺及商品是否正确（查看示例）</Text>
                    </View>
                    <View style={{paddingBottom: 10}}>
                        <View style={{...Styles.RowCenterLeft}}>
                            <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>商家店铺名：</Text>
                            <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall,marginLeft: 10}}>{loadTaskObj.ShopName}</Text>
                        </View>
                    </View>
                    <View style={{paddingBottom: 10}}>
                            <Textarea rowSpan={3}
                                      value={this.state.shopName}
                                      onChangeText={(value)=>this.setState({shopName: value})}
                                      bordered placeholder="如需核实，请在此粘贴商品链接" />
                        <View style={{paddingTop: 15, paddingBottom: 5}}>
                            <View style={{...Styles.RowCenterBetween}}>
                                <View style={{flex: 1}}>
                                    <Button small light
                                            style={{
                                                alignSelf: 'flex-end', marginRight: 15
                                            }}
                                    >
                                        <Text style={{color: Color.textNormal}}>清除</Text>
                                    </Button>
                                </View>
                                <View style={{flex: 1}}>
                                    <Button  small
                                             style={{
                                                 alignSelf: 'flex-start', backgroundColor: Color.LightBlue, margintLeft: 15
                                             }}
                                    >
                                        <Text style={{color: 'white'}}>核对</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                    <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                        <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>上传图片</Text>
                    </View>
                    <View>
                        <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>1、请确认拼金币买手号登陆淘宝应用</Text>
                        <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>2、点击复制关键词并打开淘宝 橙色按钮，搜索指定关键词，设置筛选价位区间，所在地缩小查询范围，找到目标商品</Text>
                        <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>3、对目标商品从上到下进行至少2分钟浏览，过程中分别截取。1 搜
                            索结果页 2 目标商品头部 3目标商品尾部，并上传全部截图提交任务</Text>
                    </View>
                    <View style={{paddingVertical: 20}}>
                        <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                            <View style={{flex:1,marginRight: 6}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(1)}>
                                    { this.state.SearchPageImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.SearchPageImg} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontSmaller, color: Color.textNormal}}>搜索结果页</Text>
                                </View>
                            </View>
                            <View style={{flex:1, marginRight:3}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(2)}>
                                    { this.state.TargetProductTopImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.TargetProductTopImg} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontSmaller, color: Color.textNormal}}>目标商品头部</Text>
                                </View>
                            </View>

                            <View style={{flex:1, marginRight:3}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(3)}>
                                    { this.state.TargetProductBottomImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.TargetProductBottomImg} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontSmaller, color: Color.textNormal}}>目标商品尾部</Text>
                                </View>
                            </View>

                            <View style={{flex:1, marginRight:3}}>
                            </View>
                        </View>
                        <View style={{paddingVertical: 15}}>
                            <TouchableOpacity activeOpacity={.7} style={{borderRadius: 3, flex:1, paddingVertical: 8, backgroundColor: Color.LightBlue}} block><Text style={{alignSelf: 'center', color: 'white', fontSize: Styles.fontNormal}}>一次选3张</Text></TouchableOpacity>
                        </View>
                        <View style={{paddingVertical: 15}}>
                            <TouchableOpacity activeOpacity={.7}
                                              onPress={()=>this.onSubmitBrowseTask()}
                                              style={{borderRadius: 3, flex:1, paddingVertical: 8, backgroundColor: Color.LightBlue}} block>
                                <Text style={{alignSelf: 'center', color: 'white', fontSize: Styles.fontNormal}}>提交任务</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )

    };

    render() {

        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginBottom: 10}}>
                    <Modal  isVisible={this.state.isVisibleSubmitModal} style={{...Styles.ColumnCenter}}>
                        {this._renderTaskSubmitModal()}
                    </Modal>
                    {this._renderConent()}
                </Content>

            </Container>
        );
    }
}



const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {taskObj,taskObjMsg,taskObjStatus,loadTaskObj, loadTaskStatus, loadTaskMsg,
        submitTaskMsg,submitTaskStatus,
    } = state.taskReducer;
    return {user,taskObj,taskObjMsg,taskObjStatus, loadTaskObj, loadTaskStatus, loadTaskMsg, submitTaskMsg,submitTaskStatus

    };
};

export default connect(mapStateToProps, {initializeStatus, loadOperationTask, verifyShopName, submitTask, getMemberTaskAccept})(LoadOperationalBrowseTask);

