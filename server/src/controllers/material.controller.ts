import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const listMaterials = async (_: Request, res: Response) => {
  res.json(await prisma.material.findMany());
};

export const createMaterial = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    res.status(400).json({ error: "Material name is required" });
    return;
  }

  const existing = await prisma.material.findFirst({ where: { name } });
  if (existing) {
    res.status(409).json({ error: "Material already exists" });
    return;
  }

  const created = await prisma.material.create({ data: { name } });
  res.status(201).json(created);
};
