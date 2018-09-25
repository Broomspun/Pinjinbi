import React, {Component} from 'react';
import {Platform, UIManager, View, PixelRatio, Image} from 'react-native'
import {connect} from 'react-redux';
import {Button, Container, Content, FooterTab, Text, Toast} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';

import {getAppealListPage, initializeStatus} from './../../../actions';

import {
    INITIALIZE_GET_APPEAL_LIST_PAGE_STATUS,
} from "../../../actions/types";


class AppealsList extends Component {
    state = {isVisibleTaskContentModal: false};
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(this.props.user) {
            const {UserId, Token}  = this.props.user;
            this.props.getAppealListPage(UserId, Token,0, 10,1);
        }
    }

    componentDidUpdate() {
    }

    componentWillReceiveProps(nextProps) {
    }

    componentWillUnmount() {
        this.props.initializeStatus(INITIALIZE_GET_APPEAL_LIST_PAGE_STATUS);
    }

    _renderContent = () => {
        if(this.props.getAppealListPageObj===null )
            return (
                <View style={{flex: 1, ...Styles.ColumnCenter, height: Styles.height - 100}}>
                    <View style={{...Styles.ColumnCenter}}>
                        <Image source={Images.commision_empty_icon} style={{width: 60, height: 60}}/>
                        <Text style={{marginTop: 15, alignSelf: 'center', color: Color.textLight}}>No files any dispute</Text>
                    </View>
                </View>);

        if(this.props.getAppealListPageObj && this.props.getAppealListPageObj.length>0) {
            this.props.getAppealListPageObj.map((obj, index) => {
                return (
                    <View key={index}>
                        <View>
                            <View style={{...Styles.RowCenterBetween, ...Styles.borderBottomStyle}}>
                                <Text style={{alignSelf: 'flex-start', color: Color.LightBlue, fontSize: Styles.fontSmall}}>【任务问题】{obj.Question}</Text>
                                <View style={{alignSelf: 'flex-end', borderRadius: 10, borderWidth: 1/PixelRatio.get(), borderColor: Color.Border}}>
                                    <Text style={{color: Color.LightBlue, fontSize: Styles.fontSmall}}>【任务问题】{obj.StatusText}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{...Styles.RowCenterBetween, ...Styles.borderBottomStyle}}>
                                <Text style={{alignSelf: 'flex-start', color: Color.LightBlue, fontSize: Styles.fontSmall}}>商家ID：{obj.Id}</Text>
                                <View style={{alignSelf: 'flex-end', borderRadius: 10, borderWidth: 1/PixelRatio.get(), borderColor: Color.Border}}>
                                    <Text style={{color: Color.LightBlue, fontSize: Styles.fontSmall}}>{obj.CreateTime.substring(0,10)}</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                )
            })
        }
    };


    render() {
        return(
            <Container style={{backgroundColor: Color.LightGrayColor}}>
                <Content style={{marginBottom: 10}}>
                    <View style={{flex:1, ...Styles.cardStyleEmpty,...Styles.shadowStyle, paddingVertical: 10}}>
                        {this._renderContent()}
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {getAppealListPageObj,getAppealListPageStatus
    } = state.taskReducer;

    return {user,getAppealListPageObj,getAppealListPageStatus
    };
};

export default connect(mapStateToProps, {getAppealListPage, initializeStatus})(AppealsList);

