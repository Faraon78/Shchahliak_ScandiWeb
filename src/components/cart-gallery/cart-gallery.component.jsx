import React from 'react';
import caretLeft from '../../assets/caret-left.svg';
import caretRight from '../../assets/caret-right.svg';
import './cart-gallery.style.css';

class CartGallery extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      indexImage: 0,
    };
  }
  previousImage = () => {
    let index;
    this.props.gallery.length - 1 > this.state.indexImage
      ? (index = this.state.indexImage + 1)
      : (index = 0);
    this.setState({
      indexImage: index,
    });
  };
  nextImage = () => {
    let index;
    this.state.indexImage > 0
      ? (index = this.state.indexImage - 1)
      : (index = this.props.gallery.length - 1);
    this.setState({
      indexImage: index,
    });
  };

  render() {
    const { gallery, withCarusel } = this.props;

    return (
      <div className="cart-gallery-container">
        <div
          className="cart-gallery-item"
          style={{
            backgroundImage: `url(${gallery[this.state.indexImage]})`,
          }}
        ></div>
        {withCarusel && gallery.length > 1 && (
          <div className="gallery-caret">
            <img
              src={caretLeft}
              alt="caret-left"
              onClick={this.previousImage}
            />
            <img src={caretRight} alt="caret-right" onClick={this.nextImage} />
          </div>
        )}
      </div>
    );
  }
}

export default CartGallery;
