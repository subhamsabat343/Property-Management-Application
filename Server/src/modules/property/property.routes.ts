import { Router } from "express";
import { PropertyController } from "./property.controller.ts";

const router = Router();

router.get("/", PropertyController.getPropertys);
router.get("/:id", PropertyController.getPropertyById);
router.post("/", PropertyController.createProperty);
router.put("/:id", PropertyController.updateProperty);
router.delete("/:id", PropertyController.deleteProperty);

export default router;
