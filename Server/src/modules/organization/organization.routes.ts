import { Router } from "express";
import { OrganizationController } from "./organization.controller.ts";

const router = Router();

router.get("/", OrganizationController.getOrganizations);
router.get("/:id", OrganizationController.getOrganizationById);
router.post("/", OrganizationController.createOrganization);
router.put("/:id", OrganizationController.updateOrganization);
router.delete("/:id", OrganizationController.deleteOrganization);

export default router;
