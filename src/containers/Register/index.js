/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'

import {Images, Constants} from '@common';
import {Image, View, UIManager} from 'react-native';
import {
    Container, Content, Item, Input, Form, Label, Icon,
    Button, Text, CheckBox, ListItem, Body, Card, CardItem,
    Left, Right
} from 'native-base';


class Register extends Component {

    render() {
        return (
            <Container>
                <Content padder style={styles.contentStyle}>
                    <Form >
                        <Item regular style={{borderRadius: 5, backgroundColor: 'white'}}>
                            <Icon style={{color: '#ccc'}} active name='mobile' type="FontAwesome" />
                            <Input placeholderTextColor='#ccc'  style={{padding: 0,  margin: 0}} placeholder="请输入手机号码，用于登录和找回密码" />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Icon style={{color: '#ccc'}} name='file-image-o' type="FontAwesome" />
                            <Input placeholderTextColor='#ccc' placeholder="请输入图像验证码" />
                        </Item>
                        <View style={{borderWidth: 1, borderRadius: 5, borderColor: '#ccc',  marginTop: 10, backgroundColor: '#fff'}}>
                            <View style={{flex: 1, flexDirection: 'row', paddingBottom: 0, marginBottom: 0}}>
                                <View style={{flex: 2, flexDirection: 'row', borderTopWidth: 0}}>
                                    <Icon name='commenting-o' type="FontAwesome" style={{marginTop: 10, marginLeft: 10, color: '#ccc', fontSize: 22, paddingTop: 3}}/>
                                    <Input placeholderTextColor='#ccc' placeholder="请输入图像验证码" />
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end', backgroundColor:'#6ccf8d'}}>
                                    <Button transparent style={{borderTopStartRadius:0,  borderBottomStartRadius: 0}}>
                                        <Text style={{paddingTop: 5, color: 'white'}}>获取验证码</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                        <Item regular style={styles.itemStyle}>
                            <Icon style={{color: '#ccc'}} name='lock'  />
                            <Input placeholderTextColor='#ccc' placeholder="请输入6到16位数字、字母组合登录密码" />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Image style={{marginLeft: 5, width: 20, height: 20}} source={Images.qqIcon}/>
                            <Input placeholderTextColor='#ccc' placeholder="请输入QQ号" />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Icon style={{color: '#ccc'}} name='envelope-o' type="FontAwesome" />
                            <Input placeholderTextColor='#ccc' placeholder="请输入邮箱" />
                        </Item>
                        <Item regular style={styles.itemStyle}>
                            <Icon style={{color: '#ccc'}} name='lock'  />
                            <Input placeholderTextColor='#ccc' placeholder="请输入邀请码" />
                        </Item>
                        <ListItem style={{marginLeft:10}}>
                            <CheckBox checked={true} color="black" />
                            <Body>
                            <Text>我已阅读并同意《拼金币用户协议》</Text>
                            </Body>
                        </ListItem>
                        <Button block style={{ marginTop: 10, borderRadius: 5, backgroundColor: '#5c91f0'}}>
                            <Text style={{fontSize: 20}}>登录</Text>
                        </Button>

                    </Form>
                    <Card transparent>
                        <CardItem>
                            <Body style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
                            <Text style={{marginTop: 10, color: '#000', fontSize: 18}}>已有账号?</Text>
                            <Button transparent>
                                <Text style={{ color: 'red', fontSize: 18}}>立即注册</Text>
                            </Button>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}

const styles ={
    contentStyle: {
        paddingLeft: 0, paddingRight: 0, backgroundColor:'#f8f8f8'
    },
    itemStyle: {
       borderRadius: 5, marginTop: 10, backgroundColor: 'white'
    }
};
export default Register;
