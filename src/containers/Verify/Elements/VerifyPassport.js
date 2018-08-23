/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {View,Image,TouchableOpacity,PixelRatio} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';
import {Actions} from 'react-native-router-flux'

import {
    Button,
    Card,
    Container,
    Content,
    Form,
    Icon,
    Input,
    Item,
    Text,
    Toast
} from 'native-base';
import ImagePicker from "react-native-image-picker";


class VerifyPassport extends Component {

    state={
        id_card_front_photo: null,
        id_card_back_photo: null,
        id_card_hand_held1: null,
        id_card_hand_held2: null
    };

    selectPhotoTapped(id) {
        const options = {
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
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                switch (id) {
                    case 0:
                        this.setState({
                            id_card_front_photo: source
                        });
                        return;
                    case 1:
                        this.setState({
                            id_card_back_photo: source
                        });
                        return;
                    case 2:
                        this.setState({
                            id_card_hand_held1: source
                        });
                        return;
                    case 3:
                        this.setState({
                            id_card_hand_held2: source
                        });
                         return;
                }

            }
        });
    }

    componentWillReceiveProps(nextProps){

    }

    componentWillUpdate(){
    }

    render() {
        return (
            <Container style={{backgroundColor:Color.LightGrayColor}}>
                <Content >
                    <Form>
                        <Item regular underline={false} style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入您的真实姓名"
                                value = {this.props.phone}
                            />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入您的身份证号码"

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

                        <Button block style={styles.buttonStyle}>
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

// const mapStateToProps = (state) => {
//     const {phone, password, remember, loading, error, user, msg} = state.loginForm;
//     return {phone, password, remember, loading, error, user, msg};
// };
// export default connect(mapStateToProps, {loginParameterUpdated, loginUser})(VerifyPassport);
export default VerifyPassport;
