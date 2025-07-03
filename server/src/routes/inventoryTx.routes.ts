import { Router } from "express";
import { listInventoryTx, createInventoryTx } from "../controllers/inventoryTx.controller";
const r = Router();

r.get("/", listInventoryTx);
r.post("/", createInventoryTx);
export default r;
