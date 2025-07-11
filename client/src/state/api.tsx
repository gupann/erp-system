// reference: https://redux-toolkit.js.org/rtk-query/overview

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Direction   = "inbound" | "outbound";
export type TxStatus    = "fulfilled" | "unfulfilled";
export type POStatus    = "Pending" | "Accepted" | "Rejected";

export interface Party {
  party_id: number;
  name: string;
  role: "buyer" | "seller";
}

export interface Material {
  material_id: number;
  name: string;
}

export interface InventoryTx {
  tx_id: number;
  direction: Direction;
  party_id?: number;
  material_id?: number;
  qty_net: number;
  qty_adjusted?: number;
  status: TxStatus;
  recorded_at: string;
  party?: Party;
  material?: Material;
}

export interface Stockpile {
  stock_id: number;
  material_id: number;
  weight_actual: number;
  value_appraised?: number;
  origin?: string;
  metal_details?: string;
  material?: Material;
}
export interface PurchasePoint {
  date: string; 
  totalPurchased: number;
  changePercentage: number;
}
export interface PurchaseOrder {
  po_id: number;
  buyer_id: number;
  material_id: number;
  quantity: number;
  bid_amount: number;
  status: POStatus;
  terms?: string;
  created_at: string;
  buyer?: Party;
  material?: Material;
}

export interface DashboardSummary {
  recentTx:    InventoryTx[];
  stockTotals: { material_id: number; _sum: { weight_actual: number|null; value_appraised: number|null } }[];
  purchaseSummary: PurchasePoint[];
  pendingPOs?:  PurchaseOrder[];
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
  }),
  tagTypes: ["Dashboard", "Inventory", "Stockpiles", "PurchaseOrders"],

  endpoints: (build) => ({
    getDashboard: build.query<DashboardSummary, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),
    listInventoryTx: build.query<InventoryTx[], { direction?: Direction; material_id?: number }>({
      query: ({ direction, material_id }) => {
        const params = new URLSearchParams();
        if (direction) params.append("direction", direction);
        if (material_id !== undefined) params.append("material_id", material_id.toString());
        return `/inventory?${params.toString()}`;
      },
      providesTags: ["Inventory"],
    }),
    listStockpiles: build.query<Stockpile[], void>({
      query: () => "/stockpiles",
      providesTags: ["Stockpiles"],
    }),
    listPurchaseOrders: build.query<PurchaseOrder[], void>({
      query: () => "/purchase-orders",
      providesTags: ["PurchaseOrders"],
    }),
    listMaterials: build.query<Material[], void>({
      query: () => "/materials",
      providesTags: ["Inventory"],
    }),
    
    listParties: build.query<Party[], void>({
      query: () => "/parties",
      providesTags: ["Inventory"],
    }),

    createInventoryTx: build.mutation<InventoryTx, Partial<InventoryTx>>({
      query: (body) => ({
        url: "/inventory",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Inventory", "Dashboard"],
    }),
    createMaterial: build.mutation<Material, Pick<Material, "name">>({
      query: (body) => ({ url: "/materials", method: "POST", body }),
      invalidatesTags: ["Inventory"],   // or a “Materials” tag if you prefer
    }),
    createParty: build.mutation<Party, Pick<Party, "name" | "role">>({
      query: (body) => ({ url: "/parties", method: "POST", body }),
      invalidatesTags: ["Inventory"],
    }),
    createPurchaseOrder: build.mutation<PurchaseOrder, Partial<PurchaseOrder>>({
      query: (body) => ({
        url: "/purchase-orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["PurchaseOrders", "Dashboard"],
    }),
    
  }),
});

export const { useGetDashboardQuery, useListInventoryTxQuery, useListStockpilesQuery, 
  useListPurchaseOrdersQuery, useListMaterialsQuery, useListPartiesQuery, useCreateInventoryTxMutation, 
  useCreateMaterialMutation, useCreatePartyMutation, useCreatePurchaseOrderMutation} = api;
