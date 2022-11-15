import React from 'react';
import { withRouter } from '../../components/withRouter';
import { connect } from 'react-redux';
import CartProduct from '../../components/cart-product/cart-product.component';
import { checkOutCartList } from '../../redux/cartListSlice';
import Button from '../../components/button/button.component';

import './cartPage.style.css';

class CartPage extends React.Component {
  createOrder = () => {
    this.props.dispatch(checkOutCartList());
    alert('Thank you for your order!');
  };
  render() {
    const { cartList, selectedCurrency } = this.props;

    let counter = 0;
    cartList.forEach((item) => (counter += item.count));
    let totalSum = 0;
    cartList.forEach((item) => {
      const price = item.product.prices.find(
        (item) => item.currency.label === selectedCurrency.label
      );
      totalSum += price.amount * item.count;
    });
    totalSum = +totalSum.toFixed(2);
    const tax = (totalSum * 0.21).toFixed(2);

    const separator = <div className="separator"/>;

    const cartItem = cartList.map((item) => (
      <div key={item.id}>
        <CartProduct product={item} withCarusel={true} />
        {separator}
      </div>
    ));

    return (
      <>
        <h2 className="cart-title font-raleway700">cart</h2>
        {separator}
        <div className="orderList">{cartItem}</div>
        <div className="cart-footer">
          <div className="cart-tax">
            <span className="cart-footer__title font-raleway400">Tax 21%:</span>
            <span className="cart-footer__value font-raleway700">
              {selectedCurrency.symbol + tax}
            </span>
          </div>
          <div className="cart-quantity">
            <span className="cart-footer__title font-raleway400">
              Quantity:
            </span>
            <span className="cart-footer__value font-raleway700">
              {counter}
            </span>
          </div>
          <div className="cart-total">
            <span className="cart-footer__title font-raleway500">Total:</span>
            <span className="cart-footer__value font-raleway700">
              {selectedCurrency.symbol + totalSum}
            </span>
          </div>
          <div className="cart-footer__button">
            <Button
              title="order"
              className={
                cartList.length > 0
                  ? 'button button-active'
                  : 'button button-disable'
              }
              onClick={cartList.length > 0 ? this.createOrder : null}
            />
          </div>
        </div>
      </>
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

export default withRouter(connect(mapStateToProps)(CartPage));
