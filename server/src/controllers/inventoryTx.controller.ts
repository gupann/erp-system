import { PrismaClient, tx_direction, tx_status } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

// GET /api/inventory?direction=inbound&material_id=1
export async function listInventoryTx (req: Request, res: Response) {
  const { direction, material_id } = req.query;

  const txs = await prisma.inventory_tx.findMany({
    where: {
      direction: direction as tx_direction | undefined,
      material_id: material_id ? Number(material_id) : undefined,
    },
    include: { party: true, material: true },
    orderBy: { recorded_at: "desc" },
  });
  res.json(txs);
}

// POST /api/inventory  – create inbound/outbound record
export async function createInventoryTx (req: Request, res: Response) {
  const { direction, party_id, material_id,
          qty_net, qty_adjusted, status } = req.body;

  const tx = await prisma.inventory_tx.create({
    data: {
      direction,
      party_id,
      material_id,
      qty_net,
      qty_adjusted,
      status: status ?? tx_status.unfulfilled,
    },
  });
  res.status(201).json(tx);
}
