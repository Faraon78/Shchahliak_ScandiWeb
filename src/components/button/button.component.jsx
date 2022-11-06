import React from 'react';
import './button.style.css';
class Button extends React.PureComponent {
  render() {
    const { title, onClick, className } = this.props;

    return (
      <div className={className} onClick={onClick}>
        {title}
      </div>
    );
  }
}

export default Button;
