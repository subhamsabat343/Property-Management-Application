import { PhysicalProperty } from "./property.model.ts";

const MOCK_PROPERTIES: PhysicalProperty[] = [
  {
    id: "prop_1",
    name: "Golden Heights Apartment",
    address: "123 Business Bay, NY",
    type: "Apartment",
    status: "Available",
    price: 2500,
    bedrooms: 2,
    bathrooms: 1,
    area: 1200,
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prop_2",
    name: "The Grand Villa",
    address: "456 Sunset Boulevard, LA",
    type: "House",
    status: "Occupied",
    price: 4500,
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    imageUrl:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prop_3",
    name: "Loft 21",
    address: "21 Loft St, Chicago",
    type: "Studio",
    status: "Available",
    price: 1800,
    bedrooms: 1,
    bathrooms: 1,
    area: 850,
    imageUrl:
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prop_4",
    name: "Pinecrest Home",
    address: "789 Pineview Rd, Denver",
    type: "House",
    status: "Maintenance",
    price: 3200,
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prop_5",
    name: "Urban Condos",
    address: "101 Metro Center, Seattle",
    type: "Condo",
    status: "Available",
    price: 2200,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    imageUrl:
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
    createdAt: new Date().toISOString(),
  },
];

export const PropertyService = {
  getAllProperties: async (): Promise<PhysicalProperty[]> => {
    return MOCK_PROPERTIES;
  },

  getPropertyById: async (
    id: string
  ): Promise<PhysicalProperty | undefined> => {
    return MOCK_PROPERTIES.find((p) => p.id === id);
  },
};
