import { Request, Response } from "express";
import { PaymentService } from "./payment.service.ts";

export const PaymentController = {
  getPayments: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await PaymentService.getAll();
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

  getPaymentById: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      const data = await PaymentService.getById(id);
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

  createPayment: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id: _id, ...payload } = req.body;
      const data = await PaymentService.create(
        payload as Parameters<typeof PaymentService.create>[0]
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

  updatePayment: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      const { id: _id, ...payload } = req.body;
      const data = await PaymentService.update(
        id,
        payload as Parameters<typeof PaymentService.update>[1]
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

  deletePayment: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      await PaymentService.delete(id);
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
