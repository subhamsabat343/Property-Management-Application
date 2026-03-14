import { Router } from "express";
import { DocumentController } from "./document.controller.ts";

const router = Router();

router.get("/", DocumentController.getDocuments);
router.get("/:id", DocumentController.getDocumentById);
router.post("/", DocumentController.createDocument);
router.put("/:id", DocumentController.updateDocument);
router.delete("/:id", DocumentController.deleteDocument);

export default router;
