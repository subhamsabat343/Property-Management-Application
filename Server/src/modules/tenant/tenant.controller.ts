import { Request, Response } from "express";
import { TenantService } from "./tenant.service.ts";

export const TenantController = {
  getTenants: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await TenantService.getAll();
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

  getTenantById: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      const data = await TenantService.getById(id);
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

  createTenant: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id: _id, ...payload } = req.body;
      const data = await TenantService.create(
        payload as Parameters<typeof TenantService.create>[0]
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

  updateTenant: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      const { id: _id, ...payload } = req.body;
      const data = await TenantService.update(
        id,
        payload as Parameters<typeof TenantService.update>[1]
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

  deleteTenant: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      await TenantService.delete(id);
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
