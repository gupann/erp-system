"use client";

import React from "react";
import { Clock10 } from "lucide-react";
import { useGetDashboardQuery } from "@/state/api";

const CardPendingPO = () => {
  const { data: dashboardData, isLoading } = useGetDashboardQuery();
  const pendingPOs = dashboardData?.pendingPOs ?? [];

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl pb-6 flex flex-col">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-6 pt-5 pb-2">
            Pending Purchase Orders
          </h3>
          <hr />

          <div className="overflow-y-auto flex-grow">
            {pendingPOs.length === 0 ? (
              <div className="px-6 py-10 text-gray-500 text-sm">
                No pending purchase orders.
              </div>
            ) : (
              pendingPOs.map((po) => (
                <div
                  key={po.po_id}
                  className="flex items-center justify-between gap-3 px-5 py-5 border-b"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg w-12 h-12 flex items-center justify-center bg-yellow-100">
                      <Clock10 className="text-yellow-600 w-5 h-5" />
                    </div>
                    <div className="flex flex-col justify-between gap-1">
                      <div className="font-bold text-gray-700">
                        {po.material?.name ?? "Unknown Material"}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {formatDate(po.created_at)}
                      </div>
                      <div className="text-yellow-600 text-xs font-semibold">
                        Pending
                      </div>
                    </div>
                  </div>

                  <div className="text-md font-medium tabular-nums">
                    {po.quantity.toLocaleString()} kg
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

export default CardPendingPO;
