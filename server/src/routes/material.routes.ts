import express from "express";
import { createMaterial, listMaterials } from "../controllers/material.controller";

const router = express.Router();

router.get("/", listMaterials);
router.post("/", createMaterial);

export default router;
