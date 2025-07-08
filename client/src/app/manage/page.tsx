// reference – https://mui.com/x/react-data-grid/
"use client";

import { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, Typography } from "@mui/material";
import {Pencil, SearchIcon } from "lucide-react";

interface Material {
  material_id: number;
  name: string;
}

interface Stockpile {
  stock_id: number;
  material_id: number;
  weight_actual: number;
  value_appraised?: number;
  origin?: string;
  metal_details?: string;
  material?: Material; 
}

const stockpileColumns: GridColDef<Stockpile>[] = [
  { field: "stock_id", headerName: "ID", width: 90 },

  {
    field: "material",
    headerName: "Material",
    width: 180,
    valueGetter: (_, row) => row.material?.name ?? `#${row.material_id}`,
  },

  {
    field: "weight_actual",
    headerName: "Weight (kg)",
    width: 140,
    type: "number",
  },

  {
    field: "value_appraised",
    headerName: "Appraised ($)",
    width: 150,
    type: "number",
    valueGetter: (_, r) =>
      r.value_appraised != null ? r.value_appraised.toLocaleString() : "—",
  },

  { field: "origin", headerName: "Origin / Lot", width: 160 },

  {
    field: "material_details",
    headerName: "Material Details",
    flex: 1,
    valueGetter: (_, row) => {
      try {
        if (!row.metal_details) return "—";
        const parsed = JSON.parse(row.metal_details);
        return Object.entries(parsed)
          .map(([k, v]) => `${k}: ${v}%`)
          .join(", ");
      } catch {
        return row.metal_details ?? "—";
      }
    },
  },
];

export default function StockpilesPage() {
  const [rows, setRows] = useState<Stockpile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stockpiles`)
      .then((res) => res.json())
      .then((data: Stockpile[]) => {
        setRows(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);


  const handleEdit = () => alert("edit stockpile form");

    const filteredRows = useMemo(() => {
        if (!search.trim()) return rows;
        const s = search.toLowerCase();
        return rows.filter((r) =>
            r.material?.name?.toLowerCase().includes(s) ||
            r.origin?.toLowerCase().includes(s) ||
            r.stock_id.toString().includes(s)
        );
    }, [rows, search]);
      
  return (
    <Box sx={{ height: 650, width: "100%", p: 4 }}>
    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2 w-48 md:w-80 lg:w-[30rem] bg-white">
            <SearchIcon className="w-5 h-5 text-gray-500 mr-3" />
            <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search stockpiles…"
                className="flex-1 outline-none text-sm bg-transparent"
            />
        </div>
        <button
          onClick={handleEdit}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          <Pencil className="w-5 h-5" />
          Edit Stockpile
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography color="error">Failed to load data.</Typography>
      ) : (
        <DataGrid
          rows={filteredRows}
          columns={stockpileColumns}
          getRowId={(row) => row.stock_id}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
          className="bg-white shadow rounded-lg border border-gray-200 !text-gray-700"
        />
      )}
    </Box>
  );
}