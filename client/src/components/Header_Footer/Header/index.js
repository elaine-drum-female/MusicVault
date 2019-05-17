import React, { Component } from 'react';

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
                            LINKS
                        </div>
                        <div className="bottom">
                            LINKS
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;