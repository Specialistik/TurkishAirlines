import React, { Component } from 'react';
import { Button, View, ScrollView, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

var styles = StyleSheet.create({
  listItem: {
    paddingTop: 5,
    paddingBottom: 5
  },
  button: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: 'blue',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 32,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 24,
    textAlign:'center',
  }
});

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
    };

    this.used_statuses = [];
    this.statuses_flat = ['plane_stop', 'plane_open', 'debarkment', 'cleaning', 'discharge', 'refueling', 'meals', 'ma7', 'water', 'readyness', 'embarkation', 'upload', 'plane_close', 'mooring_tractor'];

    this.state = {
      status_grid: [],
      button_list: ['plane_stop']
    };

    this.updateStatus = this.updateStatus.bind(this);
    this.dependenciesWerePicked = this.dependenciesWerePicked.bind(this);
    this.addNullIfTimeIsFucked = this.addNullIfTimeIsFucked.bind(this);
  }

  addNullIfTimeIsFucked(time) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  }

  // Зависимости статуса уже были кликнуты, пока только для одной зависимости
  dependenciesWerePicked(status) {
    if (this.statuses[status]['depends'].length == 0) {
      return true;
    }

    let used_statuses = this.used_statuses;
    let result = true;
    this.statuses[status]['depends'].forEach(function(val) {
      if (!used_statuses.includes(val)) {
        result = false;
      }
    });
    return result;
  }

  updateStatus(selectedStatus) {
    let button_list = [];
    this.used_statuses.push(selectedStatus);
    var that = this;

    this.statuses_flat.forEach(function(val) {
      // Если выбранного статуса нет в списке уже использованных И выполнены зависимости
      if ((!(that.used_statuses.includes(val))) && that.dependenciesWerePicked(val)) {
        button_list.push(val);
      } 
    });

    let currentdate = new Date(); 
    let normalized_data = { 
      timing: currentdate.getHours() + '.' + this.addNullIfTimeIsFucked(currentdate.getMinutes()),
      status: this.statuses[selectedStatus].title
    };

    this.setState(prevState => ({
      status_grid: [...prevState.status_grid, normalized_data],
      button_list: button_list,
    }));
  }

  render() {
    return (
      <View>
        <View>
          { this.state.button_list.map((val, index) => (
            <Button 
              key={index}
              title={this.statuses[val].title}
              onPress={() => this.updateStatus(val)}
              styles={styles.button}
            />
            ))
          }
        </View>

        <ScrollView>
          { (this.state.status_grid.length > 0) ?
            this.state.status_grid.map((val,index) => (
              <ListItem key={index} title={val.status} badge={{ value: val.timing}} style={styles.listItem} />
            )) : <View />
          }
        </ScrollView>
      </View>
    );
  }
}
