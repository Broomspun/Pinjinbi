/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {View, Image, TouchableOpacity, StyleSheet, PixelRatio} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';

import {Button, Card, Container, Content, Form, Icon, Input, Item, Text, Toast} from 'native-base';
import ImagePicker from "react-native-image-picker";
import {Actions} from "react-native-router-flux";
import RNPickerSelect from 'react-native-picker-select';
import {getAreaLists} from "@actions";

class BindMushroomStreetAccount extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            id_card_front_photo: null,
            id_card_back_photo: null,
            id_card_hand_held1: null,
            id_card_hand_held2: null,
            username: props.user.id_card.UserRName || 'none',
            id_card: props.user.id_card.Idcard || 'none',
            mushroom_username: '',
            mushroom_recipient: '',
            mushroom_phone: '',
            mushroom_full_address: '',
            age: '',
            order_no: '',
            ProvinceCode: undefined,
            CityCode: undefined,
            DistrictCode: undefined,
        };
    }
    componentDidMount(){
        this.props.getAreaLists('Province');
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

    componentWillReceiveProps(nextProps){

    }

    componentWillUpdate(){
    }
    setProvinceCode = (value)=>{
        this.setState({
            ProvinceCode: value,
        });

        this.props.getAreaLists('City', value);

    };

    setCityCode = (value) => {
        this.setState({
            CityCode: value,
        });

        this.props.getAreaLists('District', value);
    };
    submitIdCard = () => {
        const {UserId, Token} = this.state.user;
        const {username,id_card, id_card_front_photo,id_card_back_photo, id_card_hand_held1} = this.state;

        if(username==='') {
            Toast.show({
                text: `Please enter user name`, buttonText: "是", type: "danger"
            });
            return;
        }

        this.props.submitIdCardInfo(UserId, Token, username, id_card, id_card_front_photo.uri, id_card_back_photo.uri, id_card_hand_held1.uri);
    };

    render() {
        const {IdcardInHand} = this.props.user.id_card;
        return (
            <Container style={{backgroundColor:Color.LightGrayColor}}>
                <Content style={{paddingBottom: 20}}>
                    <View style={{padding: 15, marginBottom: 20}}>
                        <View style={{marginBottom: 15}}>
                            <Text style={{fontSize: Styles.fontLarge, color: Color.textNormal}}>注意事项</Text>
                        </View>
                        <View style={{...Styles.ColumnCenterLeft}}>
                            <Text style={{flexWrap: 'wrap', color: Color.redColor}}>1、请输入美丽说用户名</Text>
                            <Text style={{flexWrap: 'wrap', color: Color.textNormal}}>2、请确保收货地址和收货联系人真实具体，并保证和美丽说上下单的收 货地址信息一致</Text>
                            <Text style={{flexWrap: 'wrap', color: Color.textNormal}}>3、请确认多个美丽说号之间使用不同的收货信息（收货姓名，地址和电话不同）</Text>
                            <Text style={{flexWrap: 'wrap', color: Color.textNormal}}>4、账号审核人工进行，正常一个工作日内完成，只有审核通过的买号才能接受任务</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{fontSize: Styles.fontLarge, color: Color.textNormal, paddingHorizontal: 15}}>账号信息</Text>
                    </View>
                    <View style={{...Styles.shadowStyle, paddingHorizontal: 15, backgroundColor: 'white', paddingBottom: 20}}>
                        <Item regular underline={false} style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入京东用户名"
                                value = {this.state.mushroom_username}
                                onChangeText={(value)=>this.setState({mushroom_username: value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="收货人姓名"
                                value = {this.state.mushroom_recipient}
                                onChangeText={(value)=>this.setState({mushroom_recipient: value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="收货人手机号"
                                value = {this.state.mushroom_phone}
                                onChangeText={(value)=>this.setState({mushroom_phone: value})}
                            />
                        </Item>
                        {/*<TouchableOpacity style={{flex:1, flexDirection: 'row', alignItems: 'center',paddingVertical: 10, ...Styles.bottomBorderStyle}}>*/}
                            {/*<View style={{flex:1, flexDirection: 'row', alignItems:'center'}}>*/}
                                {/*<Text style={{color: Color.textLight}}>请输入详细地址</Text>*/}
                            {/*</View>*/}
                            {/*<View style={{flex:1,}}>*/}
                                {/*<View style={{...Styles.RowCenterRight}} activeOpacity={0.8}>*/}
                                    {/*<Text style={{color: Color.textNormal}}>广东深圳宝安区</Text>*/}
                                    {/*<Icon type='Entypo' name='chevron-thin-right' style={{marginLeft: 10, color:Color.textNormal, fontSize: Styles.fontNormal}}/>*/}
                                {/*</View>*/}
                            {/*</View>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<Item regular style={styles.itemStyle}>*/}
                            {/*<Input*/}
                                {/*placeholderTextColor='#ccc'*/}
                                {/*placeholder="请输入详细地址"*/}
                                {/*value = {this.state.mushroom_full_address}*/}
                                {/*onChangeText={(value)=>this.setState({mushroom_full_address: value})}*/}
                            {/*/>*/}
                        {/*</Item>*/}

                        {this.props.provinces && (
                            <RNPickerSelect
                                placeholder={{
                                    label: '选择省份',
                                    value: null,
                                }}
                                items={this.props.provinces}
                                onValueChange={(value) => { this.setProvinceCode(value)}}
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
                                onValueChange={(value) => { this.setCityCode(value)}}
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
                                onValueChange={(value) => {
                                    this.setState({DistrictCode: value})
                                }}
                                style={{ ...pickerSelectStyles }}
                                value={this.state.DistrictCode}
                            />
                        )}
                    </View>
                    <View style={{paddingHorizontal: 15, marginTop: 15, paddingVertical: 20, backgroundColor: 'white', ...Styles.shadowStyle}}>
                        <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                            <View style={{flex:1,marginRight: 6}}>
                                <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(2)}>
                                    { this.state.id_card_hand_held1 === null && IdcardInHand==='' ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                        <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_hand_held1?this.state.id_card_hand_held1:{uri: IdcardInHand}} />
                                    }
                                </TouchableOpacity>
                                <View style={{...Styles.ColumnCenter}}>
                                    <Text style={{fontSize: Styles.fontSmall, color: Color.textNormal}}>我的页面</Text>
                                </View>
                            </View>
                            <View style={{flex:1, marginRight:3}}>

                            </View>
                            <View style={{flex:1, marginRight:3}}>

                            </View>
                            <View style={{flex:1, marginRight:3}}>

                            </View>
                        </View>
                    </View>

                    <View style={{paddingHorizontal: 15}}>
                        <Text style={{marginTop: 25, fontSize: Styles.fontSmall, color: Color.textNormal}}>未通过审核的账号信息，可以直接修改提交</Text>
                    </View>

                    <View style={{paddingBottom: 15}}>
                    <Button block style={styles.buttonStyle} onPress = {()=>this.submitIdCard()}>
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
    return {user, provinces, cities, districts};
};
export default connect(mapStateToProps, {getAreaLists})(BindMushroomStreetAccount);

