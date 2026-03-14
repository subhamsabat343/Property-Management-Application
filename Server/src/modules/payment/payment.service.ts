import prisma from "@/core/database/prismaClient.ts";
import { Prisma } from "@generated/prisma";

type CreateInput = Omit<
  Prisma.paymentsUncheckedCreateInput,
  "id" | "created_at" | "last_updated_at"
>;
type UpdateInput = Omit<
  Prisma.paymentsUncheckedUpdateInput,
  "id" | "created_at" | "last_updated_at"
>;

export const PaymentService = {
  getAll: async () => {
    return prisma.payments.findMany();
  },

  getById: async (id: number) => {
    return prisma.payments.findUnique({ where: { id } });
  },

  create: async (data: CreateInput) => {
    return prisma.payments.create({ data });
  },

  update: async (id: number, data: UpdateInput) => {
    return prisma.payments.update({ where: { id }, data });
  },

  delete: async (id: number) => {
    return prisma.payments.delete({ where: { id } });
  },
};
