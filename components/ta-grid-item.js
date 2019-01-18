import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';

export default class TAGridItem extends Component {
    constructor(props) {
        super(props);
        console.log('grid item props are ', props);
    }

    render() {
        return (
            <ListItem 
                title={ this.props.row_title }
                badge={ this.props.timing } 
            />
        )
    }
}