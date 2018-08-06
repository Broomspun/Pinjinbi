import React, { Component } from 'react';
import { Container, Content, Text, Card, Header, Body, Button, Title, CardItem } from 'native-base';
import { increment, decrement } from '../actions/index.js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native'
class Counter extends Component{
    render(){
        console.log(this.props.count);
        return(
            <Container>
                <Header>
                    <Body>
                    <Title>Redux Counter</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Text>
                                {this.props.count}
                            </Text>
                        </CardItem>
                    </Card>
                    <Button block onPress= {() => this.props.increment()} style={styles.button1}>
                        <Text>Increment</Text>
                    </Button>
                    <Button block onPress= {() => this.props.decrement()} style={styles.button1}>
                        <Text>Decrement</Text>
                    </Button>

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
    },
    button1: {
        marginTop: 5,
    },
});

function mapStateToProps(state){
    return{
        count : state.count
    };
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({increment: increment, decrement: decrement}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(Counter);
