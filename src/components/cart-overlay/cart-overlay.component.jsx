import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartProduct from '../cart-product/cart-product.component';
import Button from '../button/button.component';
import { checkOutCartList } from '../../redux/cartListSlice';
import { switchCartOverlay } from '../../redux/isOpenCartOverlaySlice';

import './cart-overlay.style.css';

class CartOverlay extends React.Component {
  checkOutCart = () => {
    this.props.dispatch(checkOutCartList());
    this.props.dispatch(switchCartOverlay(false));
  };
  closeCartOverlay = () => {
    this.props.dispatch(switchCartOverlay(false));
  };

  render() {
    const { cartList, selectedCurrency } = this.props;
    let counter = 0;
    cartList.forEach((item) => (counter += item.count));
    const cartItem = cartList.map((item) => (
      <CartProduct key={item.id} product={item} withCarusel={false} />
    ));
    let totalSum = 0;
    cartList.forEach((item) => {
      const price = item.product.prices.find(
        (item) => item.currency.label === selectedCurrency.label
      );
      totalSum += price.amount * item.count;
    });
    totalSum = +totalSum.toFixed(2);
    return (
      <div className="cart-overlay-box">
        <div className="cart-overlay-title font-raleway700">
          My Bag,
          <span className="cart-title-count font-raleway500">
            {counter} items
          </span>
        </div>
        <div className="cart-overlay-list">{cartItem}</div>
        <div className="cart-overlay-total">
          <div className="total-title font-roboto500">Total</div>
          <div className="total-sum  font-raleway700">
            {selectedCurrency.symbol} {totalSum}
          </div>
        </div>
        <div className="cart-overlay-button font-raleway600">
          <Link to={'/cart'} className="button-link__wrapper">
            <Button
              title="view bag"
              onClick={this.closeCartOverlay}
              className="button button-link"
            />
          </Link>
          <Button
            title="check out"
            onClick={this.checkOutCart}
            className="button button-active"
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { cartList, selectedCurrency } = state;

  return {
    cartList: cartList.cartList,
    selectedCurrency: selectedCurrency.selectedCurrency,
  };
}

export default connect(mapStateToProps)(CartOverlay);
