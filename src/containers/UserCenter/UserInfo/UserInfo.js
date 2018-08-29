import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, UIManager,Image, View, Text, TouchableOpacity, AsyncStorage} from 'react-native'
import { Container, Content, Button, Icon} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from "react-native-router-flux/";
import Switch from 'react-native-switch-pro'

class UserInfo extends Component {
    state = {bSound: true}
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
        console.log(props);
    }
    componentDidUpdate() {

    }

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content >
                    <View style={{...Styles.cardStyleEmpty, paddingVertical: 10, marginTop: 10}}>
                        <TouchableOpacity style={{...Styles.RowCenterLeft, paddingBottom: 5}} onPress={()=>Actions.UserAvatar()}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <View style={{width: 20, ...Styles.ColumnCenter}}>
                                    <Image source={Images.user_info_icon_01} style={{width: 18, height: 20}} />
                                </View>
                                <Text style={{marginLeft: 10}}>头像</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...Styles.RowCenterLeft, paddingBottom: 5}}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <View style={{width: 20, ...Styles.ColumnCenter}}>
                                    <Image source={Images.user_info_icon_02} style={{width: 11, height: 18}} />
                                </View>
                                <Text style={{fontSize: Styles.fontSmaller, marginLeft: 10}}>用户手机号</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{...Styles.RowCenterLeft, paddingBottom: 5}}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <View style={{width: 20, ...Styles.ColumnCenter}}>
                                    <Image source={Images.user_info_icon_03} style={{width: 14, height: 18}} />
                                </View>
                                <Text style={{fontSize: Styles.fontSmaller, marginLeft: 10}}>用户密码</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Icon type='EvilIcons' name="chevron-right" style={{color: Color.textLight, alignSelf:'flex-end'}} />
                            </View>
                        </TouchableOpacity>
                        <View style={{...Styles.RowCenterLeft, paddingBottom: 5}}>
                            <View style={{flex:2, ...Styles.RowCenterLeft}}>
                                <View style={{width: 20, ...Styles.ColumnCenter}}>
                                    <Image source={Images.user_info_icon_04} style={{width: 18, height: 18}} />
                                </View>
                                <Text style={{fontSize: Styles.fontSmaller, marginLeft: 10}}>声音</Text>
                            </View>
                            <View style={{flex:1, ...Styles.RowCenterRight}}>
                                <Switch  value={this.state.bSound} />
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
    return {user};
};
export default connect(mapStateToProps, {})(UserInfo);
