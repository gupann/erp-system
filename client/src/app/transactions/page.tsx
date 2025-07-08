// reference – https://mui.com/x/react-data-grid/
"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, Typography } from "@mui/material";
import { Plus, Pencil } from "lucide-react";

interface PurchaseOrder {
    po_id: number;
    created_at: string;
  
    material_id: number;
    buyer_id: number;
  
    quantity: number;
    bid_amount: number;
  
    status: "Pending" | "Accepted" | "Rejected";
    terms?: string;
  
    buyer?:    { party_id: number;    name: string };
    material?: { material_id: number; name: string };
  }
  
  const poColumns: GridColDef<PurchaseOrder>[] = [
    { field: "po_id", headerName: "PO #", width: 90 },
  
    {
      field: "created_at",
      headerName: "Date",
      width: 140,
      valueGetter: (_, r) =>
        new Date(r.created_at).toLocaleDateString("en-US"),
    },
  
    {
      field: "material",
      headerName: "Material",
      width: 180,
      valueGetter: (_, r) => r.material?.name ?? `#${r.material_id}`,
    },
  
    {
      field: "buyer",
      headerName: "Buyer",
      width: 180,
      valueGetter: (_, r) => r.buyer?.name ?? `#${r.buyer_id}`,
    },
  
    {
      field: "quantity",
      headerName: "Qty (kg)",
      width: 120,
      type: "number",
    },
  
    {
      field: "bid_amount",
      headerName: "Bid ($)",
      width: 130,
      type: "number",
      valueGetter: (_, r) => r.bid_amount.toLocaleString(),
    },
  
    { field: "status", headerName: "Status", width: 120 },
  
    {
      field: "terms",
      headerName: "Terms",
      flex: 1,
      valueGetter: (_, r) => r.terms ?? "—",
    },
  ];
  
export default function TransactionsPage() {
  const [rows, setRows] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/purchase-orders`)
      .then((res) => res.json())
      .then((data: PurchaseOrder[]) => {
        setRows(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleAdd = () => {
    alert("add PO form");
  };

  const handleEdit = () => {
    alert("edit PO form");
  };

  return (
    <Box sx={{ height: 650, width: "100%", p: 4 }}>
    <div className="flex justify-end gap-4 mb-4">
      <button
        onClick={handleAdd}
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
      >
        <Plus className="w-5 h-5" />
        Add P.O.
      </button>
      <button
        onClick={handleEdit}
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        <Pencil className="w-5 h-5" />
        Edit P.O.
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
        columns={poColumns}
        getRowId={(row) => row.po_id}
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