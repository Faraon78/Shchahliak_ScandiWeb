import React from 'react';
import { withRouter } from '../../components/withRouter';
import { connect } from 'react-redux';
import { client } from './../../apollo/config';
import { GET_PRODUCT } from './../../apollo/queries';
import ProductGallery from '../../components/product-gallery/product-gallery.component';
import AttributePanel from '../../components/attribute-panel/attribute-panel.component';
import ProductMainImage from '../../components/product-mainImage/product-mainImage.component';
import PriceValue from '../../components/price-value/price-value.component';
import Button from '../../components/button/button.component';
import ProductDescription from './../../components/product-description/product-description.component';
import { addToCartList } from '../../redux/cartListSlice';

import './productPage.style.css';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      productImage: '',
      attributes: {},
    };
  }
  componentDidMount = async () => {
    try {
      const { params } = this.props.router;
      const responseProduct = await client.query({
        query: GET_PRODUCT,
        variables: {
          id: params.product,
        },
      });
      const currentProduct = responseProduct.data.product;
      let attr = {};
      currentProduct.attributes.forEach((item) => {
        attr[item.id] = item.items[0].displayValue;
      });
      this.setState({
        product: currentProduct,
        attributes: attr,
      });
    } catch (error) {
      console.log(error);
    }
  };
  choiceGalleryItem = (title) => {
    this.setState({ productImage: title });
  };

  setAttributesToCart = (name, value) => {
    this.setState((prevState) => ({
      attributes: {
        ...prevState.attributes,
        [name]: value,
      },
    }));
  };
  addToCart = (product) => {
    const idToCart = Date.now();
    const itemToOrder = {
      product: product,
      setAttributes: this.state.attributes,
      count: 1,
      id: idToCart,
    };
    this.props.dispatch(addToCartList(itemToOrder));
  };

  render() {
    const { product, productImage } = this.state;
    if (!product.gallery) {
      return <div>Please, Wait..</div>;
    }

    const productGallery = product.gallery.map((item) => (
      <ProductGallery
        key={item}
        title={item}
        cbChoiceGalleryImage={this.choiceGalleryItem}
      />
    ));
    const previewUrl = productImage || product.gallery[0];
    const attributePanel = product.attributes.map((item) => (
      <AttributePanel
        key={item.name}
        item={item}
        setAttributesToCart={this.setAttributesToCart}
        isChange={true}
      />
    ));
    const buttonTitle = product.inStock ? 'add to cart' : 'out of stock';
    const buttonClassName = product.inStock
      ? 'button  button-active'
      : 'button  button-disable';
    return (
      <div className="product-page-container">
        <div className="product-page__gallery-list">{productGallery}</div>
        <div
          className={
            product.inStock === false
              ? 'product-page__preview-container product-page__outStock'
              : 'product-page__preview-container'
          }
        >
          <ProductMainImage image={previewUrl} inStock={product.inStock} />
        </div>
        <div className="product-page__information">
          <h3 className="h3-text-font font-raleway600">{product.brand}</h3>
          <div className="product-name font-raleway400">{product.name}</div>
          <div className="attributes">{attributePanel}</div>
          <h5 className="attribute-title  attribute-title__price">price:</h5>
          <PriceValue prices={product.prices} />
          <Button
            title={buttonTitle}
            className={buttonClassName}
            onClick={
              product.inStock ? (e) => this.addToCart(product) : undefined
            }
          />
          <ProductDescription text={product.description} />
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(ProductPage));
