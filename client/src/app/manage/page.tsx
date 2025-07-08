// reference – https://mui.com/x/react-data-grid/
"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, Typography } from "@mui/material";
import { Plus, Pencil } from "lucide-react";

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

//   const handleAdd = () => alert("add stockpile form");
  const handleEdit = () => alert("edit stockpile form");

  return (
    <Box sx={{ height: 650, width: "100%", p: 4 }}>
      <div className="flex justify-end gap-4 mb-4">
        {/* <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
        >
          <Plus className="w-5 h-5" />
          Add Stockpile
        </button> */}
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
          rows={rows}
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
