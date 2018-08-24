import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Platform, UIManager, FlatList, View, PixelRatio} from "react-native";

import { Text, ListItem, Container, Content } from 'native-base';
import {Images, Constants, Color} from '@common';
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
            <ListItem onPress={()=>Actions.newsdetail({album: news.item})} style={{paddingTop:10, paddingBottom:10, borderBottomWidth: 1/PixelRatio.get(), borderColor: Color.borderNormal}}>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: Color.textNormal, fontSize: 14, marginRight: 5}}>{news.item.title}</Text>
                        {/*<Button style={{height: 24}} info rounded onPress={()=>Actions.newsdetail({album: news.item})}><Text style={{fontSize: 12}}>New</Text></Button>*/}
                        <View style={{flexDirection: 'column',justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: Color.primary, paddingLeft: 10, paddingRight:10, marginLeft: 5, height: 20}}>
                            <Text style={{fontSize: 10, color: 'white'}}>New</Text>
                        </View>
                    </View>
                    <Text style={{fontSize: 12, color:Color.textLight, alignSelf:'flex-start'}}>{news.item.publishedAt}</Text>
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
                <Content>
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
