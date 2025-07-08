import { Router } from "express";
import { listParties, createParty } from "../controllers/party.controller";
const r = Router();

r.get("/",  listParties);
r.post("/", createParty);
export default r;
