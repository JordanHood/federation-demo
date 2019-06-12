const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  extend type Query {
    order: Order
  }

  type Order @key(fields: "productIds") {
    id: ID!
    productIds: [String!]!
  }
`;

const resolvers = {
  Query: {
    order() {
      return orders[0];
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 4005 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const orders = [
  {
    id: "1",
    productIds: ["1", "3"]
  },
  {
    id: "2",
    productIds: ["2", "3"]
  }
];
