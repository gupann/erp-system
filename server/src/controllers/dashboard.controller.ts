import { PrismaClient, tx_direction, po_status } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

/*
GET /api/dashboard
- Last 5 inbound/outbound tx
- Current stockpile totals per material
- Pending POs
*/
export async function getDashboardSummary (req: Request, res: Response) {
  try {
    const recentTx = await prisma.inventory_tx.findMany({
      take: 5,
      orderBy: { recorded_at: "desc" },
      include: { party: true, material: true },
    });

    const stockTotals = await prisma.stockpile.groupBy({
      by: ["material_id"],
      _sum: { weight_actual: true, value_appraised: true },
      orderBy: { material_id: "asc" },
    });

    const pendingPOs = await prisma.purchase_order.findMany({
      where: { status: po_status.Pending },
      orderBy: { created_at: "desc" },
      take: 5,
      include: { buyer: true, material: true },
    });

    res.json({ recentTx, stockTotals, pendingPOs });
  } catch (e) {
    res.status(500).json({ message: "Dashboard query failed" });
  }
}
