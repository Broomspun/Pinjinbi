import React, {Component} from 'react';
import {Platform, UIManager, Dimensions} from 'react-native'
import {connect} from 'react-redux';
import { Container, Content} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {MissionBlock} from '@components'
import {getTaskList, initializeStatus} from "../../actions";
import {INITIALIZE_TASK_LIST_STATUS} from "../../actions/types";

class BrowseTaskList extends Component {
    state = {};
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(this.props.user) {
            const {AccountId, PlatId, MaxAdvancePayMoney} = this.props;
            const {UserId, Token}  = this.props.user;
            this.props.getTaskList(UserId, Token, AccountId, PlatId, MaxAdvancePayMoney, 2);
        }
    }
    componentDidUpdate() {
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    componentWillUnmount() {
        this.props.initializeStatus(INITIALIZE_TASK_LIST_STATUS);
    }

    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginBottom: 10}}>
                    <MissionBlock point={21.35} goldValue={16.35} id={435354789230457432735} completed={false}/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} completed={false}/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} completed={false}/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} completed={false}/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} completed={false}/>
                    <MissionBlock point={22.35} goldValue={10.11} id={473894789230457012735} completed={false}/>
                </Content>
            </Container>
        );
    }
}
const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {taskListsObj,taskListsObjMsg,taskListsObjSuccessed} = state.taskReducer;
    return {user,taskListsObj,taskListsObjMsg,taskListsObjSuccessed};
};

export default connect(mapStateToProps, {getTaskList, initializeStatus})(BrowseTaskList);

