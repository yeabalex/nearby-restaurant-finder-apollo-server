import { RestaurantRepository, RestaurantNotFoundError, DatabaseError, InvalidParametersError } from '../../repository/restaurant.repo';
import { GraphQLError } from 'graphql';

export class RestaurantResolverService {
  private restaurantRepository: RestaurantRepository;

  constructor() {
    this.restaurantRepository = new RestaurantRepository();
  }

  async restaurant(_: any, { id }: { id: number }) {
    try {
      const restaurant = await this.restaurantRepository.getRestaurantById(id);
      return restaurant;
    } catch (error) {
      if (error instanceof RestaurantNotFoundError) {
        throw new GraphQLError('Restaurant not found', {
          extensions: {
            code: 'NOT_FOUND',
            http: { status: 404 }
          }
        });
      }

      if (error instanceof InvalidParametersError) {
        throw new GraphQLError('Invalid restaurant ID', {
          extensions: {
            code: 'BAD_USER_INPUT',
            http: { status: 400 }
          }
        });
      }

      if (error instanceof DatabaseError) {
        console.error('Database error:', error);
        
        throw new GraphQLError('Internal server error', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            http: { status: 500 }
          }
        });
      }

      console.error('Unexpected error:', error);
      throw new GraphQLError('Something went wrong', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          http: { status: 500 }
        }
      });
    }
  }

  async nearbyRestaurantsWithoutReviews(
    _: any,
    { lat, lon, radius }: { lat: number; lon: number; radius: number }
  ) {
    try {
      const nearbyRestaurants = await this.restaurantRepository.getNearbyRestaurantsWithoutReview(
        lat,
        lon,
        radius
      );
      return nearbyRestaurants;
    } catch (error) {
      if (error instanceof InvalidParametersError) {
        throw new GraphQLError('Invalid location parameters', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: { lat, lon, radius },
            http: { status: 400 }
          }
        });
      }

      if (error instanceof DatabaseError) {
        console.error('Database error:', error);
        
        throw new GraphQLError('Internal server error', {
          extensions: {
            code: 'INTERNAL_SERVER_ERROR',
            http: { status: 500 }
          }
        });
      }

      console.error('Unexpected error:', error);
      throw new GraphQLError('Something went wrong', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          http: { status: 500 }
        }
      });
    }
  }
}