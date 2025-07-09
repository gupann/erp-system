"use client";

import { FilePlus2, Pencil } from "lucide-react";
import React from "react";
interface Props {
  onAdd?: () => void;
  onEdit?: () => void;
}

const CardQuickEntry: React.FC<Props> = ({
  onAdd = () => alert("new in/outbound form"),
  onEdit = () => alert("Future work! - allow edit of in/outbound entries"),
}) => (
  <div className="row-span-1 rounded-2xl flex items-center justify-around px-6">
    <button
      onClick={onAdd}
      className="flex flex-col items-center text-green-600 hover:text-green-700"
    >
      <FilePlus2 className="w-10 h-10 mb-1" />
      <span className="text-sm font-medium">Record</span>
    </button>

    <div className="h-10 border-r" />

    <button
      onClick={onEdit}
      className="flex flex-col items-center text-blue-600 hover:text-blue-700"
    >
      <Pencil className="w-10 h-10 mb-1" />
      <span className="text-sm font-medium">Edit</span>
    </button>
  </div>
);

export default CardQuickEntry;