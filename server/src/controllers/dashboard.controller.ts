import { PrismaClient, po_status } from "@prisma/client";
import { startOfDay } from "date-fns";
import { Request, Response } from "express";

const prisma = new PrismaClient();

/*
GET /api/dashboard
recentTx – all inbound and outbound movements
stockTotals – value of available stockpile
purchaseSummary – daily sales (approved bid amounts) from accepted POs
pendingPOs – POs still waiting for approval
*/
export async function getDashboardSummary(req: Request, res: Response) {
  try {
    const recentTx = await prisma.inventory_tx.findMany({
      orderBy: { recorded_at: "desc" },
      include: { party: true, material: true },
      take: 5,                               // trim to last 5 if you like
    });

    const stockTotals = await prisma.stockpile.groupBy({
      by: ["material_id"],
      _sum: { weight_actual: true, value_appraised: true },
      orderBy: { material_id: "asc" },
    });

    const acceptedPOs = await prisma.purchase_order.findMany({
      where: { status: po_status.Accepted },
      select: { bid_amount: true, created_at: true },
    });

    const dailySales = new Map<string, number>();
    for (const po of acceptedPOs) {
      const day = startOfDay(po.created_at).toISOString().slice(0, 10);
      dailySales.set(day, (dailySales.get(day) || 0) + po.bid_amount);
    }

    const purchaseSummary = Array.from(dailySales.entries())
      .sort((a, b) => a[0].localeCompare(b[0])) 
      .map(([date, total], idx, arr) => {
        const prev = arr[idx - 1]?.[1] ?? total;
        const change = prev === 0 ? 0 : +(((total - prev) / prev) * 100).toFixed(2);
        return { date, totalPurchased: total, changePercentage: change };
      });

    const pendingPOs = await prisma.purchase_order.findMany({
      where: { status: po_status.Pending },
      include: { buyer: true, material: true },
      orderBy: { created_at: "desc" },
    });

    res.json({ recentTx, stockTotals, purchaseSummary, pendingPOs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Dashboard query failed" });
  }
}
