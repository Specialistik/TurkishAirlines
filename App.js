import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, ButtonGroup, List, ListItem } from 'react-native-elements';
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
      <View>
        <List>
          <ListItem title="Посадка   22:30" />
          <ListItem title="Остановка 22:32" />
        </List>
        <ButtonGroup>
          <Button title='Уборка' />
          <Button title='Борт-питание' />
          <Button title='Вода' />
          <Button title='МА-7' />
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
