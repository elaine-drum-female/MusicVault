import React, { Component } from 'react';
import PageTop from '../utils/page_top';

import { connect } from 'react-redux';


class ProductPage extends Component {

    componentDidMount(){
        const id = this.props.match.params.id;
        console.log(id);
    }

    
    
    render() {
        return (
            <div>
                <PageTop
                    title="Product detail"
                />               
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ProductPage);