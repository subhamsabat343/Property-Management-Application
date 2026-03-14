import { Router } from "express";
import { MaintenanceRequestController } from "./maintenance_request.controller.ts";

const router = Router();

router.get("/", MaintenanceRequestController.getMaintenanceRequests);
router.get("/:id", MaintenanceRequestController.getMaintenanceRequestById);
router.post("/", MaintenanceRequestController.createMaintenanceRequest);
router.put("/:id", MaintenanceRequestController.updateMaintenanceRequest);
router.delete("/:id", MaintenanceRequestController.deleteMaintenanceRequest);

export default router;
