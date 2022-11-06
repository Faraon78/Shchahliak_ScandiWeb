import React from 'react';
import { connect } from 'react-redux';

class PriceValue extends React.PureComponent {
  render() {
    const { prices, selectedCurrency } = this.props;
    const price = prices.find(
      (item) => item.currency.label === selectedCurrency.label
    );
    return (
      <div className="product-price">
        {selectedCurrency.symbol + price.amount}
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
