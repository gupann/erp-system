"use client";

import React from "react";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useGetDashboardQuery } from "@/state/api";

const CardRecentTx = () => {
  const { data: dashboardData, isLoading } = useGetDashboardQuery();
  const recentTx = dashboardData?.recentTx ?? [];

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Recent Activity
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {recentTx.length === 0 ? (
              <div className="px-6 py-10 text-gray-500 text-sm">
                No recent transactions.
              </div>
            ) : (
              recentTx.map((tx) => (
                <div
                  key={tx.tx_id}
                  className="flex items-center justify-between gap-3 px-5 py-7 border-b"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-lg w-14 h-14 flex items-center justify-center ${
                        tx.direction === "inbound"
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {tx.direction === "inbound" ? (
                        <ArrowDownCircle className="text-green-600 w-6 h-6" />
                      ) : (
                        <ArrowUpCircle className="text-red-600 w-6 h-6" />
                      )}
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                      <div className="font-bold text-gray-700">
                        {tx.material?.name ?? "Unknown Material"}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {formatDate(tx.recorded_at)}
                      </div>
                      <div className="flex text-sm items-center">
                        <span
                          className={`font-bold text-xs ${
                            tx.direction === "inbound"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {tx.direction.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-md font-medium tabular-nums">
                    {tx.qty_net.toLocaleString()} kg
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CardRecentTx;
