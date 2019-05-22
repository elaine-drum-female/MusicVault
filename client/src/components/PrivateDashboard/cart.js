import React, { Component } from 'react';
import UserLayout from '../../hoc/userlayout';
import UserProductBlock from '../utils/User/product_block';

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

    // removeFromCart = (id) => {
    //     this.props.dispatch(removeCartItem(id))
    //     .then(()=>{
    //         if(this.props.user.cartDetail.length <= 0){
    //             this.setState({
    //                 showTotal: false
    //             })
    //         } else{
    //             this.calculateTotal(this.props.user.cartDetail)
    //         }
    //     })
    // }

    render() {
        return (
            <UserLayout>
                <div>
                   <h1>My Cart</h1>
                   <div className="user_cart">
                   <UserProductBlock
                            products={this.props.user}
                            type="cart"
                            removeItem={(id)=> this.removeFromCart(id)}
                        />
                   </div>
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