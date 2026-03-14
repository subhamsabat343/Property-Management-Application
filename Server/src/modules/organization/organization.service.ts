import prisma from "@/core/database/prismaClient.ts";
import { Prisma } from "@generated/prisma";

type CreateInput = Omit<
  Prisma.organizationsUncheckedCreateInput,
  "id" | "created_at" | "last_updated_at"
>;
type UpdateInput = Omit<
  Prisma.organizationsUncheckedUpdateInput,
  "id" | "created_at" | "last_updated_at"
>;

export const OrganizationService = {
  getAll: async () => {
    return prisma.organizations.findMany();
  },

  getById: async (id: number) => {
    return prisma.organizations.findUnique({ where: { id } });
  },

  create: async (data: CreateInput) => {
    return prisma.organizations.create({ data });
  },

  update: async (id: number, data: UpdateInput) => {
    return prisma.organizations.update({ where: { id }, data });
  },

  delete: async (id: number) => {
    return prisma.organizations.delete({ where: { id } });
  },
};
