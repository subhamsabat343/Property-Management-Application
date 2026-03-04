import { Router } from "express";
import { getOrganizations } from "./organization.controller.ts";

const router = Router();

router.get("/", getOrganizations);

export default router;
