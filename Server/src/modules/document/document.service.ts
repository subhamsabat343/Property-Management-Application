import prisma from "@/core/database/prismaClient.ts";
import { Prisma } from "@generated/prisma";

type CreateInput = Omit<
  Prisma.documentsUncheckedCreateInput,
  "id" | "created_at" | "last_updated_at"
>;
type UpdateInput = Omit<
  Prisma.documentsUncheckedUpdateInput,
  "id" | "created_at" | "last_updated_at"
>;

export const DocumentService = {
  getAll: async () => {
    return prisma.documents.findMany();
  },

  getById: async (id: number) => {
    return prisma.documents.findUnique({ where: { id } });
  },

  create: async (data: CreateInput) => {
    return prisma.documents.create({ data });
  },

  update: async (id: number, data: UpdateInput) => {
    return prisma.documents.update({ where: { id }, data });
  },

  delete: async (id: number) => {
    return prisma.documents.delete({ where: { id } });
  },
};
