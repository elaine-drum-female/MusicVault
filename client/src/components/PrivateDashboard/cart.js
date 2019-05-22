import React, { Component } from 'react';
import UserLayout from '../../hoc/userlayout';

import { connect } from 'react-redux';
import FontAWesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'

class UserCart extends Component {

    state = {
        loading: true,
        total:0,
        showTotal: false,
        showSuccess: false,
    }

    

    render() {
        return (
            <UserLayout>
                <div>
                    cart
                </div>
            </UserLayout>
        );
    }
}

const mapToStateProps = ( state) => {
    return {
        user: state.user
    }
}

export default connect(mapToStateProps )(UserCart);