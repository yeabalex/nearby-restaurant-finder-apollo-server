import { mergeTypeDefs } from '@graphql-tools/merge';
import { reviewTypeDefs } from './review.schema';
import { restaurantTypeDefs } from './restaurant.schema';

const mergedTypeDefs = mergeTypeDefs([reviewTypeDefs, restaurantTypeDefs]);

export { mergedTypeDefs };
