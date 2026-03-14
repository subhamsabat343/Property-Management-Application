import { Prisma } from "@generated/prisma";

export type OrganizationInput = Omit<
  Prisma.organizationsUncheckedCreateInput,
  "id" | "created_at" | "last_updated_at"
>;
