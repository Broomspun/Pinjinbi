/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {View,Image,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';
import {submitIdCardInfo} from './../../../actions'

import {
    Button,
    Card,
    Container,
    Content,
    Form,
    Input,
    Item,
    Text,
    Toast
} from 'native-base';
import ImagePicker from "react-native-image-picker";


class VerifyPassport extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: this.props.user,
            id_card_front_photo: null,
            id_card_back_photo: null,
            id_card_hand_held1: null,
            id_card_hand_held2: null,
            id_card_front_photo_raw: null,
            id_card_back_photo_raw: null,
            id_card_hand_held1_raw: null,
            id_card_hand_held2_raw: null,
            username: '蓝色',
            id_card:'450881199412087711'
        };

        console.log('passport', this.state);
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
                let source = { uri: 'data:image/jpeg;base64,' + response.data };

                switch (id) {
                    case 0:
                        this.setState({
                            id_card_front_photo: source, id_card_front_photo_raw: response.data
                        });
                        break;
                    case 1:
                        this.setState({
                            id_card_back_photo: source,id_card_back_photo_raw: response.data
                        });
                        break;
                    case 2:
                        this.setState({
                            id_card_hand_held1: source,id_card_front_held1_raw: response.data
                        });
                        break;
                    case 3:
                        this.setState({
                            id_card_hand_held2: source,id_card_front_held2_raw: response.data
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

    submitIdCard = () => {
        const {UserId, Token} = this.state.user;
        const {username,id_card, id_card_front_photo_raw,id_card_back_photo_raw, id_card_hand_held1_raw} = this.state;

        if(username==='') {
            Toast.show({
                text: `Please enter user name`, buttonText: "是", type: "danger"
            });
            return;
        }

        this.props.submitIdCardInfo(UserId, Token, username, id_card,id_card_front_photo_raw,id_card_back_photo_raw,id_card_hand_held1_raw);
    };

    render() {
        return (
            <Container style={{backgroundColor:Color.LightGrayColor}}>
                <Content >
                    <Form>
                        <Item regular underline={false} style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入您的真实姓名"
                                value = {this.state.username}
                                onChangeText={(value)=>this.setState({username: value})}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入您的身份证号码"
                                value = {this.state.id_card}
                                onChangeText={(value)=>this.setState({id_card: value})}
                            />
                        </Item>
                        <View style={{...Styles.cardStyleColumn1, flex:1}}>
                            <Text style={{color:Color.redColor}}>请上传身份证(头像面) 截图</Text>

                            <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                                <View style={{flex:1,marginRight: 6}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(0)}>
                                        { this.state.id_card_front_photo === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_front_photo} />
                                        }

                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(1)}>
                                        { this.state.id_card_back_photo === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_back_photo} />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:1, marginLeft: 3, marginRight:3}}>
                                </View>
                                <View style={{flex:1, marginLeft: 3}}>
                                </View>
                            </View>

                            <View style={{flex:1, ...Styles.RowCenter}}>
                                <View style={{flex: 1}}>
                                    <Text style={{alignSelf:'center',fontSize: Styles.fontSmaller, color: Color.textNormal}}>身份证正面照</Text>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{alignSelf:'center',fontSize: Styles.fontSmaller, color: Color.textNormal}}>身份证背面照</Text>
                                </View>
                                <View style={{flex:1}}>
                                </View>
                                <View style={{flex:1}}>
                                </View>
                            </View>

                            <Text style={{color:Color.redColor, marginTop: 35}}>请根据示例截图上传手持身份证</Text>

                            <View style={{flex:1,flexDirection:'row', justifyContent: 'space-between', paddingTop: 10}}>
                                <View style={{flex:1,marginRight: 6}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(2)}>
                                        { this.state.id_card_hand_held1 === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_hand_held1} />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:1, marginRight:3}}>
                                    <TouchableOpacity activeOpacity={.9} style={{...Styles.borderStyle}} onPress={()=>this.selectPhotoTapped(3)}>
                                        { this.state.id_card_hand_held2 === null ? <Text style={{fontFamily:'sans-serif-thin',fontSize: 72,color:Color.LightBlue}}>+</Text> :
                                            <Image style={{flex:1, width: undefined, aspectRatio:1,}} resizeMode={'cover'} source={this.state.id_card_hand_held2} />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:1, marginLeft: 3, marginRight:3}}>
                                </View>
                                <View style={{flex:1, marginLeft: 3}}>
                                </View>
                            </View>

                            <View style={{flex:1, ...Styles.RowCenter}}>
                                <View style={{flex: 1}}>
                                    <Text style={{alignSelf:'center',fontSize: Styles.fontSmaller, color: Color.textNormal}}>手持身份证照</Text>
                                </View>
                                <View style={{flex:1}}>
                                    <Text style={{alignSelf:'center',fontSize: Styles.fontSmaller, color: Color.textNormal}}>手持身份证照</Text>
                                </View>
                                <View style={{flex:1}}>
                                </View>
                                <View style={{flex:1}}>
                                </View>
                            </View>
                        </View>

                        <Button block style={styles.buttonStyle} onPress = {()=>this.submitIdCard()}>
                            <Text style={{fontSize: Styles.fontLarge}}>登录</Text>
                        </Button>
                    </Form>
                    <Card transparent >
                    </Card>
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
        borderRadius: 5, backgroundColor: 'white', marginTop: 10, height: 37, marginLeft: 15, marginRight: 15
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

const mapStateToProps = (state) => {
    const {id_res} = state.bindInfoData;
    return {id_res};
};
export default connect(mapStateToProps, {submitIdCardInfo})(VerifyPassport);

