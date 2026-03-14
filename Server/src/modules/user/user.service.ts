import prisma from "@/core/database/prismaClient.ts";
import { Prisma } from "@generated/prisma";

type CreateInput = Omit<
  Prisma.usersUncheckedCreateInput,
  "id" | "created_at" | "last_updated_at"
>;
type UpdateInput = Omit<
  Prisma.usersUncheckedUpdateInput,
  "id" | "created_at" | "last_updated_at"
>;

export const UserService = {
  getAll: async () => {
    return prisma.users.findMany();
  },

  getById: async (id: number) => {
    return prisma.users.findUnique({ where: { id } });
  },

  create: async (data: CreateInput) => {
    return prisma.users.create({ data });
  },

  update: async (id: number, data: UpdateInput) => {
    return prisma.users.update({ where: { id }, data });
  },

  delete: async (id: number) => {
    return prisma.users.delete({ where: { id } });
  },
};
