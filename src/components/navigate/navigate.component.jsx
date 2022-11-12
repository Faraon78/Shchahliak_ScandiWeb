import React from 'react';
import { connect } from 'react-redux';
import NavigateItem from '../navigate-item/navigate-item.component';
import './navigate.style.css';

class Navigate extends React.PureComponent {
  render() {
    const { categories, selectedCategory } = this.props;
    const categoryItem = categories.map((item) => (
      <NavigateItem
        className={
          item.name === selectedCategory
            ? 'navigate-link active'
            : 'navigate-link'
        }
        key={item.name}
        value={item.name}
      />
    ));
    return <div className="navigate">{categoryItem}</div>;
  }
}
function mapStateToProps(state) {
  const { categoryList } = state;
  return {
    categories: categoryList.categoryList,
  };
}
export default connect(mapStateToProps)(Navigate);
