import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { MessageQuery } from 'types/MessageQuery';

const QUERY = gql`
  query MessageQuery($id: Int) {
    inquiries(where: { id: { _eq: $id } }) {
      text
      title
      year
      file_name
      id
    }
  }
`;
const useMessageQuery = (id: number) =>
  useQuery<MessageQuery>(QUERY, { variables: { id } });
export { useMessageQuery, QUERY };
