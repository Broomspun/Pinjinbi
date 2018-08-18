import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Platform, UIManager, FlatList, View} from "react-native";

import { Container, Content, Icon, Button, Text, ListItem} from 'native-base';
import {Images, Constants} from '@common';
import { getNoticeLists} from './../../actions'
import {Actions} from 'react-native-router-flux';

class NoticeList extends Component {
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true); //enable Animation on Android
        }

        props.getNoticeLists();
    }


    componentWillMount(){
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
    }

    renderRow = (news)=> {
        return (
            <View style={{flex: 1, padding: 0, backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row', flex: 1, backgroundColor: '#f8f8f8', paddingTop: 10, paddingBottom: 10}}>
                    <View style={{flex: 1}} />
                    <View style={{flex: 1,padding: 5, backgroundColor: '#ebebeb', borderRadius: 50}}>
                        <Text style={{color: '#bbb',fontSize: 14, alignSelf:'center'}}>{news.item.publishedAt.substring(0,10)}</Text>
                    </View>
                    <View style={{flex: 1}} />
                </View>
                <View style={{marginBottom: 10, paddingLeft: 15, paddingRight:15, paddingTop: 10, paddingBottom: 0}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: '#222', fontSize: 14, paddingTop: 10, paddingBottom: 10, marginRight: 5}}>{news.item.title}</Text>
                        <Icon name="circle" type='FontAwesome' style={{color:'#ff6b23', fontSize: 10, marginBottom: 15}}/>
                    </View>
                    <View style={{borderTopWidth: 1,borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10, borderColor: '#dfdfdf'}}>
                        <Text  style={{fontSize: 14, color:'#5f5f5f', alignSelf:'flex-start'}}>{news.item.description.substring(0,80)+'...'}</Text>
                    </View>
                </View>
                <View style={{flex:1, flexDirection: 'row', justifyContent:'flex-end',paddingLeft: 15, paddingRight:15, marginBottom: 10}}>
                    <Button rounded info small iconRight onPress ={ ()=> Actions.noticedetail({album: news.item})} >
                        <Text>消息详情</Text>
                        <Icon name="chevron-right" type="Entypo" />
                    </Button>
                </View>
            </View>
        );
    };


    renderLists() {
        const {noticelists} = this.props;

        if (noticelists==null)
            return (<Text></Text>);

        return (
            <FlatList
                data= {noticelists}
                keyExtractor={(item, index) => index.toString()}
                renderItem = {this.renderRow}
            />
        ) ;
    }

    render() {
        return(
            <Container >
                <Content>
                    {this.renderLists()}
                </Content>
            </Container>
        );
    }
}


const mapStateToProps = (state) => {
    const {noticelists} = state.noticelistsRaw;
    return {noticelists};
};
export default connect(mapStateToProps, {getNoticeLists})(NoticeList);
// export default NewsList;
