import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const listParties = async (_: Request, res: Response) => {
  const parties = await prisma.party.findMany();
  res.json(parties);
};

export const createParty = async (req: Request, res: Response) => {
  const { name, role } = req.body;
  const party = await prisma.party.create({ data: { name, role } });
  res.status(201).json(party);
};
