import { notFoundError, unauthorizedError } from '@/errors';
import { CardData } from '@/protocols';
import paymentsRepository from '@/repositories/payments-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getPaymentFromTicket(ticketId: number, userId: number) {
  const ticket = await ticketsRepository.findTicket(ticketId);

  if (ticket === null) {
    throw notFoundError();
  }

  if (userId !== ticket.Enrollment.userId) {
    throw unauthorizedError();
  }

  return paymentsRepository.getPaymentFromTicket(ticketId);
}

async function processPayment(ticketId: number, cardData: CardData, userId: number) {
  const ticket = await ticketsRepository.findTicket(ticketId);

  if (ticket === null) {
    throw notFoundError();
  }

  if (userId !== ticket.Enrollment.userId) {
    throw unauthorizedError();
  }

  const value = ticket.TicketType.price;
  const { issuer } = cardData;
  const cardLastDigits = cardData.number.toString().slice(-4);

  const [payment, _] = await Promise.all([
    paymentsRepository.createPayment(ticketId, value, issuer, cardLastDigits),
    ticketsRepository.updateStatus(ticketId, 'PAID'),
  ]);

  return payment;
}

const paymentsService = {
  getPaymentFromTicket,
  processPayment,
};

export default paymentsService;
