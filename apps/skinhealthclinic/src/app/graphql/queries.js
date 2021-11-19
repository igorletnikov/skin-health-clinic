//ApolloClient
import { useQuery, gql } from '@apollo/client';

// const client = ...
export const GET_MASTER_DATA= gql`
  query MyQuery {
    master_categories {
      id
      name
      image
      categories {
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
export const GET_MASTER= gql`
  query getMaster {
    master_categories{
      id
      name
      image
    }
  }
`;
export const GET_CATEGORIES_DATA = gql`
  query getCategories {
      categories {
        id
        master_category_id
        name
      }
  }  
`;
export const GET_SERVICES_DATA = gql`
  query getServices {  
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
