import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { client } from './apollo/config';
import { GET_CATEGORIES } from './apollo/queries';
import { updateCategoryList } from './redux/categoryListSlice';
import { switchListCurrencies } from './redux/isOpenCurrenciesSlice';
import CategoryPage from './pages/categoryPage/categoryPage.component';
import ProductPage from './pages/productPage/productPage.component';
import CartPage from './pages/cartPage/cartPage.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import './App.css';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }
  componentDidMount = async () => {
    try {
      const response = await client.query({
        query: GET_CATEGORIES,
      });

      if (response.data) {
        this.setState({
          categories: response.data.categories,
        });
        this.updateCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };
  updateCategories = (categories) => {
    this.props.dispatch(updateCategoryList(categories));
  };
  handlerCurrencyOpen = (event) => {
    if (this.props.isOpenListCurrencies) {
      this.props.dispatch(switchListCurrencies(false));
    }
  };
  render() {
    if (!this.state.categories[0]) {
      return <div>Wait..</div>;
    }
    return (
      <div className="app" onClick={this.handlerCurrencyOpen}>
        <ErrorBoundary>
          <Routes>
            <Route path=":category/:product" element={<ProductPage />} />
            <Route path=":category" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/" element={<CategoryPage />} />
          </Routes>
        </ErrorBoundary>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { isOpenListCurrencies, isOpenCartOverlay } = state;
  return {
    isOpenListCurrencies: isOpenListCurrencies.isOpenListCurrencies,
    isOpenCartOverlay: isOpenCartOverlay.isOpenCartOverlay,
  };
}
export default connect(mapStateToProps)(App);
