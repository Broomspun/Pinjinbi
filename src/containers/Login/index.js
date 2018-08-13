/**
 * Created by Kim on 06/08/2018.
 */
import React, {Component} from 'react'

import {Images, Constants} from '@common';
import {View, UIManager} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';


let prepared = false;

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Header</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text>
                        This is Content Section
                    </Text>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full>
                            <Text>Footer</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
export default Login;
