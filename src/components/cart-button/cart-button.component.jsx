import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/a-logo.svg';
import './cart-button.style.css';

class Cartbutton extends React.PureComponent {
  render() {
    return (
      <Link to={'/cart'}>
        <div className="cart-button">
          <img src={logo} alt="cart-button" />
        </div>
      </Link>
    );
  }
}

export default Cartbutton;
