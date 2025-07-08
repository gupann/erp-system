"use client";

import { Pencil } from "lucide-react";
import React from "react";

interface Props {
  onEdit?: () => void;
}

const CardEditStockpile: React.FC<Props> = ({
  onEdit = () => alert("edit stockpile form"),
}) => (
  <div className="row-span-1 rounded-2xl flex flex-col items-center justify-center">
    <button
      onClick={onEdit}
      className="flex flex-col items-center text-blue-600 hover:text-blue-700"
    >
      <Pencil className="w-10 h-10 mb-1" />
      <span className="text-sm font-medium">Edit</span>
    </button>
  </div>
);

export default CardEditStockpile;
