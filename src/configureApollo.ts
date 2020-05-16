import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

function getHeaders(authToken: string) {
  if (authToken) {
    return {
      Authorization: `Bearer ${authToken}`,
    };
  }
  return {};
}

export const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://cerberus:5532/v1/graphql',
      headers: getHeaders(authToken),
    }),
    cache: new InMemoryCache(),
  });
};
