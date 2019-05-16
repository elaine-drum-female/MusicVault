import React, { Component } from 'react';
import FormField from '../utils/Form/formfield';
// import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { connect } from 'react-redux';
// import { loginUser } from '../../actions/user_actions';

class Register extends Component {
    state = {
        formError: false,
        formSuccess:'',
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Please enter your name'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },

            lastname: {
                element: 'input',
                value: '',
                config:{
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Please enter your lastname'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },

            email: {
                element: 'input',
                value: '',
                config:{
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },

            password: {
                element: 'input',
                value: '',
                config:{
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },

            confirmPassword: {
                element: 'input',
                value: '',
                config:{
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confirm password'
                },
                validation:{
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage:''
            }
        }
    }

    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={(event) => this.submitForm(event)}>
                            <h2>Personal Profile</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                    <FormField 
                                        id={'name'}
                                        formdata={this.state.formdata.name}
                                        change={(element) => this.updateForm(element)}
                                    />
                                    </div>
                                    <div className="block">
                                    <FormField 
                                        id={'lastname'}
                                        formdata={this.state.formdata.lastname}
                                        change={(element) => this.updateForm(element)}
                                    />
                                    </div>
                                </div>
                                <div>
                                    <FormField 
                                        id={'email'}
                                        formdata={this.state.formdata.email}
                                        change={(element) => this.updateForm(element)}
                                    />
                                </div>
                                <h2>Verify Password</h2>
                                <div className="form_block_two"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Register);
