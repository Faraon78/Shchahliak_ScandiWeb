import React from 'react';
import { client } from '../../apollo/config';
import { GET_CATEGORIES } from './../../apollo/queries';
import { withRouter } from '../../components/withRouter';
import NavigateItem from '../navigate-item/navigate-item.component';
import './navigate.style.css';

class Navigate extends React.Component {
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { params } = this.props.router;

    if (!this.state.categories[0]) {
      return <div>Wait..</div>;
    }
    const selectedCategory = !params.category
      ? this.state.categories[0].name
      : params.category;
    const categoryItem = this.state.categories.map((item) => (
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
export default withRouter(Navigate);
