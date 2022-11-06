import React from 'react';
import { withRouter } from '../../components/withRouter';
import { connect } from 'react-redux';
import Navigate from '../../components/navigate/navigate.component';
import Cartbutton from '../../components/cart-button/cart-button.component';
import Iconbutton from '../../components/icon-button/icon-button.component';
import CartOverlay from '../../components/cart-overlay/cart-overlay.component';
import { switchCartOverlay } from '../../redux/isOpenCartOverlaySlice';
import './header.style.css';

class Header extends React.Component {
  closeCartOverlay = () => {
    if (this.props.isOpenCartOverlay) {
      this.props.dispatch(switchCartOverlay(false));
    }
  };
  render() {
    const { params } = this.props.router;
    const { isOpenCartOverlay } = this.props;
    const selectedCategory = !params.category ? 'all' : params.category;

    return (
      <div className="header" onClick={this.closeCartOverlay}>
        <Navigate selectedCategory={selectedCategory} />
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

export default withRouter(connect(mapStateToProps)(Header));
