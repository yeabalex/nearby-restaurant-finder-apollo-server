import { RestaurantResolverService } from "../../service/restaurant/restaurant.service";

const restaurantResolverService = new RestaurantResolverService();

export const restaurantResolvers = {
  Query: {
    restaurant: restaurantResolverService.restaurant.bind(restaurantResolverService),
    nearbyRestaurantsWithoutReviews: restaurantResolverService.nearbyRestaurantsWithoutReviews.bind(restaurantResolverService),
  },
};
