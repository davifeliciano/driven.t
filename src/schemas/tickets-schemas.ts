import Joi from 'joi';
import { createTicketBody } from '@/protocols';

export const createTicketSchema = Joi.object<createTicketBody>({
  ticketTypeId: Joi.number().integer().positive().required(),
});
