import { gql } from '@apollo/client';

export const GET_CATEGORY = gql`
  query GetCategory($input: CategoryInput) {
    category(input: $input) {
      name
      products {
        id
        name
        inStock
        gallery
        category
        prices {
          amount
          currency {
            label
          }
        }
        brand
      }
    }
  }
`;
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;
export const GET_CURRENCY = gql`
  query GetCurrency {
    currencies {
      label
      symbol
    }
  }
`;
export const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        amount
        currency {
          label
        }
      }
      brand
    }
  }
`;
