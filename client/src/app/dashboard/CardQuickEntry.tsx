"use client";

import { PlusCircle, MinusCircle } from "lucide-react";
import React from "react";

interface Props {
  onInbound?: () => void;
  onOutbound?: () => void;
}

const CardQuickEntry: React.FC<Props> = ({
  onInbound = () => alert("new nbound form"),
  onOutbound = () => alert("new outbound form"),
}) => (
  <div className="row-span-1 rounded-2xl flex items-center justify-around px-6">
    <button
      onClick={onInbound}
      className="flex flex-col items-center text-green-600 hover:text-green-700"
    >
      <PlusCircle className="w-10 h-10 mb-1" />
      <span className="text-sm font-medium">Inbound</span>
    </button>

    <div className="h-10 border-r" />

    <button
      onClick={onOutbound}
      className="flex flex-col items-center text-red-600 hover:text-red-700"
    >
      <MinusCircle className="w-10 h-10 mb-1" />
      <span className="text-sm font-medium">Outbound</span>
    </button>
  </div>
);

export default CardQuickEntry;
