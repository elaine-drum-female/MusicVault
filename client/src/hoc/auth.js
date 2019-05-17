import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Authorize } from '../actions/user_actions';
import CircularProcess from '@material-ui/core/CircularProgress';

export default function(ComposedClass, reload, adminRoute = null) {
    class AuthCheck extends Component {

        state = {
            loading: true
        }

        render() {
            if(this.state.loading) {
                return (
                    <div className="main_loader">
                        <CircularProcess style={{
                            color:'#ccc'
                        }} thickness={7}/>
                    </div>
                )
            }
            return (
                <div>
                    component
                </div>
            );
        }
    }

    function mapStateToProps(state) {
        return {
            user : state.user
        }
    }

    return connect(mapStateToProps)(AuthCheck)
    
}