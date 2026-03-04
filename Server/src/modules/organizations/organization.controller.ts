import { Request, Response } from "express";
import prisma from "@/core/database/prismaClient.ts";

export const getOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await prisma.organizations.findMany();
    res.status(200).json({ success: true, data: organizations });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching organizations", error });
  }
};
