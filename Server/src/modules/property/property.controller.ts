import { Request, Response } from "express";
import { PropertyService } from "./property.service.ts";

export const PropertyController = {
  getProperties: async (req: Request, res: Response): Promise<void> => {
    try {
      const properties = await PropertyService.getAllProperties();
      res.status(200).json({
        success: true,
        data: properties,
        message: "Properties retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  getPropertyById: async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const property = await PropertyService.getPropertyById(id as string);

      if (!property) {
        res.status(404).json({
          success: false,
          message: "Property not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: property,
        message: "Property details retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};
