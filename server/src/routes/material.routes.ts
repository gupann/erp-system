import { Router } from "express";
import { listMaterials, createMaterial } from "../controllers/material.controller";
const r = Router();

r.get("/",  listMaterials);
r.post("/", createMaterial);
export default r;
