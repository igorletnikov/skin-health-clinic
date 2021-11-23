//ApolloClient
import { useQuery, gql } from '@apollo/client';
export const GET_MASTER = gql`
  query getMaster {
    master_categories {
      id
      name
      image
    }
  }
`;
export const GET_CATEGORIES_DATA = gql`
  query getCategories($master_category_id: Int!) {
    categories(
      where: { master_category_id: { _eq: $master_category_id } }
      order_by: { id: asc }
    ) {
      id
      master_category_id
      name
    }
  }
`;
export const GET_ALL_CATEGORIES_DATA = gql`
  query getAllCategories {
    categories(order_by: { id: asc }) {
      id
      master_category_id
      name
    }
  }
`;

export const GET_SERVICES_DATA = gql`
  query getServices($category_id: Int!) {
    services(where: { category_id: { _eq: $category_id } }) {
      id
      category_id
      name
      duration
      rating
      price
      in_clinic
    }
  }
`;
export const GET_SERVICES_DATA_ALL = gql`
  query getServicesAll {
    services {
      id
      category_id
      name
      duration
      rating
      price
      in_clinic
    }
  }
`;

// const client = ...
/*export const GET_MASTER_DATA= gql`
query MyQuery ($master_category_id: Int!){
  master_categories {
    id
    name
    image
    categories(where: {master_category_id: {_eq: $master_category_id}}) {
      id
      master_category_id
      name
      services {
        id
        category_id
        name
        duration
        rating
        price
        in_clinic
      }
    }
  }
}

`;
/*export const GET_MASTER= gql`
  query getMaster($id: Integer!) {
    master_categories(where: {id: {_eq: $id}}) {
      id
      name
      image
    }
  }
`;*/
