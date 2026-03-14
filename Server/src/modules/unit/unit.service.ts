import prisma from "@/core/database/prismaClient.ts";
import { Prisma } from "@generated/prisma";

type CreateInput = Omit<
  Prisma.unitsUncheckedCreateInput,
  "id" | "created_at" | "last_updated_at"
>;
type UpdateInput = Omit<
  Prisma.unitsUncheckedUpdateInput,
  "id" | "created_at" | "last_updated_at"
>;

export const UnitService = {
  getAll: async () => {
    return prisma.units.findMany();
  },

  getById: async (id: number) => {
    return prisma.units.findUnique({ where: { id } });
  },

  create: async (data: CreateInput) => {
    return prisma.units.create({ data });
  },

  update: async (id: number, data: UpdateInput) => {
    return prisma.units.update({ where: { id }, data });
  },

  delete: async (id: number) => {
    return prisma.units.delete({ where: { id } });
  },
};
