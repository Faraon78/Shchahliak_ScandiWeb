import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './navigate-item.style.css';

class NavigateItem extends React.PureComponent {
  render() {
    return (
      <NavLink to={`/${this.props.value}`}>
        <div className={this.props.className}>
          <div className="navigate-link-text">{this.props.value}</div>
          <div className="navigate-link-underline"></div>
        </div>
      </NavLink>
    );
  }
}

export default connect()(NavigateItem);
