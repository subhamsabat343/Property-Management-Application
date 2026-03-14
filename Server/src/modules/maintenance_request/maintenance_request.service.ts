import prisma from "@/core/database/prismaClient.ts";
import { Prisma } from "@generated/prisma";

type CreateInput = Omit<
  Prisma.maintenance_requestsUncheckedCreateInput,
  "id" | "created_at" | "last_updated_at"
>;
type UpdateInput = Omit<
  Prisma.maintenance_requestsUncheckedUpdateInput,
  "id" | "created_at" | "last_updated_at"
>;

export const MaintenanceRequestService = {
  getAll: async () => {
    return prisma.maintenance_requests.findMany();
  },

  getById: async (id: number) => {
    return prisma.maintenance_requests.findUnique({ where: { id } });
  },

  create: async (data: CreateInput) => {
    return prisma.maintenance_requests.create({ data });
  },

  update: async (id: number, data: UpdateInput) => {
    return prisma.maintenance_requests.update({ where: { id }, data });
  },

  delete: async (id: number) => {
    return prisma.maintenance_requests.delete({ where: { id } });
  },
};
