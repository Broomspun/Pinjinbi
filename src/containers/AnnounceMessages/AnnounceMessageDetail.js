import React, {Component} from 'react';

import {Platform, UIManager,Image, View, Linking, Text} from 'react-native'

import { Container, Content, Footer, FooterTab, Button} from 'native-base';
import {Images, Constants} from '@common';
import {Card, CardSection} from '@components'

class AnnounceMessageDetail extends Component {

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
                <Content padder>
                    <Card>
                        <CardSection>
                            <View style={thumbnailContainerStyle}>
                                <Image style={thumbnailStyle} source={{uri: this.props.album.thumbnail_image}}/>
                            </View>
                            <View style={headerContentStyle}>
                                <Text style={headerTextStyle}>{this.props.album.title}</Text>
                                <Text>{this.props.album.author}, {this.props.album.publishedAt}</Text>
                            </View>
                        </CardSection>
                        <CardSection>
                            <Image style={imageStyle} source={{uri: this.props.album.urlToImage}} />
                        </CardSection>
                        <CardSection>
                            <Text>{this.props.album.description}</Text>
                        </CardSection>
                        <View>
                            <Button block onPress = {()=>Linking.openURL(this.props.album.url)}><Text style={{color: 'white'}}>Read More</Text></Button>
                        </View>
                    </Card>
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

export default AnnounceMessageDetail;
