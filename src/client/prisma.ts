import { PrismaClient } from '../generated/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prismaClient = globalForPrisma.prisma || new PrismaClient()

globalForPrisma.prisma = prismaClient
