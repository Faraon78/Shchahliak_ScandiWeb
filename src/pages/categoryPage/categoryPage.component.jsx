import React from 'react';
import { withRouter } from '../../components/withRouter';
import { client } from './../../apollo/config';
import { GET_CATEGORY, GET_CATEGORIES } from './../../apollo/queries';
import Product from '../../components/product/product.component';
import './categoryPage.style.css';

class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      selectedCategory: '',
    };
  }
  componentDidMount = async () => {
    try {
      const responseCategories = await client.query({
        query: GET_CATEGORIES,
      });
      if (responseCategories.data) {
        this.setState({
          categories: responseCategories.data.categories,
        });
      }
      await this.updateCategoryListWithRouter(
        responseCategories.data.categories[0].name
      );
    } catch (error) {
      console.log(error);
    }
  };
  updateCategoryListWithRouter = async (category) => {
    try {
      const selectedCategory = !this.props.router.params.category
        ? category
        : this.props.router.params.category;
      const responseCategoryList = await client.query({
        query: GET_CATEGORY,
        variables: {
          input: {
            title: selectedCategory,
          },
        },
      });

      if (responseCategoryList.data) {
        this.setState({
          products: responseCategoryList.data.category.products,
          selectedCategory: selectedCategory,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.router.params.category !== prevProps.router.params.category
    ) {
      this.updateCategoryListWithRouter(this.state.categories[0].name);
    }
  }
  render() {
    const productItem = this.state.products.map((item) => (
      <Product key={item.id} product={item} />
    ));

    return (
      <>
        <h2 className="font-raleway400 category-title">
          {this.state.selectedCategory}
        </h2>
        <div className="productList">{productItem}</div>
      </>
    );
  }
}

export default withRouter(CategoryPage);
