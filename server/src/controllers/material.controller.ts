import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const listMaterials = async (_: Request, res: Response) => {
    res.json(await prisma.material.findMany());
  };
  export const createMaterial = async (req: Request, res: Response) => {
    const { name } = req.body;
    res.status(201).json(await prisma.material.create({ data: { name } }));
  };
  