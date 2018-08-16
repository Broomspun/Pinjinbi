import React, {Component} from 'react';
import axios from 'axios';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {Platform, UIManager} from "react-native";

class Home extends Component {
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        this.state = {user: props.user};
        const {UserId, Token} = this.state.user;

        axios.get(`http://pjbapi.wtvxin.com/api/Login/GetMemberInfo?UserId=${UserId}&Token=${Token}`)
            .then((res) => {
                console.log('result', res)
                if(res.data.errcode===0) {
                    // this.setState(res.data.obj);
                    this.setState({user: {...res.data.obj, ...this.state.user}});

                    console.log(this.state);
                }
            })
            .catch(()=>{
            })
    }
    render() {
        return(
            <Container>
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

export default Home;
