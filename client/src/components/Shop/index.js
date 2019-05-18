import React, { Component } from 'react';
import PageTop from '../utils/page_top';

import { connect } from 'react-redux';
import { fetchBrands, fetchWoods } from '../../actions/products_actions';

class Shop extends Component {


    render() {
        const products = this.props.products;

        return (
            <div>
                <PageTop 
                    title="Browse Products"
                />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            left
                        </div>
                        <div className="right">
                            right
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect()(Shop);