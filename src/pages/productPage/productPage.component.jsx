import React from 'react';
import { withRouter } from '../../components/withRouter';
import { connect } from 'react-redux';
import ProductGallery from '../../components/product-gallery/product-gallery.component';
import AttributePanel from '../../components/attribute-panel/attribute-panel.component';
import PriceValue from '../../components/price-value/price-value.component';
import Button from '../../components/button/button.component';
import { addToCartList } from '../../redux/cartListSlice';
import './productPage.style.css';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productImage: '',
      attributes: {},
    };
  }
  componentDidMount = () => {
    const { params } = this.props.router;
    const currencyCategory = this.props.categories.find(
      (item) => item.name === params.category
    );
    const product = currencyCategory.products.find(
      (item) => item.name === params.product
    );
    let attr = {};
    product.attributes.forEach((item) => {
      attr[item.name] = item.items[0].displayValue;
    });
    this.setState({
      attributes: attr,
    });
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
    const id = Date.now();
    const itemToOrder = {
      product: product,
      setAttributes: this.state.attributes,
      count: 1,
      id: id,
    };
    this.props.dispatch(addToCartList(itemToOrder));
  };

  render() {
    const { params } = this.props.router;
    const { categories } = this.props;
    const currencyCategory = categories.find(
      (item) => item.name === params.category
    );
    const product = currencyCategory.products.find(
      (item) => item.name === params.product
    );

    const productGallery = product.gallery.map((item) => (
      <ProductGallery
        key={item}
        title={item}
        cbChoiceGalleryImage={this.choiceGalleryItem}
      />
    ));
    const previewUrl = this.state.productImage || product.gallery[0];
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
        <div className="product-page__preview-container">
          <div
            className="product-page__preview"
            style={{
              backgroundImage: `url(${previewUrl})`,
            }}
          ></div>
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
          <div
            className="product-description"
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          ></div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { categoryList } = state;
  return {
    categories: categoryList.categoryList,
  };
}

export default withRouter(connect(mapStateToProps)(ProductPage));
