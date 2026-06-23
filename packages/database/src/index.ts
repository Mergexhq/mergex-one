// Import the generated client from the root src/generated/prisma/client
import { PrismaClient } from "../../../src/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: any };

export const prisma = globalForPrisma.prisma || new (PrismaClient as any)({});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export * from './queries';
export * from './repositories';
