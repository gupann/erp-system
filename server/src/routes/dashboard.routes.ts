import { Router } from "express";
import { getDashboardSummary } from "../controllers/dashboard.controller";
const router = Router();

router.get("/", getDashboardSummary);
export default router;
