# Restaurant API

This is a GraphQL-based API that provides information about restaurants, including fetching restaurant details by ID and retrieving nearby restaurants without reviews. The API uses Apollo Server, Prisma, and a PostgreSQL database to interact with restaurant data.

## Features

- **GraphQL API**: Interact with restaurant data using GraphQL queries.
- **Fetch Restaurant by ID**: Retrieve detailed information about a specific restaurant.
- **Error Handling**: Custom error handling for common scenarios such as missing restaurants, invalid parameters, and database errors.

## Technologies Used

- **Apollo Server**: For creating the GraphQL API.
- **Prisma**: ORM for interacting with the PostgreSQL database.
- **GraphQL**: Query language for APIs.
- **TypeScript**: Typed superset of JavaScript.
- **PostgreSQL**: Database for storing restaurant data (used Neon).

## Project Structure

### 1. **Schemas**

- **`review.schema.ts`**: Defines the schema for restaurant reviews.
- **`restaurant.schema.ts`**: Defines the schema for restaurant information.

### 2. **Resolvers**

- **`restaurant.resolver.ts`**: Contains resolvers for fetching restaurant data, including fetching by ID and fetching nearby restaurants.

### 3. **Services**

- **`restaurant.service.ts`**: Defines the service class for handling restaurant data and interacting with the repository.

### 4. **Repositories**

- **`restaurant.repo.ts`**: Contains methods for interacting with the database, such as fetching restaurants by ID or fetching nearby restaurants.

### 5. **Errors**

- **`RestaurantNotFoundError`**: Custom error thrown when a restaurant is not found.
- **`DatabaseError`**: Custom error thrown for general database issues.
- **`InvalidParametersError`**: Custom error for invalid input parameters.

### 6. **Server**

- **`server.ts`**: Configures and starts the Apollo Server with the defined schemas and resolvers.

### Queries

- **getRestaurantById(id: ID!): Restaurant**
  - **Description**: Fetches the details of a restaurant by its unique identifier.
  - **Parameters**:
    - `id` (required): The unique identifier of the restaurant.
  - **Response**: 
    - Returns a `Restaurant` object with fields like `id`, `name`, `location`, `cuisine`, etc.
  - **Errors**: 
    - Throws `RestaurantNotFoundError` if no restaurant matches the given ID.

- **getNearbyRestaurantsWithoutReviews(latitude: Float!, longitude: Float!, radius: Int = 5000): [Restaurant]**
  - **Description**: Retrieves a list of nearby restaurants without reviews based on given coordinates.
  - **Parameters**:
    - `latitude` (required): The latitude of the search center.
    - `longitude` (required): The longitude of the search center.
    - `radius` (optional, default 5000 meters): The search radius in meters.
  - **Response**: 
    - Returns an array of `Restaurant` objects that do not have associated reviews within the specified radius.
  - **Errors**: 
    - Throws `InvalidParametersError` if the coordinates or radius are invalid.
    - Throws `DatabaseError` if there's an issue querying the database.

## Installation

To set up the project:

1. **Clone the repository**: 
   ```sh
   git clone <repository-url>
   cd restaurant-api
   ```
2. **Create a .env and paste this**: 
   ```sh
   DATABASE_URL=CONNECTION-STRING
   ```
3. **Install Dependencies**: 
   ```sh
   npm i 
   ```
4. **Build the project**: 
   ```sh
    npm run build
   ```
5. **Start the server**: 
   ```sh
    npm start
   ```