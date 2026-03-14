import prisma from "@/core/database/prismaClient.ts";
import { OrganizationInput } from "./organization.types.ts";

export const OrganizationService = {
  getAll: async () => {
    return prisma.organizations.findMany();
  },

  getById: async (id: number) => {
    return prisma.organizations.findUnique({ where: { id } });
  },

  create: async (data: OrganizationInput) => {
    return prisma.organizations.create({ data });
  },

  update: async (id: number, data: OrganizationInput) => {
    return prisma.organizations.update({ where: { id }, data });
  },

  delete: async (id: number) => {
    return prisma.organizations.delete({ where: { id } });
  },
};
