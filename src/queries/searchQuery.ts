import gql from 'graphql-tag';
export default gql`
  query SearchQuery($term: String!) {
    search_inquiries(args: { search: $term }) {
      text
      year
      file_name
    }
  }
`;
