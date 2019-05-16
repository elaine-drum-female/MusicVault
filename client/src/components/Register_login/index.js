import React from 'react';
import Login from "../Register_login/login";
import LinkButton from "../utils/button";

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
               <div className="register_login_container">
                   <div className="left">
                       <h1>New Customers</h1>
                       <p>Lorem ipsum dolor amet iPhone lyft ethical, umami coloring book fashion axe dreamcatcher gluten-free swag hoodie green juice yuccie glossier vaporware. XOXO pok pok shaman, shabby chic chicharrones drinking vinegar kale chips. Af PBR&B aesthetic squid unicorn mlkshk roof party keffiyeh actually humblebrag single-origin coffee cray waistcoat. Lumbersexual leggings put a bird on it poke cold-pressed next level authentic cronut. Jean shorts roof party bespoke, fam live-edge vape twee. </p>
                       <LinkButton 
                            type="default"
                            title="Make an account"
                            linkTo="/register"
                            addStyles={{
                                margin:'10px 0 0 0'
                            }}
                       />
                   </div>
                   <div className="right">
                        <h2>Registered customers</h2>
                        <p>If you have an account please log in.</p>
                        <Login />
                   </div>
               </div> 
            </div>
        </div>
    );
};

export default RegisterLogin;