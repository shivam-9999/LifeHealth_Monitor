import { ApolloClient, InMemoryCache } from "@apollo/client";


const apolloClient = new ApolloClient({
  uri: "https://lifehealth-monitor.onrender.com/graphql/",
  cache: new InMemoryCache()
})


export default apolloClient;