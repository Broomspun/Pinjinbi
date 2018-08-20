import React, {Component} from 'react';
import {Platform, UIManager,Image, View, Text, TouchableOpacity} from 'react-native'


import { Container, Content, Button} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';


class TotalMissions extends Component {
    state = {visibleLotaModal: false};
    constructor(props) {
        super(props);


        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
    }
    componentWillMount(){

    }
    componentDidUpdate() {
    }

    render() {
        return(
            <Container>
                <Content>
                    <Text>
                        This is Content Section
                    </Text>
                </Content>
            </Container>
        );
    }
}

export default TotalMissions;
