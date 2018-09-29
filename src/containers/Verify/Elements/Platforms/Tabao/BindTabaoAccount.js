import React, {Component} from 'react'
import {View,Image,TouchableOpacity,StyleSheet, PixelRatio, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';
import {Actions} from 'react-native-router-flux';
import {Button, Card, Container, Content, Form, Icon, Input, Item, Text, Toast} from 'native-base';
import ImagePicker from "react-native-image-picker";
import RNPickerSelect from 'react-native-picker-select';
import {submitPlatformAccount,getAreaLists, getMemberPlatformInfo,getAllShoppingCategories,initializeStatus,
    submitTaobaoAccount,submitJinDongAccount,submitPinDuoDuoAccount,submitBeautifulAccount
} from "@actions";
import Modal from "react-native-modal";
import { SelectMultipleButton } from 'react-native-selectmultiple-button'
import _ from 'lodash'
import SnapSlider from 'react-native-snap-slider';
import {INITIALIZE_TABAO_SUBMIT_STATUS} from "../../../../../actions/types";

/**
 * PlatId: 1 - Taobao
 * PlatId: 2 -
 * PlatId: 3 - JinDong
 * PlatId: 4 -
 * PlatId: 5 - PinDuoDuo
 * PlatId: 6 - Beautiful
 * PlatId: 7 - MushRoom
 */
class BindTabaoAccount extends Component {
    priceOptions = [
        {value: 500, label: '500'},
        {value: 1000, label: '1000'},
        {value: 2000, label: '2000'},
        {value: 3000, label: '3000'},
        {value: 10000, label: '10000'}
    ];
    constructor(props){
        super(props);

        this.setProvinceCode = this.setProvinceCode.bind(this);
        this.slidingComplete1 = this.slidingComplete1.bind(this);
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
            TaobaoValue: 1000,
            defaultItem: 1,
            CreditRating: '',
            AccountLevel: '',
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
            bShowCategories: false,
            multipleSelectedDataLimited: [],
            multipleSelectedDataLimited_index: []
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
                this.props.initializeStatus(INITIALIZE_TABAO_SUBMIT_STATUS);
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

            let ConsumerCategoryList = this.state.multipleSelectedDataLimited_index.toString();
            console.log(ConsumerCategoryList);

            const {ProvinceCode, CityCode, DistrictCode, ConsigneeCall, ConsigneeName, PlatAccount} = this.state;
            const {ProvinceName, CityName, DistrictName, Gender, Age, TaobaoValue} = this.state;
            let address = `${ProvinceName}${CityName}${DistrictName}${this.state.address}`;


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

            if(Age ===undefined) {
                Toast.show({
                    text: 'Please enter your age!', buttonText: "是", type: "danger",
                    duration: 3000
                });
                return;
            }

            if(PlatId===1){
                if(ConsumerCategoryList==='') {
                    Toast.show({
                        text: 'Please choose product categories!', buttonText: "是", type: "danger",
                        duration: 3000
                    });
                    return;
                }
                if(this.props.CreditRating==='') {
                    Toast.show({
                        text: 'Please enter Credit Rating!', buttonText: "是", type: "danger",
                        duration: 3000
                    });
                    return;
                }
                if(this.props.CreditRatingImg===null) {
                    Toast.show({
                        text: 'Please choose credit rating image!', buttonText: "是", type: "danger",
                        duration: 3000
                    });
                    return;
                }
                if(this.props.TaobaoValueImg===null) {
                    Toast.show({
                        text: 'Please choose Taobao Value Image!', buttonText: "是", type: "danger",
                        duration: 3000
                    });
                    return;
                }
                if(this.props.VerifiedImg===null) {
                    Toast.show({
                        text: 'Please choose Taobao Verified Image!', buttonText: "是", type: "danger",
                        duration: 3000
                    });
                    return;
                }
                if(this.props.BorrowingImg===null) {
                    Toast.show({
                        text: 'Please choose Taobao Borrowing Image!', buttonText: "是", type: "danger",
                        duration: 3000
                    });
                    return;
                }
            }
            if(PlatId===3){
                if(this.state.AccountLevel==='') {
                    Toast.show({
                        text: 'Please enter Account Level!', buttonText: "是", type: "danger",
                        duration: 3000
                    });
                    return;
                }
                if(this.props.VerifiedImg===null) {
                    Toast.show({
                        text: 'Please choose JinDong Verified Image!', buttonText: "是", type: "danger",
                        duration: 3000
                    });
                    return;
                }
                if(this.props.BorrowingImg===null) {
                    Toast.show({
                        text: 'Please choose JinDong Borrowing Image!', buttonText: "是", type: "danger",
                        duration: 3000
                    });
                    return;
                }
                if(this.props.UserCenterImg===null) {
                    Toast.show({
                        text: 'Please choose JinDong user center Image!', buttonText: "是", type: "danger",
                        duration: 3000
                    });
                    return;
                }
                if(this.props.AccountLevelImg===null) {
                    Toast.show({
                        text: 'Please choose JinDong Account level Image!', buttonText: "是", type: "danger",
                        duration: 3000
                    });
                    return;
                }
            }

            if(PlatId===1 || PlatId===5){
                if(this.state.OrderNo==='') {
                    Toast.show({
                        text: 'Please enter order number!', buttonText: "是", type: "danger",
                        duration: 3000
                    });
                    return;
                }
            }

            if(PlatId===1) {
                this.props.submitTaobaoAccount(UserId, Token, PlatId,
                    ProvinceCode, CityCode, DistrictCode,ConsigneeCall, ConsigneeName, PlatAccount,address,
                    Gender, Age, TaobaoValue, this.state.CreditRating, this.state.OrderNo,ConsumerCategoryList,
                    this.state.CreditRatingImg.uri, this.state.TaobaoValueImg.uri, this.state.VerifiedImg.uri, this.state.BorrowingImg.uri
                )
            }

            if(PlatId===3) {
                this.props.submitJinDongAccount(UserId, Token, PlatId,
                    ProvinceCode, CityCode, DistrictCode,ConsigneeCall, ConsigneeName, PlatAccount,address,
                    Gender, Age, this.state.AccountLevel,
                    this.state.UserCenterImg.uri, this.state.AccountLevelImg.uri, this.state.VerifiedImg.uri, this.state.BorrowingImg.uri
                )
            }
            if(PlatId===5) {
                this.props.submitPinDuoDuoAccount(UserId, Token, PlatId,
                    ProvinceCode, CityCode, DistrictCode,ConsigneeCall, ConsigneeName, PlatAccount,address,
                    Gender, Age, this.state.OrderNo,
                    this.state.UserCenterImg.uri, this.state.CreditRatingImg.uri
                )
            }
            if(PlatId===6 || PlatId===7) {
                this.props.submitBeautifulAccount(UserId, Token, PlatId,
                    ProvinceCode, CityCode, DistrictCode,ConsigneeCall, ConsigneeName, PlatAccount,address,
                    Gender, Age, this.state.UserInfoImg.uri
                )
            }

            if(PlatId===2 || PlatId===4 || PlatId===8)
                this.props.submitPlatformAccount(UserId, Token, PlatId,
                    ProvinceCode, CityCode, DistrictCode,ConsigneeCall, ConsigneeName, PlatAccount,address,
                    Gender, Age
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
                    case 1:
                        this.setState({
                            CreditRatingImg: source
                        });
                        break;
                    case 2:
                        this.setState({
                            UserInfoImg: source
                        });
                        break;
                    case 3:
                        this.setState({
                            UserCenterImg: source
                        });
                        break;
                    case 4:
                        this.setState({
                            TaobaoValueImg: source
                        });
                        break;
                    case 5:
                        this.setState({
                            AccountLevelImg: source
                        });
                        break;
                    case 6:
                        this.setState({
                            VerifiedImg: source
                        });
                        break;
                    case 7:
                        this.setState({
                            BorrowingImg: source
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

    slidingComplete1(itemSelected) {
        console.log("item selected(from callback)" + itemSelected);
        this.setState({TaobaoValue: this.priceOptions[this.refs.slider.state.item].value});
    }

    _singleTapMultipleSelectedButtons_limited(interest, index) {
        if (this.state.multipleSelectedDataLimited.includes(interest)) {
            _.remove(this.state.multipleSelectedDataLimited, ele => {
                return ele === interest;
            });
            _.remove(this.state.multipleSelectedDataLimited_index, ele => {
                return ele === index;
            });
        } else {
            if (this.state.multipleSelectedDataLimited.length < 3)
                this.state.multipleSelectedDataLimited.push(interest);
            this.state.multipleSelectedDataLimited_index.push(index);
        }

        this.setState({
            multipleSelectedDataLimited: this.state.multipleSelectedDataLimited,
            multipleSelectedDataLimited_index: this.state.multipleSelectedDataLimited_index,
        });
    }

    _renderCategoryModal = () => {
        const {shopCategoryObj}  = this.props;
        let shopCategories= null;
        if(shopCategoryObj && shopCategoryObj.length>0) {
            shopCategories = shopCategoryObj.map(category=>{
                    return category.Name;
                }
            );
        }

        // categories = ["running", "riding", "reading", "coding", "Niuer"];

        return (
            <View style={{width: '100%',marginHorizontal: 15, maxHeight: 270, borderRadius: 10, backgroundColor:'white', paddingBottom: 30 }}>
                <View style={{borderTopLeftRadius:10, height: 40,borderTopRightRadius: 10, ...Styles.ColumnCenter, backgroundColor: Color.LightBlue1,paddingHorizontal: 30,}}>
                    <Text style={{color: 'white', fontSize: Styles.fontNormal}}>请选择经常购买的3-5个购物类目</Text>
                </View>
                <View style={{...Styles.ColumnCenter, justifyContent: 'center', alignItems: 'center',paddingHorizontal: 15,}}>
                    <View
                        style={{
                            flexWrap: "wrap",
                            flexDirection: "row",
                            justifyContent: "center"
                        }}
                    >

                        {shopCategories && shopCategories.map((interest, index)=> (
                            <SelectMultipleButton
                                key={interest}
                                buttonViewStyle={{
                                    borderRadius: 10,
                                    height: 30
                                }}
                                textStyle={{
                                    fontSize: Styles.fontNormal, color: Color.textNormal
                                }}
                                highLightStyle={{
                                    borderColor: "gray",
                                    backgroundColor: "transparent",
                                    textColor: Color.textNormal,
                                    borderTintColor: Color.LightBlue,
                                    backgroundTintColor: Color.LightBlue,
                                    textTintColor: "white"
                                }}
                                value={interest}
                                selected={this.state.multipleSelectedDataLimited.includes(interest)}
                                singleTap={valueTap =>
                                    this._singleTapMultipleSelectedButtons_limited(interest, index)
                                }
                            />
                        ))}
                    </View>
                </View>
                <View style={{ flexDirection:'row',justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                    <Button small onPress={()=>this.setState({bShowCategories: false})}
                            style={{paddingHorizontal: 20, marginRight: 20, backgroundColor:'#ededed', borderColor: Color.LightBorder, borderWidth: 1/PixelRatio.get()}}>
                        <Text style={{fontSize: Styles.fontNormal,color: Color.textNormal}}>取消</Text>
                    </Button>
                    <Button small style={{paddingHorizontal: 20, backgroundColor: Color.LightBlue}} onPress={()=>this.setState({bShowCategories: false})}>
                        <Text style={{fontSize: Styles.fontNormal,color: 'white'}}>确认</Text>
                    </Button>
                </View>
            </View>

        )
    };

    render() {
        const {PlatId} = this.props;
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
                        {this.props.PlatId===1 && (
                            <Item regular style={styles.itemStyle}>
                                <Input
                                    placeholderTextColor='#ccc'
                                    placeholder="请选择等级"
                                    value = {this.state.CreditRating}
                                    onChangeText={(value)=>this.setState({CreditRating: value})}
                                />
                            </Item>
                        )}
                        {this.props.PlatId===3 && (
                            <Item regular style={styles.itemStyle}>
                                <Input
                                    placeholderTextColor='#ccc'
                                    placeholder="帐户级别"
                                    value = {this.state.AccountLevel}
                                    onChangeText={(value)=>this.setState({AccountLevel: value})}
                                />
                            </Item>
                        )}
                        {this.props.PlatId===1 && (
                            <View style={{marginBottom: 10,...Styles.cardStyleEmpty, paddingVertical: 10, ...Styles.shadowStyle, ...Styles.borderBottomStyle}}>
                                <Text style={{...Styles.normalTextStyle}}>选择垫付金额</Text>
                                <View style={{...Styles.ColumnCenterRight}}>
                                    <View style={{...Styles.RowCenterRight}}>
                                        <Text style={{...Styles.normalTextStyle, marginRight: 10}}>淘气值</Text>
                                        <Text style={{color: Color.textInfoOrange}}>{this.state.TaobaoValue===500? ``:'500-'}{this.state.TaobaoValue}</Text>
                                    </View>

                                </View>
                                <View style={{flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingTop: 20}}>
                                    <SnapSlider ref="slider" containerStyle={styles.snapsliderContainer} style={styles.snapslider}
                                                itemWrapperStyle={styles.snapsliderItemWrapper}
                                                itemStyle={styles.snapsliderItem}
                                                items={this.priceOptions}
                                                labelPosition="bottom"
                                                defaultItem={this.state.defaultItem}
                                                onSlidingComplete={this.slidingComplete1} />
                                </View>
                            </View>
                        )}
                        {(this.props.PlatId===1 || this.props.PlatId===5) && (
                            <Item regular style={styles.itemStyle}>
                                <Input
                                    placeholderTextColor='#ccc'
                                    placeholder="订单编号"
                                    value = {this.state.OrderNo}
                                    onChangeText={(value)=>this.setState({OrderNo: value})}
                                />
                            </Item>
                        )}
                        {this.props.PlatId===1 && (
                            <View style={{...Styles.RowCenterLeft, paddingVertical: 10, marginTop: 10}}>
                                <Button small light onPress={()=> {this.setState({bShowCategories: true})}}>
                                    <Text style={{color: Color.textNormal, fontSize: Styles.fontNormal}}>购物类目</Text>
                                </Button>
                                <View style={{marginLeft: 5, flexWrap: 'wrap'}}><Text>{this.state.multipleSelectedDataLimited.toString()}</Text></View>
                            </View>
                        )}
                    </View>
                    <View style={{paddingHorizontal: 15, marginTop: 15, paddingVertical: 20, backgroundColor: 'white', ...Styles.shadowStyle}}>
                        <View style={{...Styles.RowCenterBetween}}>
                            <Text style={{fontSize: Styles.fontSmall}}>
                                点击上传图片（上传后，长按看大图，点击可更换图片）
                                <Text style={{color: Color.redColor, marginLeft: 20}}>截图示列</Text>
                            </Text>
                        </View>
                        <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                            {(PlatId===1 || PlatId===5) && (
                                <View style={{flex:1,marginRight: 6}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(1)}>
                                        { this.state.CreditRatingImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.CreditRatingImg} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{...Styles.ColumnCenter}}>
                                        <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>信用等级</Text>
                                    </View>
                                </View>
                            )}
                            {(PlatId===6 || PlatId===7) && (
                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(2)}>
                                        { this.state.UserInfoImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.UserInfoImg} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{...Styles.ColumnCenter}}>
                                        <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>个人信息</Text>
                                    </View>
                                </View>
                            )}
                            {(PlatId===3 || PlatId===5) && (
                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(3)}>
                                        { this.state.UserCenterImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.UserCenterImg} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{...Styles.ColumnCenter}}>
                                        <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>会员中心</Text>
                                    </View>
                                </View>
                            )}
                            {PlatId===1 && (
                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(4)}>
                                        { this.state.TaobaoValueImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.TaobaoValueImg} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{...Styles.ColumnCenter}}>
                                        <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>淘气值</Text>
                                    </View>
                                </View>
                            )}
                            {(PlatId===3) && (
                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(5)}>
                                        { this.state.AccountLevelImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.AccountLevelImg} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{...Styles.ColumnCenter}}>
                                        <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>帐户等级</Text>
                                    </View>
                                </View>
                            )}
                            {(PlatId===1 || PlatId===3) && (
                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(6)}>
                                        { this.state.VerifiedImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.VerifiedImg} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{...Styles.ColumnCenter}}>
                                        <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>实名认证</Text>
                                    </View>
                                </View>
                            )}
                            {(PlatId===1 || PlatId===3) && (
                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(7)}>
                                        { this.state.BorrowingImg === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.BorrowingImg} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{...Styles.ColumnCenter}}>
                                        <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>花呗图片</Text>
                                    </View>
                                </View>
                            )}

                            {(PlatId===5 || PlatId===6 || PlatId===7) && (
                                <View style={{flex:1, marginRight:3}}></View>
                            )}

                            {(PlatId===5 || PlatId===6 || PlatId===7) && (
                                <View style={{flex:1, marginRight:3}}></View>
                            )}
                            {(PlatId===6 || PlatId===7) && (
                                <View style={{flex:1, marginRight:3}}></View>
                            )}

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
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },

    snapsliderContainer: {
        borderWidth: 0,
        backgroundColor: 'transparent'
    },
    snapslider: {
        borderWidth: 0,
    },
    snapsliderItemWrapper: {
        borderWidth: 0
    },
    snapsliderItem: {
        borderWidth: 0,
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
export default connect(mapStateToProps, {getAreaLists,getMemberPlatformInfo, submitPlatformAccount,getAllShoppingCategories,initializeStatus,
    submitTaobaoAccount,submitJinDongAccount,submitPinDuoDuoAccount,submitBeautifulAccount
})(BindTabaoAccount);

