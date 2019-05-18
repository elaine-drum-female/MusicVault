import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Header extends Component {

    state={
        publiclinks: [
            {
                name:"Home",
                linkTo:'/',
                public:true
            },

            {
                name:"Categories",
                linkTo:'/shop',
                public:true
            }
        ],

        userlinks: [
            {
                name:"My Cart",
                linkTo:'/user/shopping-cart',
                public:false
            },
            {
                name:"My Account",
                linkTo:'/user/dashboard',
                public:false
            },
           {
                name:"Log In",
                linkTo:'/register_login',
                public:true
            }, 
           {
                name:"Log Out",
                linkTo:'/user/logout',
                public:false
            } 
            
        ]
    }

    cartLink = (item, i) => {
        const user = this.props.user.userData;

        return (
            <div className="cart_link" key={i}>
                <span>{user.cart ? user.cart.length:0}</span>
                <Link to={item.linkTo}>
                    {item.name}
                </Link>
            </div>
        )
    }

    defaultLink = (item, i) => (
        <Link to={item.linkTo}  key={i}>
            {item.name}
        </Link>
    )

    showLinks = (type) => {
        let list = [];

        if(this.props.user.userData) {
            type.forEach((item)=> {
                //If user is NOT authenticated
                if(!this.props.user.userData.isAuth) {
                    //And check if the list says public and matches true ONLY
                    if(item.public === true) {
                        //Push only the items that list TRUE
                        list.push(item)
                       }
                    } else {
                        //If user is NOT logged in, do NOT show the log in because he/she is logged in already
                        if(item.name !== "Log In") {
                            list.push(item)
                        }
                    }
            });
        }

        // Loop over this list and return an item and iteration
        return list.map((item, i) => {
            // If the user is NOT logged in remove My Cart and return to default link
            if(item.name !== "My Cart") {
                //defaultLink is a link from react-router , two prop and text
                return this.defaultLink(item, i)
            } else {
                return this.cartLink(item, i)
            }
        });

    }


    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">
                            MUSICVAULT
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                        {this.showLinks(this.state.userlinks)}
                        </div>
                        <div className="bottom">
                            {this.showLinks(this.state.publiclinks)}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Header);