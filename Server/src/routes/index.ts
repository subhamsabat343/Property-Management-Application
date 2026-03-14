import { Router } from "express";
import documentRoutes from "@/modules/document/document.routes.ts";
import expenseRoutes from "@/modules/expense/expense.routes.ts";
import leaseRoutes from "@/modules/lease/lease.routes.ts";
import maintenance_requestRoutes from "@/modules/maintenance_request/maintenance_request.routes.ts";
import organizationRoutes from "@/modules/organization/organization.routes.ts";
import paymentRoutes from "@/modules/payment/payment.routes.ts";
import propertyRoutes from "@/modules/property/property.routes.ts";
import tenantRoutes from "@/modules/tenant/tenant.routes.ts";
import unitRoutes from "@/modules/unit/unit.routes.ts";
import userRoutes from "@/modules/user/user.routes.ts";

const router = Router();

router.use("/documents", documentRoutes);
router.use("/expenses", expenseRoutes);
router.use("/leases", leaseRoutes);
router.use("/maintenance_requests", maintenance_requestRoutes);
router.use("/organizations", organizationRoutes);
router.use("/payments", paymentRoutes);
router.use("/properties", propertyRoutes);
router.use("/tenants", tenantRoutes);
router.use("/units", unitRoutes);
router.use("/users", userRoutes);

export default router;
