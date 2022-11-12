import React from 'react';
import { withRouter } from '../../components/withRouter';
import { connect } from 'react-redux';
import Product from '../../components/product/product.component';
import './categoryPage.style.css';

class CategoryPage extends React.Component {
  render() {
    const { params } = this.props.router;
    const { categories } = this.props;
    const selectedCategory = !params.category ? 'all' : params.category;
    const currentCategoryList = categories.find(
      (item) => item.name === selectedCategory
    );

    const productItem = currentCategoryList.products.map((item) => (
      <Product key={item.name} product={item} />
    ));

    return (
      <>
        <h2 className="font-raleway400 category-title">{selectedCategory}</h2>
        <div className="productList">{productItem}</div>
      </>
    );
  }
}
function mapStateToProps(state) {
  const { categoryList } = state;
  return {
    categories: categoryList.categoryList,
  };
}

export default withRouter(connect(mapStateToProps)(CategoryPage));
