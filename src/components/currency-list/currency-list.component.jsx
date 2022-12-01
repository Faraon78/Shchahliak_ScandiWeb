import React from 'react';
import CurrencyItem from '../currency-item/currency-item.component';

import './currency-list.style.css';

class CurrencyList extends React.Component {
  render() {
    const { currencies, selectedCurrency } = this.props;

    return (
      <div className="currency-list">
        {currencies.map((item) => (
          <CurrencyItem
            key={item.label}
            currency={item}
            className={
              item.label === selectedCurrency.label
                ? 'currency-item currency-item__selected font-raleway500'
                : 'currency-item font-raleway500'
            }
          />
        ))}
      </div>
    );
  }
}

export default CurrencyList;
