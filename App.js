import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Button, ButtonGroup, ListGroup, ListGroupItem, Badge } from 'reactstrap';
//import { TextButton, RaisedTextButton } from 'react-native-material-buttons';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <ListGroup>
          <ListGroupItem> <Text>Посадка  </Text> <Badge pill><Text>22:30</Text></Badge> </ListGroupItem>
          <ListGroupItem> <Text>Остановка</Text> <Badge pill><Text>22:32</Text></Badge> </ListGroupItem>
        </ListGroup>
        <ButtonGroup>
          <Button>Уборка</Button>
          <Button>Борт-питание</Button>
          <Button>Вода</Button>
          <Button>МА-7</Button>
        </ButtonGroup>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
