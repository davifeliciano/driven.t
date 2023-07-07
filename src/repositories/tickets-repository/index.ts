import { Enrollment } from '@prisma/client';
import { prisma } from '@/config';

async function findTicketFromEnrollment(enrollment: Enrollment) {
  return prisma.ticket.findFirst({ where: { enrollmentId: enrollment.id }, include: { TicketType: true } });
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: { enrollmentId, ticketTypeId, status: 'RESERVED' },
    include: { TicketType: true },
  });
}

const ticketsRepository = { findTicketFromEnrollment, createTicket };

export default ticketsRepository;
