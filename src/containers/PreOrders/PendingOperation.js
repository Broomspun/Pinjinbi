import React, {Component} from 'react';
import {Platform, UIManager,Image, View, Text, TouchableOpacity} from 'react-native'

import { Container, Content, Button, Tabs, Tab, ScrollableTab } from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {Actions} from "react-native-router-flux/";
import {Tab1, Tab2, Tab3, Tab4, Tab5} from "./tabs";

class PendingOperation extends Component {
    state = {selectedTab: 1};
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }
    }
    componentDidUpdate() {
        console.log('tab event',this.state);
    }

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginTop: 10}}>
                    <Tabs tabBarUnderlineStyle={styles.tabBarUnderlineStyle}>
                        <Tab heading="待操作"  tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                            <Tab1 />
                        </Tab>
                        <Tab  heading="预购任务" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                            <Tab2/>
                        </Tab>
                        <Tab heading="待返款"  tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                            <Text>Tab2</Text>
                        </Tab>
                        <Tab  heading="发货中" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                           <Tab4/>
                        </Tab>
                        <Tab heading="待追评" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                            <Tab5/>
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        );
    }
}

const styles = {
  tabStyle: {
      backgroundColor: 'white',

  },
  activeTabStyle: {
      backgroundColor: 'white',
  },
  textStyle: {
      color: Color.textDark
  },
  activeTextStyle: {
      color: Color.LightBlue
  },
  tabBarUnderlineStyle:{
      backgroundColor: Color.LightBlue
  }
};

export default PendingOperation;
