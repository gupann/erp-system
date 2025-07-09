// // reference - MUI
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
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  useListMaterialsQuery,
  useListPartiesQuery,
  useCreateInventoryTxMutation,
  type Material,
  type Party,
  Direction,
  TxStatus,
} from "@/state/api";

type Props = { open: boolean; onClose: () => void };

export default function RecordMovementDialog({ open, onClose }: Props) {
  const {
    data: materials = [],
    isLoading: matLoading,
  } = useListMaterialsQuery();
  const {
    data: parties = [],
    isLoading: partyLoading,
  } = useListPartiesQuery();

  const [createTx, { isLoading: saving }] =
    useCreateInventoryTxMutation();

  const [form, setForm] = useState({
    direction: "inbound" as Direction,
    status: "fulfilled" as TxStatus,
    material_id: "" as string,
    party_id: "" as string,
    qty_net: "" as string,
    qty_adjusted: "" as string,
  });

  const materialOptions = useMemo(
    () => materials.map((m: Material) => ({
      label: m.name,
      id: m.material_id.toString(),
    })),
    [materials]
  );
  const partyOptions = useMemo(
    () => parties.map((p: Party) => ({
      label: p.name,
      id: p.party_id.toString(),
    })),
    [parties]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    try {
      await createTx({
        direction: form.direction,
        status: form.status,
        material_id: Number(form.material_id),
        party_id: Number(form.party_id),
        qty_net: Number(form.qty_net),
        qty_adjusted: form.qty_adjusted
          ? Number(form.qty_adjusted)
          : undefined,
      }).unwrap();

      onClose();
      setForm({
        direction: "inbound",
        status: "fulfilled",
        material_id: "",
        party_id: "",
        qty_net: "",
        qty_adjusted: "",
      });
    } catch (err) {
      console.error("Failed to save movement:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Record Movement</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select fullWidth
              label="Direction"
              name="direction"
              value={form.direction}
              onChange={handleChange}
            >
              <MenuItem value="inbound">Inbound</MenuItem>
              <MenuItem value="outbound">Outbound</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select fullWidth
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <MenuItem value="fulfilled">Fulfilled</MenuItem>
              <MenuItem value="unfulfilled">Unfulfilled</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select fullWidth
              label="Material"
              name="material_id"
              value={form.material_id}
              onChange={handleChange}
              disabled={matLoading}
            >
              {matLoading
                ? <MenuItem value="">
                    <em>Loading…</em>
                  </MenuItem>
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
              select fullWidth
              label="Party"
              name="party_id"
              value={form.party_id}
              onChange={handleChange}
              disabled={partyLoading}
            >
              {partyLoading
                ? <MenuItem value="">
                    <em>Loading…</em>
                  </MenuItem>
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
              label="Net Qty (kg)"
              name="qty_net"
              type="number"
              value={form.qty_net}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Adjusted Qty (kg)"
              name="qty_adjusted"
              type="number"
              value={form.qty_adjusted}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={
            saving ||
            !form.material_id ||
            !form.party_id ||
            !form.qty_net
          }
        >
          {saving
            ? <CircularProgress size={20} />
            : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
