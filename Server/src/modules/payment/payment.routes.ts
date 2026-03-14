import { Router } from "express";
import { PaymentController } from "./payment.controller.ts";

const router = Router();

router.get("/", PaymentController.getPayments);
router.get("/:id", PaymentController.getPaymentById);
router.post("/", PaymentController.createPayment);
router.put("/:id", PaymentController.updatePayment);
router.delete("/:id", PaymentController.deletePayment);

export default router;
