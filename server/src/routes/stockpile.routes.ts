import { Router } from "express";
import { listStockpiles, createStockpile } from "../controllers/stockpile.controller";
const r = Router();

r.get("/",  listStockpiles);
r.post("/", createStockpile);
export default r;
