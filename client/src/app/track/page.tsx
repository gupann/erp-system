// reference – https://mui.com/x/react-data-grid/
"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, Typography } from "@mui/material";
import { Plus, Pencil } from "lucide-react";

interface InventoryTx {
  tx_id: number;
  direction: "inbound" | "outbound";
  recorded_at: string;
  qty_net: number;
  qty_adjusted?: number;
  status: "fulfilled" | "unfulfilled";
  party: {
    party_id: number;
    name: string;
  };
  material: {
    material_id: number;
    name: string;
  };
}

const columns: GridColDef<InventoryTx>[] = [
  { field: "tx_id", headerName: "ID", width: 90 },
  {
    field: "recorded_at",
    headerName: "Date",
    width: 140,
    valueGetter: (_, row) =>
      new Date(row.recorded_at).toLocaleDateString("en-US"),
  },
  { field: "direction", headerName: "Direction", width: 120 },
  {
    field: "material",
    headerName: "Material",
    width: 160,
    valueGetter: (_, row) => row.material?.name ?? "—",
  },
  {
    field: "party",
    headerName: "Party",
    width: 160,
    valueGetter: (_, row) => row.party?.name ?? "—",
  },
  {
    field: "qty_net",
    headerName: "Net Qty (kg)",
    width: 130,
    type: "number",
  },
  {
    field: "qty_adjusted",
    headerName: "Adj Qty (kg)",
    width: 150,
    type: "number",
    valueGetter: (_, row) => row.qty_adjusted ?? "—",
  },
  { field: "status", headerName: "Status", width: 130 },
];

export default function InventoryPage() {
  const [rows, setRows] = useState<InventoryTx[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/inventory`)
      .then((res) => res.json())
      .then((data: InventoryTx[]) => {
        setRows(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleAdd = () => {
    alert("add movement form");
  };

  const handleEdit = () => {
    alert("edit movement form");
  };

  return (
    <Box sx={{ height: 650, width: "100%", p: 4 }}>
    <div className="flex justify-end gap-4 mb-4">
      <button
        onClick={handleAdd}
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
      >
        <Plus className="w-5 h-5" />
        Record Movement
      </button>
      <button
        onClick={handleEdit}
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        <Pencil className="w-5 h-5" />
        Edit Movement
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
        columns={columns}
        getRowId={(row) => row.tx_id}
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