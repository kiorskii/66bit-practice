import { GraphQLClient } from "graphql-request";

const graphqlClient = new GraphQLClient("http://localhost:5029/graphql/");

export default graphqlClient;
