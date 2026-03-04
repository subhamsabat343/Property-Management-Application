import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";

// Lazy Loaded Pages
const DashboardPage = lazy(() => import("../features/dashboard").then(m => ({ default: m.DashboardPage })));
const PropertiesPage = lazy(() => import("../features/properties").then(m => ({ default: m.PropertiesPage })));
const TenantsPage = lazy(() => import("../features/tenants").then(m => ({ default: m.TenantsPage })));
const MaintenancePage = lazy(() => import("../features/maintenance").then(m => ({ default: m.MaintenancePage })));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "properties",
        element: <PropertiesPage />,
      },
      {
        path: "tenants",
        element: <TenantsPage />,
      },
      {
        path: "maintenance",
        element: <MaintenancePage />,
      },
    ],
  },
]);

export default router;
