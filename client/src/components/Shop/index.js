import React, { Component } from 'react';
import PageTop from '../utils/page_top';

import { frets } from '../utils/Form/fixed_categories';

import { connect } from 'react-redux';
import { fetchBrands, fetchWoods } from '../../actions/products_actions';

import CheckboxCollapse from '../utils/checkboxCollapse';

class Shop extends Component {

    componentDidMount() {
        this.props.dispatch(fetchBrands());
        this.props.dispatch(fetchWoods());
    }

    handleFilters = (filters,category) => {
       console.log(filters);
    }

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
                            <CheckboxCollapse
                                initState={true}
                                title="Brands"
                                list={products.brands}
                                handleFilters={(filters) => this.handleFilters(filters, 'brand')}
                            />
                            <CheckboxCollapse
                                initState={false}
                                title="Frets"
                                list={frets}
                                handleFilters={(filters) => this.handleFilters(filters, 'frets')}
                            />
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

export default connect(mapStateToProps)(Shop);