import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// route imports
import dashboardRoutes from "./routes/dashboard.routes";
import partyRoutes from "./routes/party.routes";
import materialRoutes from "./routes/material.routes";
import inventoryTxRoutes from "./routes/inventoryTx.routes";
import stockpileRoutes from "./routes/stockpile.routes";
import purchaseOrderRoutes from "./routes/purchaseOrder.routes";

// configs
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/parties", partyRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/inventory", inventoryTxRoutes);
app.use("/api/stockpiles", stockpileRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);

export default app;

// server
/* ---------- local dev only ---------- */
if (process.env.VERCEL !== "1") {   // Vercel injects VERCEL=1
  const port = Number(process.env.PORT) || 8000;
  app.listen(port, "0.0.0.0", () =>
    console.log(`Server running on http://localhost:${port}`)
  );
}