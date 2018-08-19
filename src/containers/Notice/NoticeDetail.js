import React, {Component} from 'react';

import {Platform, UIManager,Image, View, Linking, Text} from 'react-native'

import { Container, Content, Button} from 'native-base';
import {Images, Constants, Color} from '@common';
import {Card, CardSection} from '@components'

class NoticeDetail extends Component {

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
                <Content padder style={{backgroundColor: '#f8f8f8'}}>
                    <View>
                        <CardSection>
                            <View style={headerContentStyle}>
                                <Text style={{...headerTextStyle, color:Color.textDark}}>{this.props.album.title}</Text>
                            </View>
                        </CardSection>
                        <CardSection>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{color: Color.textLight, paddingTop: 5, paddingBottom: 5}}>拼金币, {this.props.album.publishedAt}</Text>
                                <View style={{flexDirection: 'column',justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: Color.primary, paddingLeft: 10, paddingRight:10, marginLeft: 5, height: 20}}>
                                    <Text style={{fontSize: 10, color: 'white'}}>公告</Text>
                                </View>
                            {/*<Image style={imageStyle} source={{uri: this.props.album.urlToImage}} />*/}
                            </View>
                        </CardSection>
                        <CardSection>
                            <Text>{this.props.album.description}</Text>
                        </CardSection>
                        <View>
                            <Button block onPress = {()=>Linking.openURL(this.props.album.url)}><Text style={{color: 'white'}}>Read More</Text></Button>
                        </View>
                    </View>
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

export default NoticeDetail;
