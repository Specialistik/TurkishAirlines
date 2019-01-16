import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, ButtonGroup, List, ListItem } from 'react-native-elements';

export default class Main extends Component {
  constructor(props) {
    super(props);
    /*
    this.buttons = ['Уборка', 'Борт-питание', 'Вода', 'МА-7'];
    down there, if you know what I mean <ButtonGroup buttons={this.buttons} />
    */
    /*
    this.buttons = [
      <Button title='Уборка' />,
      <Button title='Борт-питание' />,
      <Button title='Вода' />,
      <Button title='МА-7' />
    ];
    */
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render() {
    return (
        <View>
            <List>
                <ListItem title="Посадка   22:30" />
                <ListItem title="Остановка 22:32" />
            </List>

            <Button title='Уборка' />,
            <Button title='Борт-питание' />,
            <Button title='Вода' />,
            <Button title='МА-7' />
      </View>
    );
  }
}
