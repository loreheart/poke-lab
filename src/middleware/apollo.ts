import { provideApolloClient } from '@vue/apollo-composable'
import { createApolloProvider } from '@vue/apollo-option'

import { ApolloClient, InMemoryCache } from '@apollo/client/core'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
})

provideApolloClient(apolloClient)

export const apollo = createApolloProvider({
  defaultClient: apolloClient,
})