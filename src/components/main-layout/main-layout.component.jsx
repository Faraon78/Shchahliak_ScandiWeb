import React from 'react';
import { Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../header/header.component';
import PageShadowLayout from '../pageShadow-layout/pageShadow-layout.component';
import { switchListCurrencies } from '../../redux/isOpenCurrenciesSlice';

import './main-layout.style.css';

class MainLayout extends React.Component {
  handlerCurrencyOpen = (event) => {
    if (this.props.isOpenListCurrencies) {
      this.props.dispatch(switchListCurrencies(false));
    }
  };
  render() {
    const { isOpenCartOverlay } = this.props;
    return (
      <div className="app" onClick={this.handlerCurrencyOpen}>
        <Header />
        <div className="page">
          {isOpenCartOverlay && <PageShadowLayout />}
          <Outlet />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { isOpenListCurrencies, isOpenCartOverlay } = state;
  return {
    isOpenListCurrencies: isOpenListCurrencies.isOpenListCurrencies,
    isOpenCartOverlay: isOpenCartOverlay.isOpenCartOverlay,
  };
}

export default connect(mapStateToProps)(MainLayout);
