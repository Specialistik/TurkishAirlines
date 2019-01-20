import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem , List} from 'react-native-elements';

export default class TAGrid extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List>
                { this.props.items.map((val,index) => (
                    <ListItem key={index} title={val.status} badge={{ value: val.timing}} /> 
                ))}
            </List>
        )
    }
}