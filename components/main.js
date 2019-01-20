import React, { Component } from 'react';
import { View } from 'react-native';
import { ButtonGroup, List, ListItem, Button } from 'react-native-elements';
import TAGrid from './ta-grid';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.statuses = {
      'plane_stop': 'Остановка',
      'plane_open': 'Открытие',
      'debarkment': 'Высадка',
      'cleaning': 'Уборка',
      'discharge': 'Разгрузка',
      'refueling': 'Заправка',
      'meals': 'Борт. питание',
      'ma7': 'МА-7',
      'water': 'Вода',
      'readyness': 'Готовность',
      'embarkation': 'Посадка',
      'upload': 'Загрузка',
      'plane_close': 'Закрытие',
      'mooring_tractor': 'Швартовка тягача'
    }

    this.state = {
      status_list : [
        {
          timing: '22.30',
          status: 'plane_stop'
        }
      ]
    }
    this.updateStatus = this.updateStatus.bind(this)
  }

  updateStatus(selectedStatus) {
    console.log('before state change ', this.state);
    let currentdate = new Date(); 
    let normalized_date = { 
      timing: currentdate.getHours() + ':' + currentdate.getMinutes(),
      status: selectedStatus
    }
    this.setState(prevState => ({
      status_list: [...prevState.status_list], normalized_date
    }));
    console.log('after state change ', this.state);

    /*
    <List>
      <ListItem title="Остановка" badge={{ value: "22.30"}} />
      <ListItem title="Открытие" badge={{ value: "22.32"}} />
    </List>
    */
  }

  render() {
    return (
      <View>
        <TAGrid 
          items={this.state.status_list}
        />
        <Button 
          key={"plane_stop"}
          title={this.statuses["plane_stop"]}
          onPress={() => this.updateStatus(this.key)}
        />
      </View>
    )
  }
}
