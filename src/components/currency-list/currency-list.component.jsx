import React from 'react';
import CurrencyItem from '../currency-item/currency-item.component';

import './currency-list.style.css';

class CurrencyList extends React.Component {
  render() {
    return (
      <div className="currency-list">
        {this.props.currencies.map((item) => (
          <CurrencyItem key={item.label} currency={item} />
        ))}
      </div>
    );
  }
}

export default CurrencyList;
