import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigate-item.style.css';

class NavigateItem extends React.PureComponent {
  render() {
    const { value, className } = this.props;
    return (
      <NavLink to={`/${value}`}>
        <div className={className}>
          <div className="navigate-link-text">{value}</div>
          <div className="navigate-link-underline"></div>
        </div>
      </NavLink>
    );
  }
}

export default NavigateItem;
