import { ApolloClient, InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache();

export const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: cache,
});
