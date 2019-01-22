import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';

export default class Main extends Component {
  constructor(props) {
    super(props);
    
    this.statuses = {
      'plane_stop': {
        title: 'Остановка'
      },
      'plane_open': {
        title: 'Открытие',
        depends: ['plane_stop']
      },
      'debarkment': {
        title: 'Высадка',
        depends: ['plane_open']
      },
      'cleaning': {
        title: 'Уборка',
        depends: ['debarkment']
      },
      'discharge': {
        title: 'Разгрузка',
        depends: ['plane_open']
      },
      'refueling': {
        title: 'Заправка',
        depends: ['debarkment']
      },
      'meals': {
        title: 'Борт. питание',
        depends: ['debarkment']
      },
      'ma7': {
        title: 'МА-7',
        depends: ['plane_open']
      },
      'water': {
        title: 'Вода',
        depends: ['plane_open']
      },
      'readyness': {
        title: 'Готовность',
        depends: ['meals', 'cleaning', 'refueling']
      },
      'embarkation': {
        title: 'Посадка',
        depends: ['readyness']
      },
      'upload': {
        title: 'Загрузка',
        depends: ['discharge']
      },
      'plane_close': {
        title: 'Закрытие',
        depends: ['upload', 'discharge']
      },
      'mooring_tractor': {
        title: 'Швартовка тягача',
        depends: ['plane_close']
      }
    }

    this.statuses_flat = ['plane_stop', 'plane_open', 'debarkment', 'cleaning', 'discharge', 'refueling', 'meals', 'ma7', 'water', 'readyness', 'embarkation', 'upload', 'plane_close', 'mooring_tractor'];

    this.state = {
      status_list: [],
      status_grid: [],
      button_list: [
        'plane_stop'
      ]
    }

    this.updateStatus = this.updateStatus.bind(this);
    this.buttonShouldRender = this.buttonShouldRender.bind(this);
  }

  buttonShouldRender(selectedStatus) {
    if (this.state.status_list && this.state.status_list.length > 0) {
      this.statuses_flat.map((index, val) => {
        if (val == selectedStatus) {
          return true;
        }
        return false;
      });
    } else {
      if (selectedStatus == 'plane_stop')
        return true;
    }
    return false;
  }

  updateStatus(selectedStatus) {
    let button_list = [];
    this.statuses_flat.map((index, val) => {
      // Если выбранного статуса нет в списке отмеченных И если выбранный статус был в зависимости у того, по которому проходим 
      if ((this.buttonShouldRender(val) <= 0) && (this.statuses[val].depends.indexOf(selectedStatus) >= 0)) {
        button_list.push(val);
      } 
    });
    /*
    if (selectedStatus == 'plane_stop') {
      button_list = ['plane_open'];
    }
     
    if (selectedStatus == 'plane_open') {
      button_list = [
        'debarkment',
        'discharge',
        'water',
        'ma7'
      ]
    }

    ['debarkment', 'discharge', 'water', 'ma7'].map((val, index) => {
      if ((val != selectedStatus) && !(this.state.status_list.indexOf(val) > 0)) {
        button_list.push(val);
      }
    })
    */

    let currentdate = new Date(); 
    let normalized_data = { 
      timing: currentdate.getHours() + '.' + currentdate.getMinutes(),
      status: this.statuses[selectedStatus].title
    }

    this.setState(prevState => ({
      status_grid: [...prevState.status_grid, normalized_data],
      status_list: [...prevState.status_list, selectedStatus],
      button_list: button_list,
    }));
  }

  render() {
    return (
      <View>
        <View>
          { this.state.status_grid.length > 0 ?
            <List>
              { this.state.status_grid.map((val,index) => (
                  <ListItem key={index} title={val.status} badge={{ value: val.timing}} /> 
                ))
              }
            </List> : <List></List> 
          }
        </View>
        
        <View>
          { this.state.button_list.map((val, index) => (
            <Button
              key={index}
              title={this.statuses[val].title}
              onPress={() => this.updateStatus(val)}
            />
            ))
          }
        </View>
      </View>
    )
  }
}
