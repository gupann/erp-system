// reference - MUI
"use client";

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid"; 
import {
  useListMaterialsQuery,
  useListPartiesQuery,
  useCreatePurchaseOrderMutation,
  type Material,
  type Party,
  POStatus,
} from "@/state/api";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

export default function AddPODialog({ open, onClose, onSaved }: Props) {
  const { data: materials = [], isLoading: matLoading } = useListMaterialsQuery();
  const { data: parties   = [], isLoading: pLoading   } = useListPartiesQuery();
  const [createPO, { isLoading: saving }] = useCreatePurchaseOrderMutation();

  const [form, setForm] = useState({
    material_id: "",
    buyer_id:    "",
    quantity:    "",
    bid_amount:  "",
    status:      "Pending" as POStatus,
    terms:       "",
  });

  const materialOptions = useMemo(
    () => materials.map((m: Material) => ({ label: m.name, id: m.material_id })),
    [materials]
  );
  const partyOptions = useMemo(
    () => parties.map((p: Party) => ({ label: p.name, id: p.party_id })),
    [parties]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    try {
      await createPO({
        material_id: Number(form.material_id),
        buyer_id:    Number(form.buyer_id),
        quantity:    Number(form.quantity),
        bid_amount:  Number(form.bid_amount),
        status:      form.status,
        terms:       form.terms || undefined,
      }).unwrap();

      onSaved(); 
      onClose();
      setForm({
        material_id: "",
        buyer_id:    "",
        quantity:    "",
        bid_amount:  "",
        status:      "Pending",
        terms:       "",
      });
    } catch (err) {
      console.error("Failed to create PO:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>New Purchase Order</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Material"
              name="material_id"
              value={form.material_id}
              onChange={handleChange}
              disabled={matLoading}
            >
              {matLoading
                ? <MenuItem value=""><em>Loading…</em></MenuItem>
                : materialOptions.map(opt => (
                    <MenuItem key={opt.id} value={opt.id}>
                      {opt.label}
                    </MenuItem>
                  ))
              }
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Buyer"
              name="buyer_id"
              value={form.buyer_id}
              onChange={handleChange}
              disabled={pLoading}
            >
              {pLoading
                ? <MenuItem value=""><em>Loading…</em></MenuItem>
                : partyOptions.map(opt => (
                    <MenuItem key={opt.id} value={opt.id}>
                      {opt.label}
                    </MenuItem>
                  ))
              }
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity (kg)"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Bid Amount ($)"
              name="bid_amount"
              type="number"
              value={form.bid_amount}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Accepted">Accepted</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Terms (optional)"
              name="terms"
              value={form.terms}
              onChange={handleChange}
            />
          </Grid>

        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            saving ||
            !form.material_id ||
            !form.buyer_id ||
            !form.quantity ||
            !form.bid_amount
          }
        >
          {saving ? <CircularProgress size={20} /> : "Create PO"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
