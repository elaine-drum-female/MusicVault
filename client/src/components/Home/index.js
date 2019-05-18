import React, { Component } from 'react';
import HeroSlider from './hero_slider';
import HeroPromo from './hero_promo';
// import API from "../utils/API";

import { connect } from 'react-redux';
import { ProductsBySell , ProductsByArrival } from "../../actions/products_actions";


class Home extends Component {

   

    componentDidMount() {
        this.props.dispatch(ProductsBySell());
    }

    

    render() {
        return (
            <div>
                <HeroSlider/>
                <HeroPromo/>
            </div>
        );
    }
}

const mapStateToProps = ( state ) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Home);