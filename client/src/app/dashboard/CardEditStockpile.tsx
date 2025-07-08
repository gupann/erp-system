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
      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
    >
      <Pencil className="w-5 h-5" />
      Edit Stockpile
    </button>

    <p className="text-xs text-gray-500 mt-2">
      Update weight, value, metal details…
    </p>
  </div>
);

export default CardEditStockpile;
