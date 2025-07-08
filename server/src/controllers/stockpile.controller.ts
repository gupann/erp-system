import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const listStockpiles = async (_:Request, res:Response) => {
    const sp = await prisma.stockpile.findMany({ include: { material:true } });
    res.json(sp);
  };
  
  export const createStockpile = async (req:Request, res:Response) => {
    const { material_id, weight_actual, value_appraised,
            origin, metal_details } = req.body;
  
    const sp = await prisma.stockpile.create({
      data: { material_id, weight_actual, value_appraised, origin, metal_details },
    });
    res.status(201).json(sp);
  };
  