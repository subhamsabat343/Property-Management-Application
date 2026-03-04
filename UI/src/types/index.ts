// ========================
// Shared TypeScript Types
// ========================

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  type: "residential" | "commercial" | "mixed";
  units: number;
  occupancyRate: number;
  monthlyRevenue: number;
  imageUrl?: string;
  status: "active" | "maintenance" | "vacant";
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  unitNumber: string;
  leaseStart: string;
  leaseEnd: string;
  monthlyRent: number;
  status: "active" | "pending" | "expired";
  avatarUrl?: string;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  tenantName: string;
  propertyName: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalProperties: number;
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  totalTenants: number;
  monthlyRevenue: number;
  pendingMaintenance: number;
  occupancyRate: number;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}
