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
      status_list : {
        '22:30': 'Тест статуса',
      }
    }

    //this.buttons = ['Уборка', 'Борт-питание', 'Вода', 'МА-7'];
    this.updateStatus = this.updateStatus.bind(this)
  }

  updateStatus(selectedIndex) {
    let status_list = this.state.status_list;
    let currentdate = new Date(); 
    status_list[selectedIndex] = currentdate.getHours() + ':' + currentdate.getMinutes();
    console.log('status list on update is ', status_list);
    //var currentdate = new Date(); 
    this.setState({status_list: status_list});
  }

        /*
        <ButtonGroup 
          onPress={this.updateIndex}
          buttons={this.buttons}
        />
        */

  render() {
    return (
      <View>
        <TAGrid 
          items={this.state.status_list}
        />
        <Button 
          key={"plane_stop"}
          title={this.statuses["plane_stop"]}
          onPress={() => this.updateStatus("plane_stop")}
        />
      </View>
    )
  }
}
