import { Router } from "express";
import { ExpenseController } from "./expense.controller.ts";

const router = Router();

router.get("/", ExpenseController.getExpenses);
router.get("/:id", ExpenseController.getExpenseById);
router.post("/", ExpenseController.createExpense);
router.put("/:id", ExpenseController.updateExpense);
router.delete("/:id", ExpenseController.deleteExpense);

export default router;
