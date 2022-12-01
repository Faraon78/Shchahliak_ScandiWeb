import React from 'react';
import { connect } from 'react-redux';
import {
  switchCurrency,
  LOCAL_STORAGE_NAME_CURRENCY,
} from '../../redux/selectedCurrencySlice';
import { switchListCurrencies } from '../../redux/isOpenCurrenciesSlice';
import './currency-item.style.css';

class CurrencyItem extends React.PureComponent {
  handlerSelectCurrency = () => {
    this.props.dispatch(
      switchCurrency({
        symbol: this.props.currency.symbol,
        label: this.props.currency.label,
      })
    );
    this.props.dispatch(switchListCurrencies(false));
    localStorage.setItem(
      LOCAL_STORAGE_NAME_CURRENCY,
      JSON.stringify({
        symbol: this.props.currency.symbol,
        label: this.props.currency.label,
      })
    );
  };

  render() {
    const { className, currency } = this.props;
    return (
      <div className={className} onClick={this.handlerSelectCurrency}>
        {currency.symbol} {currency.label}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { selectedCurrency, isOpenListCurrencies } = state;
  return {
    selectedCurrency: selectedCurrency.selectedCurrency,
    isOpenListCurrencies: isOpenListCurrencies.isOpenListCurrencies,
  };
}
export default connect(mapStateToProps)(CurrencyItem);
