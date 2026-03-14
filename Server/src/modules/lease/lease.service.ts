import prisma from "@/core/database/prismaClient.ts";
import { Prisma } from "@generated/prisma";

type CreateInput = Omit<
  Prisma.leasesUncheckedCreateInput,
  "id" | "created_at" | "last_updated_at"
>;
type UpdateInput = Omit<
  Prisma.leasesUncheckedUpdateInput,
  "id" | "created_at" | "last_updated_at"
>;

export const LeaseService = {
  getAll: async () => {
    return prisma.leases.findMany();
  },

  getById: async (id: number) => {
    return prisma.leases.findUnique({ where: { id } });
  },

  create: async (data: CreateInput) => {
    return prisma.leases.create({ data });
  },

  update: async (id: number, data: UpdateInput) => {
    return prisma.leases.update({ where: { id }, data });
  },

  delete: async (id: number) => {
    return prisma.leases.delete({ where: { id } });
  },
};
