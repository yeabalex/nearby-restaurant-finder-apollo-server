import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// Custom error classes for better error handling
export class RestaurantNotFoundError extends Error {
  constructor(id: number) {
    super(`Restaurant with id ${id} not found`);
    this.name = 'RestaurantNotFoundError';
  }
}

export class DatabaseError extends Error {
  constructor(message: string) {
    super(`Database error: ${message}`);
    this.name = 'DatabaseError';
  }
}

export class InvalidParametersError extends Error {
  constructor(message: string) {
    super(`Invalid parameters: ${message}`);
    this.name = 'InvalidParametersError';
  }
}

export class RestaurantRepository {
  async getRestaurantById(id: number) {
    try {
      if (!Number.isInteger(id) || id <= 0) {
        throw new InvalidParametersError('Restaurant ID must be a positive integer');
      }

      const restaurant = await prisma.restaurant.findUnique({
        where: {
          id: id,
        },
      });

      if (!restaurant) {
        throw new RestaurantNotFoundError(id);
      }

      return restaurant;
    } catch (error) {
      if (error instanceof RestaurantNotFoundError || 
          error instanceof InvalidParametersError) {
        throw error;
      }
      throw new Error('Unexpected error occurred');
    }
  }

  async getNearbyRestaurantsWithoutReview(lat: number, lon: number, radius: number) {
    try {
      const R = 6371; 
      const nearbyRestaurants = await prisma.$queryRaw`
      SELECT *, (
        ${R} * acos(
          cos(radians(${lat})) * cos(radians(latitude)) *
          cos(radians(longitude) - radians(${lon})) +
          sin(radians(${lat})) * sin(radians(latitude))
        )
      ) AS distance
      FROM "Restaurant"
      WHERE
        (
          ${R} * acos(
            cos(radians(${lat})) * cos(radians(latitude)) *
            cos(radians(longitude) - radians(${lon})) +
            sin(radians(${lat})) * sin(radians(latitude))
          )
        ) <= ${radius}
      ORDER BY distance;
    `;
    
      return nearbyRestaurants;
    } catch (error) {
      throw new Error(`Unexpected error occurred: ${(error as Error).message}`);
    }
  }
}