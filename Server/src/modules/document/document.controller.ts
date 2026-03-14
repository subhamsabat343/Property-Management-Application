import { Request, Response } from "express";
import { DocumentService } from "./document.service.ts";

export const DocumentController = {
  getDocuments: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await DocumentService.getAll();
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

  getDocumentById: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      const data = await DocumentService.getById(id);
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

  createDocument: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id: _id, ...payload } = req.body;
      const data = await DocumentService.create(
        payload as Parameters<typeof DocumentService.create>[0]
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

  updateDocument: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      const { id: _id, ...payload } = req.body;
      const data = await DocumentService.update(
        id,
        payload as Parameters<typeof DocumentService.update>[1]
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

  deleteDocument: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      await DocumentService.delete(id);
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
