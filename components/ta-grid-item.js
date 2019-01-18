import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';

export default class TAGridItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListItem title={this.props.title} badge={{ value: this.props.timing }}/>
        )
    }
}