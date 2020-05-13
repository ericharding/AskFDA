import gql from 'graphql-tag';
import { SearchQuery } from '../types/SearchQuery';
import { useQuery } from 'react-apollo';

const SEARCHQUERY = gql`
  query SearchQuery($term: String!) {
    search_inquiries(args: { search: $term }) {
      text
      year
      file_name
    }
  }
`;
const useSearchQuery = (search: string) =>
  useQuery<SearchQuery>(SEARCHQUERY, { variables: { search } });
export { useSearchQuery, SEARCHQUERY };
