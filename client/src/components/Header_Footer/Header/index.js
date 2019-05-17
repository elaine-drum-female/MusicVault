import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

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
                        {this.state.showLinks(this.state.userlinks)}
                        </div>
                        <div className="bottom">
                            {this.state.showLinks(this.state.publiclinks)}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         user: state.user
//     }
// }

export default connect()(Header);