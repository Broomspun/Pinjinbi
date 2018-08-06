/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';

import { Container, Accordion, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
const dataArray = [
    { title: "First Element", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];


type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {};
    }
  render() {
      return (
          <Container>
              <Header>
                  <Left>
                      <Button transparent>
                          <Icon name='menu' />
                      </Button>
                  </Left>
                  <Body>
                  <Title>Header123</Title>
                  </Body>
                  <Right />
              </Header>
              <Content>
                  <Text>
                      This is Content Section
                  </Text>
                  <Accordion
                      dataArray={dataArray}
                      headerStyle={{ backgroundColor: "#b7daf8" }}
                      contentStyle={{ backgroundColor: "#ddecf8" }}
                  />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
