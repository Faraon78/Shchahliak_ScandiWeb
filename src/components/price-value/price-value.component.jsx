import React from 'react';
import { connect } from 'react-redux';

class PriceValue extends React.PureComponent {
  render() {
    const { prices, selectedCurrency } = this.props;
    const price = prices.find(
      (item) => item.currency.label === selectedCurrency.label
    );
    const displayAmount = price.amount.toFixed(2);
    return (
      <div className="product-price">
        {selectedCurrency.symbol + displayAmount}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { selectedCurrency } = state;
  return {
    selectedCurrency: selectedCurrency.selectedCurrency,
  };
}
export default connect(mapStateToProps)(PriceValue);
