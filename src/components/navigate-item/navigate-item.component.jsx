import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './navigate-item.style.css';

class NavigateItem extends React.PureComponent {
  render() {
    return (
      <Link to={`/${this.props.value}`} className={this.props.className}>
        <div className={this.props.className}>
          <div className="navigate-link-text">{this.props.value}</div>
          <div className="navigate-link-underline"></div>
        </div>
      </Link>
    );
  }
}

export default connect()(NavigateItem);
