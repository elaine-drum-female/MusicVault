import React, { Component } from 'react';
import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid,resetFields} from '../../utils/Form/formActions';

import { connect } from 'react-redux';
import { fetchWoods } from '../../../actions/products_actions';

class ManageWoods extends Component {

    state = {
        formError:false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    label: 'Brand name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter the wood'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
        }
    }

    render() {
        return (
            <div>
                woods
            </div>
        );
    }
}

export default ManageWoods;