import { Router } from 'express';
import { authenticateToken, validateParams, validateTicket } from '@/middlewares';
import { getHotelByIdController, listHotelsController } from '@/controllers/hotels-controller';
import { getHotelByIdSchema } from '@/schemas/hotels-schemas';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken, validateTicket)
  .get('/', listHotelsController)
  .get('/:hotelId', validateParams(getHotelByIdSchema), getHotelByIdController);

export { hotelsRouter };
