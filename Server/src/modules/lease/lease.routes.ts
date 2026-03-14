import { Router } from "express";
import { LeaseController } from "./lease.controller.ts";

const router = Router();

router.get("/", LeaseController.getLeases);
router.get("/:id", LeaseController.getLeaseById);
router.post("/", LeaseController.createLease);
router.put("/:id", LeaseController.updateLease);
router.delete("/:id", LeaseController.deleteLease);

export default router;
