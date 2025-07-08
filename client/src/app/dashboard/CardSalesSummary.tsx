"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import numeral from "numeral";
import { useGetDashboardQuery } from "@/state/api";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const usd = (n: number) => numeral(n).format("$0.00a");

const CardSalesSummary = () => {
  const { data, isLoading } = useGetDashboardQuery();
  const purchaseData = data?.purchaseSummary ?? [];
  const latest = purchaseData.at(-1);

  if (isLoading) return <div className="m-5">Loading…</div>;

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
      <div>
        <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
          Sales Summary
        </h2>
        <hr />
      </div>

      <div>
        <div className="mb-4 mt-7 px-7">
          <p className="text-xs text-gray-400">Sold (Accepted POs)</p>
          <div className="flex items-center">
            <p className="text-2xl font-bold">
              {latest ? usd(latest.totalPurchased) : "$0"}
            </p>
            {latest && (
              <p
                className={`text-sm flex ml-3 ${
                  latest.changePercentage >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {latest.changePercentage >= 0 ? (
                  <TrendingUp className="w-5 h-5 mr-1" />
                ) : (
                  <TrendingDown className="w-5 h-5 mr-1" />
                )}
                {Math.abs(latest.changePercentage)}%
              </p>
            )}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={purchaseData}
            margin={{ top: 10, right: 10, left: -40, bottom: 70 }}
          >
            <XAxis dataKey="date" tick={false} axisLine={false} />
            <YAxis tick={false} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(v: number) => [`$${v.toLocaleString("en")}`]}
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }
            />
            <Area
              type="monotone"
              dataKey="totalPurchased"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.25}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CardSalesSummary;
