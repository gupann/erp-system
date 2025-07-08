import { Router } from "express";
import { listPOs, createPO, updatePOStatus } from "../controllers/purchaseOrder.controller";

const r = Router();

r.get("/", listPOs);
r.post("/", createPO);
r.patch("/:id", updatePOStatus);

export default r;
