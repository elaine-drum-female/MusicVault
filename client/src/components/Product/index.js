import React, { Component } from 'react';
import PageTop from '../utils/page_top';
import { getProductDetail , clearProductDetail} from '../../actions/products_actions';
import { connect } from 'react-redux';
import ProdInfo from './prodInfo';
import ProdImage from './prodImage';


class ProductPage extends Component {

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.dispatch(getProductDetail(id)).then(()=>{
            if(!this.props.products.prodDetail){
                this.props.history.push('/');
            }
        })
    }

    componentWillUnmount(){
        this.props.dispatch(clearProductDetail())
    }
    
    render() {
        return (
            <div>
                <PageTop
                    title="Product detail"
                />  
                <div className="container">
                {
                    this.props.products.prodDetail ?
                    <div className="product_detail_wrapper">
                        <div className="left">
                            <div style={{width:'500px'}}>
                                <ProdImage
                                    detail={this.props.products.prodDetail}
                                />
                            </div>
                        </div>
                        <div className="right">
                            <ProdInfo
                                addToCart={(id)=> this.addToCartHandler(id)}
                                detail={this.props.products.prodDetail}
                            />
                        </div>
                    </div>
                    : 'Loading'
                }

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

export default connect(mapStateToProps)(ProductPage);