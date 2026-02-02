
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

// connction
    const httpLink = createHttpLink({
  // uri: "http://localhost:4000/graphql"
  uri: "https://tms-project-jpdu.onrender.com"

});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "x-user-role": role || "employee",
    },
  };
});



// error
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) =>
      console.error("[GraphQL error]:", message)
    );
  }
  if (networkError) {
    console.error("[Network error]:", networkError);
  }
});

// client instance
const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        shipments: {
          keyArgs: ["status", "sortBy", "sortOrder"],
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
}),
});

export default client;
