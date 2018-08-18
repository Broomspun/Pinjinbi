import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Platform, UIManager, FlatList, View} from "react-native";

import { Container, Content, Footer, FooterTab, Button, Text, ListItem, Icon, Left, Right } from 'native-base';
import {Images, Constants} from '@common';
import { getNewsLists} from './../../actions'
import {Actions} from 'react-native-router-flux';

class NewsList extends Component {
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        props.getNewsLists();
    }


    componentWillMount(){
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
    }

    renderRow = (news)=> {
        return (
            <ListItem onPress={()=>Actions.newsdetail({album: news.item})}>
                <View style={{flex: 1}}>
                    <View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 14, marginRight: 5}}>{news.item.title}</Text>
                            <Button style={{height: 24}} info rounded onPress={()=>Actions.newsdetail({album: news.item})}><Text style={{fontSize: 12}}>New</Text></Button>
                        </View>
                        <Text style={{fontSize: 14, color:'#bbb', alignSelf:'flex-start'}}>{news.item.publishedAt}</Text>
                    </View>
                </View>
            </ListItem>
        );
    };


    renderLists() {
        const {newslists} = this.props;

        if (newslists==null)
            return (<Text></Text>);

        return (
            <FlatList
                data= {newslists}
                keyExtractor={(item, index) => index.toString()}
                renderItem = {this.renderRow}
            />
        ) ;
    }

    render() {
        return(
            <Container>
                <Content padder>
                    {this.renderLists()}
                </Content>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    // const {user} = state.loginForm;
    const {newslists} = state.newslistsRaw;
    return {newslists};
};
export default connect(mapStateToProps, {getNewsLists})(NewsList);
// export default NewsList;
