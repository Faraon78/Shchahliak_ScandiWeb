import React from 'react';
import './product-gallery.style.css';

class ProductGallery extends React.PureComponent {
  itemclicked = () => {
    this.props.cbChoiceGalleryImage(this.props.title);
  };
  render() {
    const { title } = this.props;

    return (
      <div className="product-gallery-container" onClick={this.itemclicked}>
        <div
          className="gallery-item"
          style={{ backgroundImage: `url(${title})` }}
        />
      </div>
    );
  }
}

export default ProductGallery;
