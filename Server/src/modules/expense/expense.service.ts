import prisma from "@/core/database/prismaClient.ts";
import { Prisma } from "@generated/prisma";

type CreateInput = Omit<
  Prisma.expensesUncheckedCreateInput,
  "id" | "created_at" | "last_updated_at"
>;
type UpdateInput = Omit<
  Prisma.expensesUncheckedUpdateInput,
  "id" | "created_at" | "last_updated_at"
>;

export const ExpenseService = {
  getAll: async () => {
    return prisma.expenses.findMany();
  },

  getById: async (id: number) => {
    return prisma.expenses.findUnique({ where: { id } });
  },

  create: async (data: CreateInput) => {
    return prisma.expenses.create({ data });
  },

  update: async (id: number, data: UpdateInput) => {
    return prisma.expenses.update({ where: { id }, data });
  },

  delete: async (id: number) => {
    return prisma.expenses.delete({ where: { id } });
  },
};
