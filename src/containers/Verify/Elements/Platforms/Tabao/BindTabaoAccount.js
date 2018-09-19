import React, {Component} from 'react'
import {View,Image,TouchableOpacity,StyleSheet, PixelRatio, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';
import {Actions} from 'react-native-router-flux';
import {Button, Card, Container, Content, Form, Icon, Input, Item, Text, Toast} from 'native-base';
import ImagePicker from "react-native-image-picker";
import RNPickerSelect from 'react-native-picker-select';
import {submitTabaoAccount,getAreaLists, getMemberPlatformInfo,getAllShoppingCategories} from "@actions";
import Modal from "react-native-modal";
import { SelectMultipleButton, SelectMultipleGroupButton } from 'react-native-selectmultiple-button'


class BindTabaoAccount extends Component {

    constructor(props){
        super(props);

        this.setProvinceCode = this.setProvinceCode.bind(this);

        this.state = {
            user: this.props.user,
            id_card_front_photo: null,
            id_card_back_photo: null,
            id_card_hand_held1: null,
            id_card_hand_held2: null,
            username: props.user.id_card.UserRName,
            id_card: props.user.id_card.Idcard,
            PlatAccount: '',
            ConsigneeName: '',
            ConsigneeCall: '',
            Age: undefined,
            OrderNo: '123143245253646',
            Gender: undefined,
            ProvinceCode: undefined,
            ProvinceName: '',
            CityCode: undefined,
            CityName: '',
            DistrictCode: undefined,
            DistrictName: '',
            TaobaoValue: '1000',
            CreditRating: '2',
            genders:[
                {
                    label:'性别: 男',
                    value: '男'
                },
                {
                    label:'性别: 女',
                    value: '女'
                }
            ],
            CreditRatingImg: null,
            UserInfoImg: null,
            UserCenterImg: null,
            TaobaoValueImg: null,
            AccountLevelImg: null,
            VerifiedImg: null,
            BorrowingImg: null,
            validationForm: true,
            bPlatformBindSubmittedStatus: null,
            bShowCategories: false
        };
        if(!this.props.shopCategoryObj)
            this.props.getAllShoppingCategories();
    }

    componentDidMount(){
        if(this.props.provinces===null)
            this.props.getAreaLists('Province');

        Actions.bindTabaoAccount({title: `绑定${this.props.PlatName}账号`});
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.bPlatformBindSubmittedStatus!==null) {
            if(nextProps.bPlatformBindSubmittedStatus) {
                if(nextProps.user) {
                    const {UserId, Token} = nextProps.user;
                    this.props.getMemberPlatformInfo(UserId, Token, nextProps.PlatId);
                }
                Alert.alert(
                    '成功',
                    nextProps.tabaoMsg,
                    [
                        {text: 'OK', onPress: () => Actions.TabaoMain({PlatId: this.props.PlatId, PlatName: this.props.PlatName})},
                    ],
                    {cancelable: false}
                )
            } else {
                Alert.alert(
                    '失败',
                    nextProps.tabaoMsg,
                    [
                        {text: 'OK', onPress: () =>console.log('pressed')},
                    ],
                    {cancelable: false}
                )
            }
        }
    }

    submitTabaoBindInfo = () => {

        if(this.props.user && this.props.user.bindInfo) {
            const {UserId, Token} = this.props.user;
            let PlatId = this.props.PlatId;

            const {ProvinceCode, CityCode, DistrictCode, ConsigneeCall, ConsigneeName, PlatAccount} = this.state;
            const {ProvinceName, CityName, DistrictName, Gender, Age, TaobaoValue} = this.state;
            let address = `${ProvinceName}${CityName}${DistrictName}`;


            if(ProvinceCode ===undefined) {
                Toast.show({
                    text: 'Please choose Province!', buttonText: "是", type: "danger",
                    duration: 3000
                });
                return;
            }

            if(CityCode ===undefined) {
                Toast.show({
                    text: 'Please choose City!', buttonText: "是", type: "danger",
                    duration: 3000
                });
                return;
            }

            if(DistrictCode ===undefined) {
                Toast.show({
                    text: 'Please choose District!', buttonText: "是", type: "danger",
                    duration: 3000
                });
                return;
            }

            if(ConsigneeCall ==='') {
                Toast.show({
                    text: 'Please enter contact phone!', buttonText: "是", type: "danger",
                    duration: 3000
                });
                return;
            }

            if(ConsigneeName ==='') {
                Toast.show({
                    text: 'Please enter contact name!', buttonText: "是", type: "danger",
                    duration: 3000
                });
                return;
            }

            if(Gender ===undefined) {
                Toast.show({
                    text: 'Please enter gender!', buttonText: "是", type: "danger",
                    duration: 3000
                });
                return;
            }


            if(PlatAccount ==='') {
                Toast.show({
                    text: 'Please enter platform account name!', buttonText: "是", type: "danger",
                    duration: 3000
                });
                return;
            }

            if(Age ==='') {
                Toast.show({
                    text: 'Please enter platform account name!', buttonText: "是", type: "danger",
                    duration: 3000
                });
                return;
            }

            this.props.submitTabaoAccount(UserId, Token, PlatId,
                ProvinceCode, CityCode, DistrictCode,ConsigneeCall, ConsigneeName, PlatAccount,address,
                Gender, Age, TaobaoValue
            )
        }
    };

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
                    case 0:
                        this.setState({
                            id_card_front_photo: source
                        });
                        break;
                    case 1:
                        this.setState({
                            id_card_back_photo: source
                        });
                        break;
                    case 2:
                        this.setState({
                            id_card_hand_held1: source
                        });
                        break;
                    case 3:
                        this.setState({
                            id_card_hand_held2: source
                        });
                        break;
                }

            }
        });
    }


    setProvinceCode = (value, index)=>{
        this.setState({
            ProvinceCode: value,
            ProvinceName: this.props.provinces[index]['label'],
        });

        this.props.getAreaLists('City', value);
        console.log(this.state);

    };

    setCityCode = (value, index) => {
        this.setState({
            CityCode: value,
            CityName: this.props.cities[index]['label'],
        });

        this.props.getAreaLists('District', value);
    };

    setDistrictCode(value, index) {
        this.setState({
            DistrictCode: value,
            DistrictName: this.props.districts[index]['label'],
        });
    }

    _renderCategoryModal = () => {
        return (
            <View style={{width: '100%',marginHorizontal: 15, maxHeight: 250, borderRadius: 10, backgroundColor:'white', paddingBottom: 30 }}>
                <View style={{borderTopLeftRadius:10, height: 60,borderTopRightRadius: 10, ...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                    <Text style={{color: 'white', fontSize: Styles.fontNormal}}>请选择经常购买的3-5个购物类目</Text>
                </View>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 15,}}>
                    <View style={{paddingVertical: 20}}>
                        <Text style={{alignSelf: 'center',color:Color.textNormal, fontSize: Styles.fontNormal}}>清缓存后会重启应用，确认清缓存吗？</Text>
                    </View>
                </View>
                <View style={{ flexDirection:'row',justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <Button onPress={()=>this.setState({bShowCategories: false})}
                            style={{paddingHorizontal: 20, marginRight: 20, backgroundColor:'#ededed', borderColor: Color.LightBorder, borderWidth: 1/PixelRatio.get()}}>
                        <Text style={{fontSize: Styles.fontLarge,color: Color.textNormal}}>取消</Text>
                    </Button>
                    <Button style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue}}>
                        <Text style={{fontSize: Styles.fontLarge,color: 'white'}}>确认</Text>
                    </Button>
                </View>
            </View>

        )
    }



    render() {
        const {IdcardInHand} = this.props.user.id_card;
        return (
            <Container style={{backgroundColor:Color.LightGrayColor}}>
                <Content style={{paddingBottom: 20}}>
                    <Modal  isVisible={this.state.bShowCategories} style={{...Styles.ColumnCenter}}>
                        {this._renderCategoryModal()}
                    </Modal>
                    <View style={{padding: 15, marginBottom: 20}}>
                        <View style={{marginBottom: 15}}>
                            <Text style={{fontSize: Styles.fontLarge, color: Color.textNormal}}>注意事项</Text>
                        </View>
                        <View style={{...Styles.RowCenterLeft, flexWrap: 'wrap' }}>
                            <Text style={{flexWrap: 'wrap', color: Color.textNormal}}>账号审核时间
                                <Text style={{flexWrap: 'wrap', color: Color.redColor}}>（周一至周五09:00-18:00）</Text>
                                <Text style={{flexWrap: 'wrap', color: Color.textNormal}}>，账号提交后一工作日内完成审核，如遇到周末或节假日顺廷，审核工作人工进行，用户请耐心等待，新手务必查看</Text>
                                <Text style={{flexWrap: 'wrap', color: Color.redColor}}>截图示例！</Text>
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{fontSize: Styles.fontLarge, color: Color.textNormal, paddingHorizontal: 15}}>账号信息</Text>
                    </View>
                    <View style={{...Styles.shadowStyle, paddingHorizontal: 15, backgroundColor: 'white'}}>
                        <Item regular underline={false} style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="最爱打法"
                                value = {this.state.PlatAccount}
                                onChangeText={(value)=>this.setState({PlatAccount: value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="收货人姓名"
                                value = {this.state.ConsigneeName}
                                onChangeText={(value)=>this.setState({ConsigneeName: value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="联系电话"
                                value = {this.state.ConsigneeCall}
                                onChangeText={(value)=>this.setState({ConsigneeCall: value})}
                            />
                        </Item>
                        {this.props.provinces && (
                            <RNPickerSelect
                                placeholder={{
                                    label: '选择省份',
                                    value: null,
                                }}
                                items={this.props.provinces}
                                onValueChange={(value, index) => { this.setProvinceCode(value, index)}}
                                style={{ ...pickerSelectStyles }}
                                value={this.state.ProvinceCode}
                            />
                        )}
                        {this.props.cities && (
                            <RNPickerSelect
                                placeholder={{
                                    label: '请选择城市',
                                    value: null,
                                }}
                                items={this.props.cities}
                                onValueChange={(value, index) => { this.setCityCode(value, index)}}
                                style={{ ...pickerSelectStyles }}
                                value={this.state.CityCode}
                            />
                        )}
                        {this.props.districts && (
                            <RNPickerSelect
                                placeholder={{
                                    label: '请选择区',
                                    value: null,
                                }}
                                items={this.props.districts}
                                onValueChange={(value, index) => {
                                    this.setDistrictCode(value, index)
                                }}
                                style={{ ...pickerSelectStyles }}
                                value={this.state.DistrictCode}
                            />
                        )}

                    </View>
                    <View style={{...Styles.shadowStyle, paddingHorizontal: 15, backgroundColor: 'white', paddingVertical: 15, ...Styles.shadowStyle}}>
                        <Text style={{color:Color.textNormal, marginTop: 25}}>账号属性（与实名认证的身份证信息一致）</Text>

                        <RNPickerSelect
                            placeholder={{
                                label: '请选择性别',
                                value: null,
                            }}
                            items={this.state.genders}
                            onValueChange={(value) => {
                                this.setState({
                                    Gender: value,
                                });
                            }}
                            style={{ ...pickerSelectStyles }}
                            mode='dropdown'
                            value={this.state.Gender}
                        />
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="年龄"
                                value = {this.state.Age}
                                onChangeText={(value)=>this.setState({Age: value})}
                            />
                        </Item>
                        <TouchableOpacity activeOpacity={.9} style={{flex:1, flexDirection: 'row', alignItems: 'center', marginVertical: 10, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Text style={{color: Color.textNormal}}>信誉</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <View style={{...Styles.RowCenterRight}} activeOpacity={0.8}>
                                    <Text style={{color: Color.textNormal}}>{this.state.CreditRating}星</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={.9} style={{flex:1, flexDirection: 'row', alignItems: 'center', marginVertical: 10, ...Styles.bottomBorderStyle}}>
                            <View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>
                                <Text style={{color: Color.textNormal}}>淘气值</Text>
                            </View>
                            <View style={{flex:1,}}>
                                <View style={{...Styles.RowCenterRight}} activeOpacity={0.8}>
                                    <Text style={{color: Color.textNormal}}>{this.state.TaobaoValue}以下</Text>
                                    <Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="订单编号"
                                value = {this.state.OrderNo}
                                onChangeText={(value)=>this.setState({OrderNo: value})}
                            />
                        </Item>
                        <View style={{...Styles.RowCenterLeft, paddingVertical: 10, marginTop: 10}}>
                            <TouchableOpacity onPress={()=> this.setState({bShowCategories: true})}>
                                <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>购物类目</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{paddingHorizontal: 15, marginTop: 15, paddingVertical: 20, backgroundColor: 'white', ...Styles.shadowStyle}}>
                        <View style={{...Styles.RowCenterBetween}}>
                            <Text style={{fontSize: Styles.fontSmall}}>
                                点击上传图片（上传后，长按看大图，点击可更换图片）
                                <Text style={{color: Color.redColor, marginLeft: 20}}>截图示列</Text>
                            </Text>

                        </View>
                        <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                            <View style={{flex:1,marginRight: 6}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(2)}>
                                    { this.state.id_card_hand_held1 === null && IdcardInHand==='' ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_hand_held1?this.state.id_card_hand_held1:{uri: IdcardInHand}} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>信誉等级</Text>
                                </View>
                            </View>
                            <View style={{flex:1, marginRight:3}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(3)}>
                                    { this.state.id_card_hand_held2 === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_hand_held2} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>信誉等级</Text>
                                </View>
                            </View>
                            <View style={{flex:1, marginRight:3}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(3)}>
                                    { this.state.id_card_hand_held2 === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_hand_held2} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>信誉等级</Text>
                                </View>
                            </View>
                            <View style={{flex:1, marginRight:3}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(3)}>
                                    { this.state.id_card_hand_held2 === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_hand_held2} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>信誉等级</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{paddingHorizontal: 15}}>
                        <Text style={{marginTop: 25, fontSize: Styles.fontSmall, color: Color.redColor}}>花呗：选填，开通花呗账号接单可获得更多佣金</Text>
                    </View>

                    <View style={{paddingBottom: 15}}>
                        <Button block style={styles.buttonStyle} onPress = {()=>this.submitTabaoBindInfo()}>
                            <Text style={{fontSize: Styles.fontLarge}}>提交审核</Text>
                        </Button>
                    </View>

                </Content>
            </Container>
        );
    }
}

const styles ={
    contentStyle: {
        backgroundColor:'#f8f8f8',
        flex:1
    },
    itemStyle: {
        borderRadius: 5, backgroundColor: 'white', marginTop: 10, height: 37
    },
    buttonStyle: {
        marginTop: 10, borderRadius: 5, backgroundColor: Color.LightBlue, marginHorizontal: 15
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
} ;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: Styles.fontNormal,
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1/PixelRatio.get(),
        borderColor: Color.Border,
        borderRadius: 4,
        backgroundColor: 'white',
        color: Color.textNormal,
    },
});
const mapStateToProps = (state) => {
    const {user, provinces, cities, districts} = state.loginForm;
    const {tabaoObj, tabaoMsg,tabaoLoading,bPlatformBindSubmittedStatus,shopCategoryObj} = state.platformReducer;
    return {user, provinces, cities, districts, tabaoObj, tabaoMsg,tabaoLoading,bPlatformBindSubmittedStatus,shopCategoryObj};
};
export default connect(mapStateToProps, {getAreaLists,getMemberPlatformInfo, submitTabaoAccount,getAllShoppingCategories})(BindTabaoAccount);

