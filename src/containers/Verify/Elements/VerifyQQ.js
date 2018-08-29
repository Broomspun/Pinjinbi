/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'
import {View,Image} from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '@components';
import {Images, Constants,Styles, Color} from '@common';
import {Actions} from 'react-native-router-flux'

import {
    Button, Card,Container, Content, Form, Icon, Input,  Item, Text
} from 'native-base';
import {submitQQInfo} from './../../../actions'

class VerifyQQ extends Component {
    state = {qq: ''};

    constructor(props){
        super(props);
        this.state = {user: this.props.user, qq: this.props.qq};

    }

    componentDidUpdate(nextProps){

    }

    componentWillUpdate(){
    }

    submitQQ = ()=>{
        const {UserId, Token} = this.state.user;
        const {qq} = this.state;
        this.props.submitQQInfo(UserId, Token, qq);

    };

    render() {
        return (
            <Container style={{backgroundColor:Color.LightGrayColor}}>
                <Content>
                    <View style={{flex:1, flexDirection: 'row', backgroundColor:'transparent',
                        justifyContent: 'flex-start', marginTop: 10, marginHorizontal:15,...Styles.mb10}}>
                        <Image source={Images.alarm_notice} style={{width: 20, height: 20, marginRight: 5}}/>
                        <Text style={{color: Color.textNormal, fontSize: Styles.fontSmall}}>为了方便与你的联系，请务必填写真实的QQ号码</Text>
                    </View>
                    <Form>
                        <Item regular underline={false} style={styles.itemStyle}>
                            <Input
                                placeholderTextColor='#ccc'
                                placeholder="请输入QQ号码"
                                value = {this.state.qq}
                                style={{fontSize: Styles.fontSmall}}
                                onChangeText = {(text)=>this.setState({qq: text})}
                            />
                        </Item>
                        <View style={Styles.mt10}/>

                        <Button block style={styles.buttonStyle} onPress={this.submitQQ.bind(this)}>
                            <Text style={{fontSize: Styles.fontLarge}}>提交</Text>
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
    const {qq_res} = state.bindInfoData;
    return {qq_res};
};
export default connect(mapStateToProps, {submitQQInfo})(VerifyQQ);
