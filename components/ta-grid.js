import React, { Component } from 'react';
import { Text } from 'react-native';
import { List } from 'react-native-elements';
import TAGridItem from './ta-grid-item';

export default class TAGrid extends Component {
    constructor(props) {
        super(props);

        //this.state = props;
        /*  
        <ListItem title="Посадкa" badge={{ value: '22.30' }}/>
        <ListItem title="Остановка" badge={{ value: '22.32' }}/>
        */
    }

    render() {
        return (
            (this.props.items && this.props.items.length > 0) ? 
                <List>
                    { this.props.items.forEach(function(val,index) { 
                        <TAGridItem title={ val } timing={ index }/>
                    }) };

            </List> : <Text> Самолёт ещё не приземлился </Text>
        )
    }
}