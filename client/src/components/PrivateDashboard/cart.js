import React, { Component } from 'react';
import UserLayout from '../../hoc/userlayout';

import { connect } from 'react-redux';
import { getCartItems} from '../../actions/user_actions';

// import FontAWesomeIcon from '@fortawesome/react-fontawesome';
// import faFrown from '@fortawesome/fontawesome-free-solid/faFrown'
// import faSmile from '@fortawesome/fontawesome-free-solid/faSmile'

class UserCart extends Component {

    state = {
        loading: true,
        total:0,
        showTotal: false,
        showSuccess: false,
    }

    componentDidMount(){
        let cartItems = [];
        let user = this.props.user;

        if(user.userData.cart){
            if(user.userData.cart.length > 0){
                user.userData.cart.forEach(item=>{
                    cartItems.push(item.id)
                });
                this.props.dispatch(getCartItems(cartItems,user.userData.cart))
                .then(()=>{
                    // if(this.props.user.cartDetail.length > 0){
                    //     this.calculateTotal(this.props.user.cartDetail);
                    // }
                })
            }
        }
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