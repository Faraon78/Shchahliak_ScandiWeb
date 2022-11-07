import React from 'react';
import { connect } from 'react-redux';
import { switchCurrency } from '../../redux/selectedCurrencySlice';
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
      'Scandicurrency',
      JSON.stringify({
        symbol: this.props.currency.symbol,
        label: this.props.currency.label,
      })
    );
  };

  render() {
    return (
      <div
        className="currency-item font-raleway500"
        onClick={this.handlerSelectCurrency}
      >
        {this.props.currency.symbol} {this.props.currency.label}
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
