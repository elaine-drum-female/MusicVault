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
                
                //If user is NOT authorized send them back to the register page
                if(!user.isAuth) {
                    if(reload) {
                        this.props.history.push('/register_login')
                    }
                } else {
                    if(reload === false) {
                        this.props.history.push('/user/dashboard')
                    } 
                }
                this.setState({loading:false})
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