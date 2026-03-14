import prisma from "@/core/database/prismaClient.ts";
import { Prisma } from "@generated/prisma";

type CreateInput = Omit<
  Prisma.tenantsUncheckedCreateInput,
  "id" | "created_at" | "last_updated_at"
>;
type UpdateInput = Omit<
  Prisma.tenantsUncheckedUpdateInput,
  "id" | "created_at" | "last_updated_at"
>;

export const TenantService = {
  getAll: async () => {
    return prisma.tenants.findMany();
  },

  getById: async (id: number) => {
    return prisma.tenants.findUnique({ where: { id } });
  },

  create: async (data: CreateInput) => {
    return prisma.tenants.create({ data });
  },

  update: async (id: number, data: UpdateInput) => {
    return prisma.tenants.update({ where: { id }, data });
  },

  delete: async (id: number) => {
    return prisma.tenants.delete({ where: { id } });
  },
};
