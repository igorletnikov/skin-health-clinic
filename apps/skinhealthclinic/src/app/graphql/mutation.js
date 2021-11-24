//ApolloClient
import { gql } from '@apollo/client';
export const ADD_DATA = gql`
  mutation addData(
    $category_id: Int!
    $service_id: Int!
    $name: String!
    $price: float8!
    $rating: Int!
    $duration: Int!
    $in_clinic: Boolean!
  ) {
    insert_categories_one(
      object: {
        id: $category_id
        services: {
          data: {
            id: $service_id
            name: $name
            price: $price
            rating: $rating
            duration: $duration
            in_clinic: $in_clinic
          }
        }
      }
      on_conflict: { constraint: categories_pkey, update_columns: id }
    ) {
      services {
        duration
        id
        in_clinic
        name
        price
        rating
      }
    }
  }
`;
/*
export const ADD_DATA = gql`
  mutation addData(
    $category_id: Int!
    $service_id: Int!
    $name: String!
    $price: float8!
    $rating: Int!
    $duration: Int!
    $in_clinic: Boolean!
  ) {
    insert_categories(
      objects: {
        id: $category_id
        services: {
          data: {
            id: $service_id
            name: $name
            price: $price
            rating: $rating
            duration: $duration
            in_clinic: $in_clinic
          }
        }
      }
      on_conflict: { constraint: categories_pkey, update_columns: id }
    ) {
      returning {
        services {
          category_id
          duration
          id
          in_clinic
          name
          price
          rating
        }
      }
    }
  }
`;
*/
