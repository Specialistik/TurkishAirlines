import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
//import TAGrid from './ta-grid';

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
      status_list : [],
      button_list : [
        'plane_stop'
      ]
    }
  }

  updateStatus(selectedStatus) {
    let currentdate = new Date(); 
    let normalized_data = { 
      timing: currentdate.getUTCHours() + '.' + currentdate.getUTCMinutes(),
      status: this.statuses[selectedStatus]
    }

    this.setState(prevState => ({
      status_list: [...prevState.status_list, normalized_data],
      last_status: selectedStatus
    }));
  }

  renderButton(status) {
    return <Button
      title={this.statuses[status]}
      onPress={() => this.updateStatus(status)}
    />
  }

  renderButtons() {
    if (!this.state.last_status) {
      return this.renderButton("plane_stop");
      //this.setState({last_status: "plane_stop"})
    } else {
      return this.renderButton("plane_open");
    }
  }

  componentDidMount() {
    this.updateStatus = this.updateStatus.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
  }

  render() {
    return (
      <View>
        { this.state.status_list.length > 0 ?
          <List>
            { this.state.status_list.map((val,index) => (
                <ListItem key={index} title={val.status} badge={{ value: val.timing}} /> 
            ))}
          </List> : <List></List>
        }
        <View>
          { this.state.button_list.map((val, index) => this.renderButtons())}
        </View>
      </View>
    )
  }
}
