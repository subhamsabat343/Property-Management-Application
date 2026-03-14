import { Router } from "express";
import { UnitController } from "./unit.controller.ts";

const router = Router();

router.get("/", UnitController.getUnits);
router.get("/:id", UnitController.getUnitById);
router.post("/", UnitController.createUnit);
router.put("/:id", UnitController.updateUnit);
router.delete("/:id", UnitController.deleteUnit);

export default router;
