import { Enrollment, TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function findTicket(ticketId: number) {
  return prisma.ticket.findFirst({ where: { id: ticketId }, include: { Enrollment: true, TicketType: true } });
}

async function findTicketFromEnrollment(enrollment: Enrollment) {
  return prisma.ticket.findFirst({ where: { enrollmentId: enrollment.id }, include: { TicketType: true } });
}

async function updateStatus(ticketId: number, status: TicketStatus) {
  return prisma.ticket.update({ where: { id: ticketId }, data: { status } });
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: { enrollmentId, ticketTypeId, status: 'RESERVED' },
    include: { TicketType: true },
  });
}

const ticketsRepository = { findTicket, findTicketFromEnrollment, updateStatus, createTicket };

export default ticketsRepository;
