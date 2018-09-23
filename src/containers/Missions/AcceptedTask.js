import React, {Component} from 'react';
import {Platform, UIManager, Dimensions, View, Image, TouchableOpacity, PixelRatio} from 'react-native'
import {connect} from 'react-redux';
import {Button, Container, Content, Text} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {getMemberTaskAccept, initializeStatus} from "../../actions";

import {
    INITIALIZE_SELECTED_TASK_NO,
    INITIALIZE_SYSTEM_SEND_TASK_STATUS,
    INITIALIZE_TASK_LIST_STATUS
} from "../../actions/types";

import {Actions} from "react-native-router-flux";
import Modal from "react-native-modal";
import Spinner1 from "@components";
import {RowLeftRightBlock} from "../../components";

class AcceptedTask extends Component {
    state = {isVisibleTaskContentModal: false};
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(this.props.user && this.props.taskObj) {
            const {taskObj} = this.props;
            const {UserId, Token}  = this.props.user;
            this.props.getMemberTaskAccept(UserId, Token,taskObj.TaskAcceptNo);
        }
    }

    componentDidUpdate() {
    }

    componentWillReceiveProps(nextProps) {
        console.log('advanced', nextProps);

    }

    componentWillUnmount() {
        this.props.initializeStatus(INITIALIZE_TASK_LIST_STATUS);
    }


    renderConnect() {
        return (<View style={{flex:1, height: null, width: 2,alignSelf:'center', borderLeftWidth:4/PixelRatio.get(), borderColor: Color.textLight}}></View>);
    }

    render() {
        const taskObj1 = {
            AcceptTaskStatus: 0,
            AcceptTaskStatusText: "待操作",
            AccountName: "发发发",
            Amount: 0,
            Commission: 10.2,
            CreateTime: "2018-09-22 20:12",
            OperationCountdown: 15,
            // ProductImg: "http://pjb.wtvxin.com/upload/20180902141220613_s0.jpg",
            ProductImg: Images.product,
            ProductImg1: "",
            ProductImg2: "",
            ProductName: "女装",
            ProductName1: "",
            ProductName2: "",
            ProductNum: 0,
            ProductNum1: 0,
            ProductNum2: 0,
            ProductPrice: 25,
            ProductPrice1: 0,
            ProductPrice2: 0,
            ProductSpec: "",
            ShopName: "****",
            TaskAcceptNo: "jd18092220123008885387",
            TaskType: 2,
        };

        const {acceptTaskObj} = this.props;

        if(acceptTaskObj===null){
            return (
                <Container style={{backgroundColor: Color.LightGrayColor}}>
                    <Content style={{marginBottom: 10}}>
                    </Content>
                </Container>
            )
        }

        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginBottom: 10}}>

                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{paddingBottom: 10}}>
                            <View style={{flexDirection:'row', ...Styles.RowCenterLeft}}>
                                <Image source={Images.prendig_review} style={{width: 20, height: 20, marginRight: 10}} />
                                <Text style={{...Styles.normalTextStyle}}>{acceptTaskObj.ProductName}</Text>
                            </View>
                        </View>
                        <View style={{flex:1, ...Styles.RowCenterLeft, paddingVertical: 10}}>
                            <View style={{flex: 1}}>
                                <Image source={Images.product} style={{ height: 80, width: 80}}/>
                            </View>
                            <View style={{flex:3, marginLeft: 10}}>
                                <View>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>商品成交价格</Text>
                                        <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall,marginLeft: 10}}>{acceptTaskObj.ProductPrice}元</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall}}>件数或规格 </Text>
                                        <Text style={{color: Color.textNormal, fontSize:Styles.fontSmall, marginLeft: 10}}>{acceptTaskObj.ProductNum}件</Text>
                                    </View>
                                </View>

                                <View style={{marginTop: 10}}>
                                    <Button small bordered info>
                                        <Text style={{color: Color.LightBlue, fontSize: Styles.fontSmall}}>点击查看详情</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{...Styles.borderBottomStyle, paddingBottom: 10}}>
                            <RowLeftRightBlock leftTitle='任务状态' rightTitle={acceptTaskObj.AcceptTaskStatusText}
                                               l_style={{color: Color.textNormal, fontSize:Styles.fontSmall}}
                                               r_style={{color: Color.textInfoOrange, fontSize:Styles.fontSmall}}
                            />
                        </View>
                        <Text style={{paddingTop: 10, color: '#e00000', fontSize: Styles.fontSmall}}>提示：请尽快完成任务</Text>
                        <View style={{paddingVertical: 15}}>
                            <View style={{...Styles.RowCenterBetween}}>
                                <View style={{flex: 1}}>
                                    <Button small onPress={()=>this.props.acceptTaskObj.TaskType===2 ? Actions.loadOperationalBrowseTask(): Actions.loadOperationalAdvancedTask()}
                                        style={{
                                            borderRadius: 30,
                                            backgroundColor: Color.DarkLightBlue,
                                            alignSelf: 'flex-start',
                                        }}
                                    >
                                        <Text style={{color: 'white'}}>操作任务</Text>
                                    </Button>
                                </View>
                                <View style={{flex: 1}}>
                                    <Button disabled small
                                        style={{
                                            borderRadius: 30,
                                            alignSelf: 'center',
                                        }}
                                    >
                                        <Text style={{color: 'white'}}>申诉任务</Text>
                                    </Button>
                                </View>
                                <View style={{flex: 1}}>
                                    <Button small
                                        style={{
                                            borderRadius: 30,
                                            backgroundColor: Color.DarkLightBlue,
                                            alignSelf: 'flex-end',
                                        }}
                                    >
                                        <Text style={{color: 'white'}}>取消任务</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        <View style={{flex:1, flexDirection: 'row' }}>
                            <View style={{flex:1, paddingBottom:3}}>
                                <View style={{marginBottom: 3, borderColor: '#73cd6c', borderWidth:4/PixelRatio.get(),borderRadius: 20, width: 24, height: 24, alignSelf: 'center'}}>
                                    <Text style={{alignSelf: 'center',color:'#73cd6c'}}>1</Text>
                                </View>
                                {this.renderConnect()}
                            </View>
                            <View style={{flex:9, paddingBottom: 30}}>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:2}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>接受任务</Text></View>
                                        <View style={{flex:8}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>{acceptTaskObj.CreateTime}</Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:2}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>任务编号</Text></View>
                                        <View style={{flex:6}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>{acceptTaskObj.TaskAcceptNo}</Text></View>
                                        <View style={{flex:2, ...Styles.RowCenterRight}}><TouchableOpacity><Text style={{color: Color.LightBlue, fontSize:Styles.fontSmall}}>复制</Text></TouchableOpacity></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:2}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>买号</Text></View>
                                        <View style={{flex:8}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>{acceptTaskObj.AccountName}</Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:2}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>商品金额</Text></View>
                                        <View style={{flex:8}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>{acceptTaskObj.Amount}元</Text></View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1, paddingBottom: 3}}>
                                <View style={{marginBottom:3,borderColor: Color.textLight, borderWidth:4/PixelRatio.get(),borderRadius: 20, width: 24, height: 24, alignSelf: 'center'}}>
                                    <Text style={{ alignSelf: 'center', color:Color.textLight}}>2</Text>
                                </View>
                                {this.renderConnect()}
                            </View>
                            <View style={{flex:9, paddingBottom: 30}}>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:2}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>提交任务</Text></View>
                                        <View style={{flex:8}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>（点开图片可更换错误图片）</Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:2}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>浏览店铺</Text></View>
                                        <View style={{flex:8}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}></Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft, padding: 5}}>
                                        {/*<Image style={{width: 30, height: 30, marginRight: 10}} source={acceptTaskObj.ProductImg ? acceptTaskObj.ProductImg: Images.placeholder} />*/}
                                        <Image style={{width: 30, height: 30, marginRight: 10}} source={Images.product} />
                                        <Image style={{width: 30, height: 30, marginRight: 10}} source={acceptTaskObj.ProductImg1 ? acceptTaskObj.ProductImg1: Images.placeholder} />
                                        <Image style={{width: 30, height: 30, }} source={acceptTaskObj.ProductImg2 ? acceptTaskObj.ProductImg2: Images.placeholder} />
                                    </View>
                                </View>

                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                <View style={{borderColor: Color.textLight, borderWidth:4/PixelRatio.get(),borderRadius: 20, width: 24, height: 24,  alignSelf: 'center'}}>
                                    <Text style={{ alignSelf: 'center', color:Color.textLight}}>3</Text>
                                </View>
                            </View>
                            <View style={{flex:9, paddingBottom: 30}}>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <View style={{flex:2}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}>任务完成</Text></View>
                                        <View style={{flex:8}}><Text style={{color: Color.textLight, fontSize:Styles.fontSmall}}></Text></View>
                                    </View>
                                </View>
                                <View style={{flex:1, paddingTop: 5}}>
                                    <View style={{...Styles.RowCenterLeft}}>
                                        <RowLeftRightBlock leftTitle='获得佣金' rightTitle={`获得${acceptTaskObj.Commission}金`}
                                                           l_style={{color: Color.textLight, fontSize:Styles.fontSmall}}
                                                           r_style={{color: Color.textLight, fontSize:Styles.fontSmall}}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>

                </Content>
            </Container>
        );
    }
}



const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {taskObj,taskObjMsg,taskObjStatus ,acceptTaskObj} = state.taskReducer;
    return {user,taskObj,taskObjMsg,taskObjStatus, acceptTaskObj};
};

export default connect(mapStateToProps, {initializeStatus, getMemberTaskAccept})(AcceptedTask);

