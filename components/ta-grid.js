import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import TAGridItem from './ta-grid-item';

export default class TAGrid extends Component {
    constructor(props) {
        super(props);
        console.log('the grid constructor props R ', props);

    }

    render() {
        return (
            <View>
                
                {(this.props.items && this.props.items.length > 0) ?
                    this.props.items.forEach(function(val,index) { 
                        <ListItem 
                            title={ val } 
                            badge={ index }
                        />
                    }):<ListItem title="Остановка" badge="22.40" />
                }
            </View>
        )
    }
}