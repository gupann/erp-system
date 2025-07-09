"use client";
import React, { useState } from "react";

import CardRecentTx from "./CardRecentTx";
import CardStockpileSummary from "./CardStockpileSummary";
import CardSalesSummary from "./CardSalesSummary";
import CardPendingPO from "./CardPendingPO";
import CardQuickEntry from './CardQuickEntry';
import CardEditStockpile from './CardEditStockpile';
import CardPOActions from './CardPOActions';
import RecordMovementDialog from "../(components)/RecordMovementDialog";
import AddPODialog from '../(components)/AddPODialog';

const Dashboard = () => {
  const [isTxDialogOpen, setTxDialogOpen] = useState(false);
  const [isPODialogOpen, setPODialogOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardRecentTx/>
      <CardStockpileSummary/>
      <CardSalesSummary />
      <CardPendingPO />

      <CardQuickEntry onAdd={() => setTxDialogOpen(true)} />
      <RecordMovementDialog
        open={isTxDialogOpen}
        onClose={() => setTxDialogOpen(false)}
      />

      <CardEditStockpile />

      <CardPOActions onCreate={() => setPODialogOpen(true)}/>
      <AddPODialog
        open={isPODialogOpen}
        onClose={() => setPODialogOpen(false)}
        onSaved={() => {
          setPODialogOpen(false);
        }}
      />
    </div>
  );
};

export default Dashboard;
