import React, {Component} from 'react';

import {Platform, UIManager,Image, View, Linking, Text} from 'react-native'

import { Container, Content, Left, Right, Button} from 'native-base';
import {Images, Constants, Color, Styles} from '@common';
import {CardBlock} from '@components'

class Promotion extends Component {

    componentWillMount(){
    }


    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

    }
    render() {
        return(
            <Container>
                <Content style={{backgroundColor: Color.mainBackground, paddingTop: 15}}>
                    <CardBlock cardTitle="我的邀请码" cardTitleColor={Color.textNormal} cardValue='131143002' cardValueColor={Color.textInfoBlue}/>
                    <CardBlock cardTitle="已完成任务单数" cardTitleColor={Color.textNormal} cardValue='1' cardValueColor={Color.textInfoBlue}/>
                    <CardBlock cardTitle="推广总数" cardTitleColor={Color.textNormal} cardValue='0' unitColor={Color.textNormal} cardValueColor={Color.textInfoOrange} cardUint='个'>
                        <Text style={{alignSelf:'flex-end', color: Color.textNormal}}>个</Text>
                    </CardBlock>
                </Content>
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

const {thumbnailStyle, headerContentStyle, thumbnailContainerStyle,headerTextStyle,imageStyle} = styles;

export default Promotion;
