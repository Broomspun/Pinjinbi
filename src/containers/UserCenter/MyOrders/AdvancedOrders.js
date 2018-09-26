import React, {Component} from 'react';
import {Platform, UIManager} from 'react-native'

import { Container, Content, Tabs, Tab } from 'native-base';
import {Images, Constants, Color, Styles} from '@common';

import {AdvancedTab1, AdvancedTab2, AdvancedTab3, AdvancedTab4} from "./tabs";
import {getMemberTaskList, initializeStatus} from "../../../actions";
import connect from "react-redux/es/connect/connect";

class AdvancedOrders extends Component {
    state = {selectedTab: 1};
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(this.props.user) {
            const {UserId, Token} = this.props.user;
            console.log('OrderStatusType',this.props.OrderStatusType);
            this.props.getMemberTaskList(UserId, Token, 1, 10, this.props.OrderStatusType, 1);
        }
    }
    componentDidUpdate() {
        console.log('tab event',this.state);
    }

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginTop: 10}}>
                    <Tabs tabBarUnderlineStyle={styles.tabBarUnderlineStyle} initialPage={this.props.OrderStatusType-1} page={this.props.OrderStatusType-1}>
                        <Tab heading="未完成"  tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                            <AdvancedTab1 />
                        </Tab>
                        <Tab heading="已完成" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                            <AdvancedTab2 />
                        </Tab>
                        <Tab heading="已撤销"  tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                            <AdvancedTab3 />
                        </Tab>
                        <Tab  heading="申诉中" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                            <AdvancedTab4 />
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
const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {getMemberTaskListObj, getMemberTaskListStatus, getMemberTaskListMsg,} = state.taskReducer;
    const { OrderStatusType} = state.orderStatusReducer;
    return {user, getMemberTaskListObj, getMemberTaskListStatus, getMemberTaskListMsg,OrderStatusType};
};
export default connect(mapStateToProps, {getMemberTaskList, initializeStatus})(AdvancedOrders);
