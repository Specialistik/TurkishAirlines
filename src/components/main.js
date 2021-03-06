import React, { Component } from 'react';
import { View, Button, FlatList, Text } from 'react-native';

export default class Main extends Component {
  constructor(props) {
    super(props);
    
    this.statuses = {
      'plane_stop': {
        title: 'Остановка',
        'depends': []
      },
      'plane_open': {
        title: 'Открытие',
        'depends': ['plane_stop'] 
      },
      'debarkment': {
        title: 'Высадка',
        'depends': ['plane_open']
      },
      'cleaning': {
        title: 'Уборка',
        'depends': ['debarkment']
      },
      'discharge': {
        title: 'Разгрузка',
        'depends': ['plane_open']
      },
      'refueling': {
        title: 'Заправка',
        'depends': ['debarkment']
      },
      'meals': {
        title: 'Борт. питание',
        'depends': ['debarkment']
      },
      'ma7': {
        title: 'МА-7',
        'depends': ['plane_open']
      },
      'water': {
        title: 'Вода',
        'depends': ['plane_open']
      },
      'readyness': {
        title: 'Готовность',
        'depends': ['meals', 'cleaning', 'refueling']
      },
      'embarkation': {
        title: 'Посадка',
        'depends': ['readyness']
      },
      'upload': {
        title: 'Загрузка',
        'depends': ['discharge']
      },
      'plane_close': {
        title: 'Закрытие',
        'depends': ['upload', 'discharge']
      },
      'mooring_tractor': {
        title: 'Швартовка тягача',
        'depends': ['plane_close']
      }
    }

    this.used_statuses = [];
    this.statuses_flat = ['plane_stop', 'plane_open', 'debarkment', 'cleaning', 'discharge', 'refueling', 'meals', 'ma7', 'water', 'readyness', 'embarkation', 'upload', 'plane_close', 'mooring_tractor'];

    this.state = {
      status_grid: [],
      button_list: ['plane_stop']
    }

    this.updateStatus = this.updateStatus.bind(this);
    this.dependenciesWerePicked = this.dependenciesWerePicked.bind(this);
  }

  addNullIfThisIsWhatHaveBeenWanted(time) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  }

  // Зависимости статуса уже были кликнуты, пока только для одной зависимости
  dependenciesWerePicked(status) {
    if (this.statuses[status]['depends'].length === 0) {
      return true;
    }

    this.statuses[status]['depends'].forEach(function(val) {
      if (this.used_statuses.includes(val)) {
        return true;
      }
      return false;
    });

    return false;
  }

  updateStatus(selectedStatus) {
    let button_list = [];
    this.used_statuses = [...this.used_statuses, selectedStatus];

    this.statuses_flat.forEach(function(val) {
      // Если выбранного статуса нет в списке уже использованных И если выбранный статус был в зависимости у того, по которому проходим 
      if ((!(this.used_statuses.includes(val))) && this.dependenciesWerePicked(val)) {
        console.log('button should appear ', val);
        button_list.push(val);
      } 
    });

    
    let currentdate = new Date(); 
    let normalized_data = { 
      timing: currentdate.getHours() + '.' + this.addNullIfThisIsWhatHaveBeenWanted(currentdate.getMinutes()),
      status: this.statuses[selectedStatus].title
    }

    this.setState(prevState => ({
      status_grid: [...prevState.status_grid, normalized_data],
      button_list: button_list,
    }));
  }

  render() {
    return (
      <View>
        <Text>krevedko</Text>
        <View>
          { (this.state.status_grid.length > 0) } ?
            <FlatList>
                data={this.state.status_grid}
                renderItem={({item}) => <Text>{item.timing}   {item.status}</Text>}
            </FlatList> : <View />
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
