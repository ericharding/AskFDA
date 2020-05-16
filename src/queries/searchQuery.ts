import gql from 'graphql-tag';
import { SearchQuery } from '../types/SearchQuery';
import { useQuery } from 'react-apollo';

const SEARCHQUERY = gql`
  query SearchQuery($term: String!) {
    search_inquiries(args: { search: $term }, order_by: {year: asc}) {
      text
      year
      file_name
    }
  }
`;
const useSearchQuery = (term: string) =>
  useQuery<SearchQuery>(SEARCHQUERY, { variables: { term } });
export { useSearchQuery, SEARCHQUERY };
