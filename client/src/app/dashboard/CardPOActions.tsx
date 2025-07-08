"use client";

import { FilePlus2, Pencil } from "lucide-react";
import React from "react";

interface Props {
  onCreate?: () => void;
  onManage?: () => void;
}

const CardPOActions: React.FC<Props> = ({
  onCreate = () => alert("create PO form"),
  onManage = () => alert("edit PO form"),
}) => (
  <div className="row-span-1 rounded-2xl flex items-center justify-around px-6">
    <button
      onClick={onCreate}
      className="flex flex-col items-center text-green-600 hover:text-green-700"
    >
      <FilePlus2 className="w-9 h-9 mb-1" />
      <span className="text-sm font-medium">New PO</span>
    </button>

    <div className="h-10 border-r" />

    <button
      onClick={onManage}
      className="flex flex-col items-center text-blue-600 hover:text-blue-700"
    >
      <Pencil className="w-9 h-9 mb-1" />
      <span className="text-sm font-medium">Edit PO</span>
    </button>
  </div>
);

export default CardPOActions;
