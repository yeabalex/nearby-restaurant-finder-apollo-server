export const restaurantTypeDefs = `#graphql
  type Restaurant {
    id: Int!
    name: String!
    address: String!
    latitude: Float!
    longitude: Float!
    openingHours: String!
    reviews: [Review!]!
    averageStars: Float!
    distance: Float
    createdAt: String!
    updatedAt: String!
  }

  type Review {
    id: Int!
    content: String!
    rating: Int!
    createdAt: String!
  }

  type Query {
    restaurant(id: Int!): Restaurant!
    nearbyRestaurantsWithoutReviews(lat: Float!, lon: Float!, radius: Float!): [Restaurant!]!
  }
`;
