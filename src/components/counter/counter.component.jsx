import React from 'react';
import { connect } from 'react-redux';
import plusSquare from '../../assets/plus-square.svg';
import minusSquare from '../../assets/minus-square.svg';
import {
  updateCountInCartList,
  deleteFromCartList,
} from '../../redux/cartListSlice';

import './counter.style.css';

class Counter extends React.Component {
  increaseCount = (e) => {
    e.stopPropagation();
    const newCount = this.props.count + 1;
    const updateCount = {
      id: this.props.id,
      count: newCount,
    };
    this.props.dispatch(updateCountInCartList(updateCount));
  };
  decreaseCount = (e) => {
    e.stopPropagation();
    if (this.props.count > 1) {
      const newCount = this.props.count - 1;
      const updateCount = {
        id: this.props.id,
        count: newCount,
      };
      this.props.dispatch(updateCountInCartList(updateCount));
    } else {
      this.props.dispatch(deleteFromCartList(this.props.id));
    }
  };

  render() {
    const { count } = this.props;

    return (
      <>
        <div className="count-sign" onClick={this.increaseCount}>
          <img src={plusSquare} alt="Plus" />
        </div>
        <div className="count-value">{count}</div>
        <div className="count-sign" onClick={this.decreaseCount}>
          <img src={minusSquare} alt="Minus" />
        </div>
      </>
    );
  }
}
function mapStateToProps(state) {
  const { cartList } = state;
  return {
    cartList: cartList.cartList,
  };
}

export default connect(mapStateToProps)(Counter);
