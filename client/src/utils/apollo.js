import { ApolloClient, InMemoryCache } from "@apollo/client";



//apoloo client
const apolloClient = new ApolloClient({
   uri : process.env.REACT_APP_PRODCONN,
   cache: new InMemoryCache(),
})

export default apolloClient;