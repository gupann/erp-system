// reference – https://mui.com/x/react-data-grid/
"use client";

import { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, Typography } from "@mui/material";
import { Plus, Pencil, SearchIcon } from "lucide-react";
import AddPODialog from '../(components)/AddPODialog';
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
  const [search, setSearch] = useState("");
  const [showDialog, setShowDialog] = useState(false);

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
    setShowDialog(true);
  };

  const handleEdit = () => {
    alert("Future work! - allow edit of PO entries");
  };

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const s = search.toLowerCase();
    return rows.filter((r) =>
      r.material?.name?.toLowerCase().includes(s) ||
      r.buyer?.name?.toLowerCase().includes(s) ||
      r.po_id.toString().includes(s) ||
      r.status.toLowerCase().includes(s)
    );
  }, [rows, search]);

  return (
    <Box sx={{ height: 650, width: "100%", p: 4 }}>
    <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div className="flex items-center border-2 border-gray-300 rounded-lg px-3 py-2 w-48 md:w-80 lg:w-[30rem] bg-white">
            <SearchIcon className="w-5 h-5 text-gray-500 mr-3" />
            <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions..."
            className="flex-1 outline-none text-sm bg-transparent"
            />
        </div>

        <div className="flex gap-2">
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
        columns={poColumns}
        getRowId={(row) => row.po_id}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
        className="bg-white shadow rounded-lg border border-gray-200 !text-gray-700"
      />
    )}
    {showDialog && (
      <AddPODialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onSaved={() => {setShowDialog(false)}}
      />
    )}  
  </Box>
  );
}