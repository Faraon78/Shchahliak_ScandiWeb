import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Counter from '../counter/counter.component';
import AttributePanel from '../attribute-panel/attribute-panel.component';
import CartGallery from '../cart-gallery/cart-gallery.component';
import PriceValue from '../price-value/price-value.component';
import './cart-product.style.css';

class CartProduct extends React.Component {
  render() {
    const { product, withCarusel } = this.props;
    const attributePanel = product.product.attributes.map((item) => (
      <AttributePanel
        key={item.name}
        item={item}
        attributeSet={product.setAttributes[item.name]}
        isChange={false}
      />
    ));
    const gallery = (
      <CartGallery
        withCarusel={withCarusel}
        gallery={product.product.gallery}
      />
    );

    return (
      <div className="cart-product__wrapper">
        <div className="cart-product__details">
          <div className="cart-product__brand">{product.product.brand}</div>
          <Link to={`/${product.product.category}/${product.product.name}`}>
            <div className="product-title">{product.product.name}</div>
          </Link>
          <PriceValue prices={product.product.prices} />
          <div className="attributes">{attributePanel}</div>
        </div>
        <div className="count-gallery">
          <div className="cart-counter">
            <Counter count={product.count} id={product.id} />
          </div>
          <div className="cart-product__gallery">{gallery}</div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { cartList } = state;
  return {
    cartList: cartList.cartList,
  };
}

export default connect(mapStateToProps)(CartProduct);
