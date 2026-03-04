import { Router } from "express";
import propertyRoutes from "@/modules/property/property.routes.ts";
import organizationRoutes from "@/modules/organizations/organization.routes.ts";

const router = Router();

router.use("/properties", propertyRoutes);
router.use("/organizations", organizationRoutes);

export default router;
