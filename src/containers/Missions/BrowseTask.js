import React, {Component} from 'react';
import {Platform, UIManager, Dimensions} from 'react-native'

import { Container, Content} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {MissionBlock} from '@components'

class BrowseTask extends Component {
    state = {};
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
    }
    componentDidUpdate() {

    }

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginBottom: 10}}>
                    <MissionBlock point={21.35} goldValue={16.35} id={435354789230457432735} completed={false}/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} completed/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} completed/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} completed/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} completed/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} completed/>
                </Content>
            </Container>
        );
    }
}

export default BrowseTask;
