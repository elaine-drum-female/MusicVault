import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authorizedUser } from '../actions/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function(ComposedClass, reload, adminRoute = null) {
    class AuthCheck extends Component {

        state = {
            loading: true
        }

        componentDidMount() {
            // Dispatch already injected props from mapStateToProps
            this.props.dispatch(authorizedUser()).then(response => {
                let user = this.props.user.userData;
                console.log(user);
            });
        }

        render() {
            if(this.state.loading) {
                return (
                    <div className="main_loader">
                        <CircularProgress style={{
                            color:'#ccc'
                        }} thickness={7}/>
                    </div>
                )
            }
            return (
                <div>
                   <ComposedClass {...this.props} user={this.props.user} />
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