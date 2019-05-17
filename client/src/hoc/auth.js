import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Authorize } from '../actions/user_actions';
// import CircularProcess from '@material-ui/core/CircularProgress';

export default function(ComposedClass, reload, adminRoute = null) {
    class AuthCheck extends Component {
        render() {
            return (
                <div>
                    
                </div>
            );
        }
    }

    

    return connect()(AuthCheck)
    
}