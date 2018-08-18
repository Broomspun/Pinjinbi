import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Platform, UIManager, FlatList} from "react-native";

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
                <Left>
                    <Text>{news.item.title}</Text>
                </Left>
                <Right>
                    <Icon name="arrow-forward" />
                </Right>
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
                <Footer>
                    <FooterTab>
                        <Button full>
                            <Text>Footer</Text>
                        </Button>
                    </FooterTab>
                </Footer>
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
