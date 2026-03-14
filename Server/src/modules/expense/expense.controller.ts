import { Request, Response } from "express";
import { ExpenseService } from "./expense.service.ts";

export const ExpenseController = {
  getExpenses: async (req: Request, res: Response): Promise<void> => {
    try {
      const data = await ExpenseService.getAll();
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

  getExpenseById: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      const data = await ExpenseService.getById(id);
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

  createExpense: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id: _id, ...payload } = req.body;
      const data = await ExpenseService.create(
        payload as Parameters<typeof ExpenseService.create>[0]
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

  updateExpense: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      const { id: _id, ...payload } = req.body;
      const data = await ExpenseService.update(
        id,
        payload as Parameters<typeof ExpenseService.update>[1]
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

  deleteExpense: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string, 10);
      if (isNaN(id)) {
        res.status(400).json({ success: false, message: "Invalid ID format" });
        return;
      }
      await ExpenseService.delete(id);
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
