import React from 'react';
import { connect } from 'react-redux';

import { switchCartOverlay } from '../../redux/isOpenCartOverlaySlice';
import Cartbutton from '../../components/cart-button/cart-button.component';
import CartOverlay from '../../components/cart-overlay/cart-overlay.component';
import Iconbutton from '../../components/icon-button/icon-button.component';
import Navigate from '../../components/navigate/navigate.component';

import './header.style.css';

class Header extends React.Component {
  closeCartOverlay = () => {
    if (this.props.isOpenCartOverlay) {
      this.props.dispatch(switchCartOverlay(false));
    }
  };
  render() {
    const { isOpenCartOverlay } = this.props;
    return (
      <div className="header" onClick={this.closeCartOverlay}>
        <Navigate />
        <Cartbutton />
        <Iconbutton />
        {isOpenCartOverlay && <CartOverlay />}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { isOpenCartOverlay } = state;
  return {
    isOpenCartOverlay: isOpenCartOverlay.isOpenCartOverlay,
  };
}

export default connect(mapStateToProps)(Header);
