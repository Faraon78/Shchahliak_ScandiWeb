import React from 'react';
import { connect } from 'react-redux';
import { client } from './../../apollo/config';
import { GET_PRODUCT } from './../../apollo/queries';
import { Link } from 'react-router-dom';
import PriceValue from '../price-value/price-value.component';
import ProductMainImage from '../product-mainImage/product-mainImage.component';
import { addToCartList } from '../../redux/cartListSlice';
import './product.style.css';

class Product extends React.Component {
  addToCart = async (e) => {
    e.preventDefault();
    const productForCart = await this.downloadProductForCart();
    let setAttributes = {};
    const idToCart = Date.now();
    productForCart.attributes.forEach((item) => {
      setAttributes[item.id] = item.items[0].displayValue;
    });
    console.log(setAttributes);
    const itemToOrder = {
      product: productForCart,
      setAttributes: setAttributes,
      count: 1,
      id: idToCart,
    };
    this.props.dispatch(addToCartList(itemToOrder));
  };
  downloadProductForCart = async () => {
    try {
      const responseProduct = await client.query({
        query: GET_PRODUCT,
        variables: {
          id: this.props.product.id,
        },
      });
      const productForCart = responseProduct.data.product;
      return productForCart;
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { product } = this.props;
    return (
      <Link to={`/${product.category}/${product.id}`}>
        <div
          className={
            product.inStock === false ? 'product product-stock' : 'product'
          }
        >
          <ProductMainImage
            image={product.gallery[0]}
            inStock={product.inStock}
          />

          {product.inStock && (
            <div className="product__cart-label" onClick={this.addToCart}></div>
          )}
          <div className="product-title font-raleway300">
            {product.brand} {product.name}
          </div>
          <PriceValue prices={product.prices} />
        </div>
      </Link>
    );
  }
}
function mapStateToProps(state) {
  const { selectedCurrency } = state;
  return {
    selectedCurrency: selectedCurrency.selectedCurrency,
  };
}
export default connect(mapStateToProps)(Product);
