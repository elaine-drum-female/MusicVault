import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

class CheckboxCollapse extends Component {

    state = {
        open: false,
        checked: []
    }

    componentDidMount() {
        if(this.props.initState) {
            this.setState({
                open: this.props.initState
            })
        }
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default CheckboxCollapse;
