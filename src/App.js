import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryPage from './pages/categoryPage/categoryPage.component';
import ProductPage from './pages/productPage/productPage.component';
import CartPage from './pages/cartPage/cartPage.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import MainLayout from './layouts/main-layout/main-layout.component';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path=":category/:product" element={<ProductPage />} />
            <Route path=":category" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/" element={<CategoryPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    );
  }
}

export default App;
