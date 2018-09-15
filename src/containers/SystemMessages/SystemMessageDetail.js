import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, UIManager,Image, View, Linking, Text} from 'react-native'

import { Container, Content, Button} from 'native-base';
import {Images, Constants, Color} from '@common';
import {Card, CardSection,Spinner1} from '@components'

import {getSystemMessageDetail} from "../../actions";


class SystemMessageDetail extends Component {

    componentWillMount(){
    }


    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        if(props.user) {
            const {UserId, Token} = props.user;

            this.props.getSystemMessageDetail(UserId, Token, this.props.systemMsgId)
        }

    }
    render() {
        return(
            <Container>
                <Content padder style={{backgroundColor: '#f8f8f8'}}>
                    {this.props.systemMessageDetail && (
                    <View>
                        <CardSection>
                            <View style={headerContentStyle}>
                                <Text style={{...headerTextStyle, color:Color.textDark}}>{this.props.systemMessageDetail.Title}</Text>
                            </View>
                        </CardSection>
                        <CardSection>
                            <Text>{this.props.systemMessageDetail.Memo}</Text>
                        </CardSection>
                    </View>
                    )}
                </Content>
                {this.props.bSystemMessageDetailLoading ? <Spinner1 mode={'overlay'}/> : null}
            </Container>
        );
    }
}

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null
    }
};
const {headerContentStyle, headerTextStyle} = styles;
const mapStateToProps = (state) => {
    const {user} = state.loginForm;
    const {systemMessageDetail,bSystemMessageDetailLoading,system_detail_error_msg} = state.MessagesReducer;
    return {user, systemMessageDetail,bSystemMessageDetailLoading,system_detail_error_msg};
};

export default connect(mapStateToProps, {getSystemMessageDetail})(SystemMessageDetail);
