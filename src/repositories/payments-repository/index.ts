import { prisma } from '@/config';

async function getPaymentFromTicket(ticketId: number) {
  return prisma.payment.findFirst({ where: { ticketId } });
}

async function createPayment(ticketId: number, value: number, cardIssuer: string, cardLastDigits: string) {
  return prisma.payment.create({ data: { ticketId, value, cardIssuer, cardLastDigits } });
}

const paymentsRepository = {
  getPaymentFromTicket,
  createPayment,
};

export default paymentsRepository;
