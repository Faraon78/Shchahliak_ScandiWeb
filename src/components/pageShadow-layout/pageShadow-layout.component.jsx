import React from 'react';
import { connect } from 'react-redux';
import { switchCartOverlay } from '../../redux/isOpenCartOverlaySlice';
import './pageShadow-layout.style.css';

class PageShadowLayout extends React.PureComponent {
  closeCartOverlay = () => {
    this.props.dispatch(switchCartOverlay(false));
  };

  render() {
    return <div className="page-shadow" onClick={this.closeCartOverlay} />;
  }
}

export default connect()(PageShadowLayout);
