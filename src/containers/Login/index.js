/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'

import {Images, Constants} from '@common';
import {View, UIManager} from 'react-native';
import {
    Container, Content, Item, Input, Form, Label, Icon,
    Button, Text, CheckBox, ListItem, Body, Card, CardItem,
    Left, Right
} from 'native-base';


class Login extends Component {

    render() {
        return (
            <Container>
                <Content style={{paddingLeft: 0, paddingTop: 15, paddingRight: 0, marginRight: 15, backgroundColor:'#f8f8f8'}}>
                    <Form >
                        <Item regular inlineLabel underline={false} style={{borderRadius: 5, backgroundColor: 'white'}}>
                            <Icon active name='mobile' type="FontAwesome" />
                            <Label>请输入手机号码</Label>
                            <Input />
                        </Item>
                        <Item regular inlineLabel underline={false} style={{borderRadius: 5, marginTop: 10, backgroundColor: 'white'}}>
                            <Icon active name='lock' />
                            <Label>请输入密码</Label>
                            <Input />
                        </Item>
                        <ListItem>
                            <CheckBox checked={true} color="black" />
                            <Body>
                            <Text>记住密码</Text>
                            </Body>
                        </ListItem>
                        <Button block style={{marginLeft: 15, marginTop: 10, borderRadius: 5, backgroundColor: '#5c91f0'}}>
                            <Text style={{fontSize: 20}}>登录</Text>
                        </Button>

                    </Form>
                    <Card transparent>
                        <CardItem>
                            <Body style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
                                <Button transparent >
                                    <Text style={{color: '#000', fontSize: 18}}>忘记密码</Text>
                                </Button>
                                <Text style={{marginTop: 10, color: '#000', fontSize: 18}}>还没有账号</Text>
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
export default Login;
