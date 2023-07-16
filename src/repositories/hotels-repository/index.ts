import { prisma } from '@/config';

async function listHotels() {
  return prisma.hotel.findMany({ include: { Rooms: true } });
}

async function getHotelById(hotelId: number) {
  return prisma.hotel.findUnique({ where: { id: hotelId }, include: { Rooms: true } });
}

const hotelRepository = { listHotels, getHotelById };

export default hotelRepository;
