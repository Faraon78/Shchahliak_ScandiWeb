import React from 'react';
import parse from 'html-react-parser';
import './product-description.style.css';

class ProductDescription extends React.Component {
  render() {
    const description = parse(this.props.text);
    return <div className="product-description">{description}</div>;
  }
}

export default ProductDescription;
