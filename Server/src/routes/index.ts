import { Router } from "express";
import propertyRoutes from "../modules/property/property.routes.ts";

const router = Router();

router.use("/properties", propertyRoutes);

export default router;
