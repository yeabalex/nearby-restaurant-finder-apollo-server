export const reviewTypeDefs = `#graphql

type Review {
  id: Int!
  content: String!
  stars: Int!
  restaurant: Restaurant!
  createdAt: String!
  updatedAt: String!
}

type Query {
  reviews(restaurantId: Int!): [Review!]!
}

type Mutation {
  addReview(restaurantId: Int!, content: String!, stars: Int!): Review!
}
`;
