import React from 'react';
import './product-mainImage.style.css';

class ProductMainImage extends React.Component {
  render() {
    const { image, inStock } = this.props;
    return (
      <>
        <div
          className="product-image"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          {!inStock && (
            <div className="label-stock font-raleway400">OUT OF STOCK</div>
          )}
        </div>
      </>
    );
  }
}

export default ProductMainImage;
