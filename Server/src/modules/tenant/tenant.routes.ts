import { Router } from "express";
import { TenantController } from "./tenant.controller.ts";

const router = Router();

router.get("/", TenantController.getTenants);
router.get("/:id", TenantController.getTenantById);
router.post("/", TenantController.createTenant);
router.put("/:id", TenantController.updateTenant);
router.delete("/:id", TenantController.deleteTenant);

export default router;
