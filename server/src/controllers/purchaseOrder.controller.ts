import { PrismaClient, po_status } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

// GET /api/purchase-orders?status=Pending
export const listPOs = async (req:Request,res:Response) => {
  const { status } = req.query;
  const pos = await prisma.purchase_order.findMany({
    where: { status: status as po_status | undefined },
    orderBy: { created_at: "desc" },
    include: { buyer:true, material:true }
  });
  res.json(pos);
};

export const createPO = async (req: Request, res: Response): Promise<void> => {
  try {
    const { buyer_id, material_id, quantity, bid_amount, status, terms } = req.body;

    if (!buyer_id || !material_id || !quantity || !bid_amount) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    if (status && !Object.values(po_status).includes(status)) {
      res.status(400).json({ message: "Invalid status value" });
      return;
    }

    const po = await prisma.purchase_order.create({
      data: { buyer_id, material_id, quantity, bid_amount, terms, status: status ?? po_status.Pending },
      include: { buyer: true, material: true },
    });

    res.status(201).json(po);
  } catch (error) {
    console.error("Error creating PO:", error);
    res.status(500).json({ message: "Error creating purchase order" });
  }
};

export const updatePOStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;

  if (!Object.values(po_status).includes(status)) {
    res.status(400).json({ message: "Invalid status value" });
    return;
  }

  try {
    const po = await prisma.purchase_order.update({
      where: { po_id: Number(id) },
      data: { status },
    });
    res.json(po);
  } catch (error) {
    res.status(500).json({ message: "Error updating PO status" });
  }
};