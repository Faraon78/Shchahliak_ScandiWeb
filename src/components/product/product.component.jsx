import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PriceValue from '../price-value/price-value.component';
import { addToCartList } from '../../redux/cartListSlice';
import './product.style.css';

class Product extends React.Component {
  addToCart = (e) => {
    e.preventDefault();
    let setAttributes = {};
    const id = Date.now();
    this.props.product.attributes.forEach((item) => {
      setAttributes[item.name] = item.items[0].displayValue;
    });
    const itemToOrder = {
      product: this.props.product,
      setAttributes: setAttributes,
      count: 1,
      id: id,
    };
    this.props.dispatch(addToCartList(itemToOrder));
  };
  render() {
    const { product } = this.props;

    return (
      <Link to={`/${product.category}/${product.name}`}>
        <div
          className={
            product.inStock === false ? 'product product-stock' : 'product'
          }
        >
          <div
            className="product-image"
            style={{
              backgroundImage: `url(${product.gallery[0]})`,
            }}
          >
            {!product.inStock && (
              <div className="label-stock font-raleway400">OUT OF STOCK</div>
            )}
          </div>
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
