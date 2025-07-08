"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { useGetDashboardQuery } from "@/state/api";

const formatUSD = (v: number) =>
  `$${v.toLocaleString("en", { maximumFractionDigits: 2 })}`;

const CardStockpileSummary = () => {
  const { data, isLoading, isError } = useGetDashboardQuery();
  const [timeframe, setTimeframe] = useState<"all" | "30" | "90">("all");

  const chartData = useMemo(() => {
    if (!data) return [];


    return data.stockTotals.map((row) => ({
      name: `#${row.material_id}`,
      value: row._sum.value_appraised ?? 0,
    }));
  }, [data]);

  const totalValue = chartData.reduce((acc, cur) => acc + cur.value, 0);
  const maxRow     = chartData.reduce(
    (acc, cur) => (cur.value > acc.value ? cur : acc),
    { name: "", value: 0 }
  );

  if (isError) return <div className="m-5">Failed to fetch data</div>;

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Stockpile Value
            </h2>
            <hr />
          </div>

          <div>
            <div className="flex justify-between items-center mb-6 px-7 mt-5">
              <div className="text-lg font-medium">
                <p className="text-xs text-gray-400">Total Appraised</p>
                <span className="text-2xl font-extrabold">
                  {formatUSD(totalValue)}
                </span>
                <span className="text-green-500 text-sm ml-2">
                    {/* TO DO: figure out how to get actual growth for this number */}
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  +4.2%
                </span>
              </div>

            {/* TO DO: add dates so that this feature can actually work */}
              <select
                className="shadow-sm border border-gray-300 bg-white p-2 rounded"
                value={timeframe}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setTimeframe(e.target.value as "all" | "30" | "90")
                  }
              >
                <option value="all">All</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
              </select>
            </div>

            <ResponsiveContainer width="100%" height={350} className="px-7">
              <BarChart
                data={chartData}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 12, dx: -1 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(v: number) => [formatUSD(v)]}
                  labelFormatter={(lbl) => `Material ${lbl}`}
                />
                <Bar
                  dataKey="value"
                  fill="#0ea5e9"
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <hr />
            <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
              <p>{chartData.length} materials</p>
              <p>
                Highest Value:{" "}
                <span className="font-bold">
                  {maxRow.name} ({formatUSD(maxRow.value)})
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardStockpileSummary;
