import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/protocols';
import { prisma } from '@/config';
import { notFoundError } from '@/errors';
import { paymentRequiredError } from '@/errors/payment-required-error';

export async function validateTicket(req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    include: { Enrollment: { include: { Ticket: { include: { TicketType: true } } } } },
  });

  if (user.Enrollment.length === 0 || user.Enrollment[0].Ticket.length === 0) {
    throw notFoundError();
  }

  if (
    user.Enrollment[0].Ticket[0].status !== 'PAID' ||
    user.Enrollment[0].Ticket[0].TicketType.isRemote ||
    !user.Enrollment[0].Ticket[0].TicketType.includesHotel
  ) {
    throw paymentRequiredError();
  }

  next();
}
