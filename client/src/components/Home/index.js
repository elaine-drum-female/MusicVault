import React, { Component } from 'react';
import HeroSlider from './hero_slider';
import HeroPromo from './hero_promo';
import CardBlock from '../utils/card_block';
// import API from "../utils/API";

import { connect } from 'react-redux';
import { ProductsBySell , ProductsByArrival } from "../../actions/products_actions";


class Home extends Component {

   

    componentDidMount() {
        this.props.dispatch(ProductsBySell());
        this.props.dispatch(ProductsByArrival());
    }

    

    render() {
        return (
            <div>
                <HeroSlider/>
                <CardBlock
                    list={this.props.products.bySell}
                    title="Best Selling guitars"
                />
                <HeroPromo/>
                <CardBlock
                    list={this.props.products.byArrival}
                    title="New Arrivals"
                />
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