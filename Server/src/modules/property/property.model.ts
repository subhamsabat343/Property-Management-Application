export interface PhysicalProperty {
  id: string;
  name: string;
  address: string;
  type: "Apartment" | "House" | "Condo" | "Studio";
  status: "Available" | "Occupied" | "Maintenance";
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq ft
  imageUrl?: string;
  createdAt: string;
}
