import { Router } from "express";
import { PropertyController } from "./property.controller.ts";

const router = Router();

router.get("/", PropertyController.getProperties);
router.get("/:id", PropertyController.getPropertyById);

export default router;
