import React from 'react';
import CurrencyList from '../currency-list/currency-list.component';
import { connect } from 'react-redux';
import { switchListCurrencies } from '../../redux/isOpenCurrenciesSlice';
import { switchCartOverlay } from '../../redux/isOpenCartOverlaySlice';
import emptyCart from '../../assets/emptyCart.svg';
import arrowDown from '../../assets/arrow-down.svg';
import arrowUp from '../../assets/arrow-up.svg';
import { client } from '../../apollo/config';
import { GET_CURRENCY } from '../../apollo/queries';
import './icon-button.style.css';

class Iconbutton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
    };
  }
  componentDidMount = async () => {
    try {
      const response = await client.query({
        query: GET_CURRENCY,
      });
      this.setState({
        currencies: response.data.currencies,
      });
    } catch (error) {
      console.log(error);
    }
  };
  handlerCurrencyOpen = () => {
    this.props.dispatch(switchListCurrencies(!this.props.isOpenListCurrencies));
  };
  handlerCartOverlay = () => {
    this.props.dispatch(switchCartOverlay(!this.props.isOpenCartOverlay));
  };
  render() {
    const { isOpenListCurrencies, selectedCurrency, cartList } = this.props;
    const arrow = isOpenListCurrencies ? arrowUp : arrowDown;
    let counter = 0;
    if (cartList.length > 0) {
      cartList.forEach((item) => (counter += item.count));
    }
    return (
      <div className="icon-button">
        <div
          className="icon-button__currency"
          onClick={this.handlerCurrencyOpen}
        >
          <span className="icon-button__currency__text font-raleway500">
            {selectedCurrency.symbol}
          </span>
          <div className="icon-button__currency__arrow">
            <img src={arrow} alt="Arrow icon" />
          </div>
        </div>
        <div className="icon-button__cart" onClick={this.handlerCartOverlay}>
          <img src={emptyCart} alt="Cart icon" />
          {cartList.length > 0 ? (
            <div className="cart-counter__box font-roboto700">{counter}</div>
          ) : undefined}
        </div>
        {isOpenListCurrencies && (
          <CurrencyList currencies={this.state.currencies} />
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const {
    selectedCurrency,
    isOpenListCurrencies,
    cartList,
    isOpenCartOverlay,
  } = state;
  return {
    selectedCurrency: selectedCurrency.selectedCurrency,
    isOpenListCurrencies: isOpenListCurrencies.isOpenListCurrencies,
    isOpenCartOverlay: isOpenCartOverlay.isOpenCartOverlay,
    cartList: cartList.cartList,
  };
}
export default connect(mapStateToProps)(Iconbutton);
