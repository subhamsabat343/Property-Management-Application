import { Request, Response } from "express";
import { OrganizationService } from "./organization.service.ts";

export const OrganizationController = {
  getOrganizations: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await OrganizationService.getAll();
      res
        .status(200)
        .json({ success: true, data, message: "Retrieved successfully" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  getOrganizationById: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      const data = await OrganizationService.getById(id);
      if (!data) {
        res.status(404).json({ success: false, message: "Not found" });
        return;
      }
      res
        .status(200)
        .json({ success: true, data, message: "Retrieved successfully" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  createOrganization: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id: _id, ...payload } = req.body;
      const data = await OrganizationService.create(
        payload as Parameters<typeof OrganizationService.create>[0]
      );
      res
        .status(201)
        .json({ success: true, data, message: "Created successfully" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  updateOrganization: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      const { id: _id, ...payload } = req.body;
      const data = await OrganizationService.update(
        id,
        payload as Parameters<typeof OrganizationService.update>[1]
      );
      res
        .status(200)
        .json({ success: true, data, message: "Updated successfully" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  deleteOrganization: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      await OrganizationService.delete(id);
      res.status(200).json({ success: true, message: "Deleted successfully" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};
