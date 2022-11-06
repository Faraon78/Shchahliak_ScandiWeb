import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
      products {
        gallery
        description
        inStock
        brand
        name
        category
        prices {
          amount
          currency {
            label
          }
        }
        attributes {
          name
          type
          items {
            displayValue
            value
          }
        }
      }
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
