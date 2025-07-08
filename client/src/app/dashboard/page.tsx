"use client";
import CardRecentTx from "./CardRecentTx";
import CardStockpileSummary from "./CardStockpileSummary"
import CardSalesSummary from "./CardSalesSummary"
import CardPendingPO from "./CardPendingPO";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardRecentTx/>
      <CardStockpileSummary/>
      <CardSalesSummary />
      <CardPendingPO />
      <div className='md-row-span-1 xl:row-span-2 bg-gray-500'/>
      <div className='md-row-span-1 xl:row-span-2 bg-gray-500'/>
      <div className='md-row-span-1 xl:row-span-2 bg-gray-500'/>
    </div>
  );
};

export default Dashboard;