"use client";
import CardRecentTx from "./CardRecentTx";
import CardStockpileSummary from "./CardStockpileSummary"
import CardSalesSummary from "./CardSalesSummary"
import CardPendingPO from "./CardPendingPO";
import CardQuickEntry from './CardQuickEntry';
import CardEditStockpile from './CardEditStockpile';
import CardPOActions from './CardPOActions';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardRecentTx/>
      <CardStockpileSummary/>
      <CardSalesSummary />
      <CardPendingPO />
      <CardQuickEntry />
      <CardEditStockpile />
      <CardPOActions />

    </div>
  );
};

export default Dashboard;