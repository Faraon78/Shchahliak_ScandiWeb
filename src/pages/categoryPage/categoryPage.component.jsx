import React from 'react';
import { withRouter } from '../../components/withRouter';
import { connect } from 'react-redux';
import Header from '../../components/header/header.component';
import Product from '../../components/product/product.component';
import PageShadowLayot from '../../components/pageShadow-layot/pageShadow-layot.component';
import './categoryPage.style.css';

class CategoryPage extends React.Component {
  render() {
    const { params } = this.props.router;
    const { categories, isOpenCartOverlay } = this.props;
    const selectedCategory = !params.category ? 'all' : params.category;
    const currencyCategoryList = categories.find(
      (item) => item.name === selectedCategory
    );

    const productItem = currencyCategoryList.products.map((item) => (
      <Product key={item.name} product={item} />
    ));

    return (
      <div>
        <Header />
        <div className="page">
          {isOpenCartOverlay && <PageShadowLayot />}
          <h2 className="font-raleway400 category-title">{selectedCategory}</h2>
          <div className="productList">{productItem}</div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { categoryList, isOpenCartOverlay } = state;
  return {
    categories: categoryList.categoryList,
    isOpenCartOverlay: isOpenCartOverlay.isOpenCartOverlay,
  };
}

export default withRouter(connect(mapStateToProps)(CategoryPage));
