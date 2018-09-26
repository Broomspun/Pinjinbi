import React, {Component} from 'react';
import {Platform, UIManager} from 'react-native'
import {connect} from 'react-redux';
import { Container, Content, Tabs, Tab } from 'native-base';
import {Images, Constants, Color, Styles} from '@common';

import {BrowseTab1, BrowseTab3, BrowseTab2, BrowseTab4} from "./tabs";
import {getMemberTaskList, initializeStatus} from "../../../actions";

class BrowseOrders extends Component {
    state = {selectedTab: 1};
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(this.props.user) {
            const {UserId, Token} = this.props.user;
            console.log('OrderStatusType',this.props.OrderStatusType);
            this.props.getMemberTaskList(UserId, Token, 1, 10, this.props.OrderStatusType, 2);
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
                    {/*<Tabs tabBarUnderlineStyle={styles.tabBarUnderlineStyle}>*/}
                        <Tab heading="未完成"  tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                            <BrowseTab1 />
                        </Tab>
                        <Tab  heading="已完成" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                            <BrowseTab2 />
                        </Tab>
                        <Tab heading="已撤销"  tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                            <BrowseTab3 />
                        </Tab>
                        <Tab  heading="申诉中" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} activeTextStyle={styles.activeTextStyle} textStyle={styles.textStyle} >
                            <BrowseTab4 />
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
export default connect(mapStateToProps, {getMemberTaskList, initializeStatus})(BrowseOrders);

