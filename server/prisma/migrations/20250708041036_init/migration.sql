-- CreateEnum
CREATE TYPE "tx_direction" AS ENUM ('inbound', 'outbound');

-- CreateEnum
CREATE TYPE "tx_status" AS ENUM ('fulfilled', 'unfulfilled');

-- CreateEnum
CREATE TYPE "po_status" AS ENUM ('Pending', 'Accepted', 'Rejected');

-- CreateTable
CREATE TABLE "party" (
    "party_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "party_pkey" PRIMARY KEY ("party_id")
);

-- CreateTable
CREATE TABLE "material" (
    "material_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "material_pkey" PRIMARY KEY ("material_id")
);

-- CreateTable
CREATE TABLE "inventory_tx" (
    "tx_id" SERIAL NOT NULL,
    "direction" "tx_direction" NOT NULL,
    "party_id" INTEGER,
    "material_id" INTEGER,
    "qty_net" DOUBLE PRECISION NOT NULL,
    "qty_adjusted" DOUBLE PRECISION,
    "status" "tx_status" NOT NULL,
    "recorded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventory_tx_pkey" PRIMARY KEY ("tx_id")
);

-- CreateTable
CREATE TABLE "stockpile" (
    "stock_id" SERIAL NOT NULL,
    "material_id" INTEGER NOT NULL,
    "weight_actual" DOUBLE PRECISION NOT NULL,
    "value_appraised" DOUBLE PRECISION,
    "origin" TEXT,
    "metal_details" TEXT,

    CONSTRAINT "stockpile_pkey" PRIMARY KEY ("stock_id")
);

-- CreateTable
CREATE TABLE "purchase_order" (
    "po_id" SERIAL NOT NULL,
    "buyer_id" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "bid_amount" DOUBLE PRECISION NOT NULL,
    "status" "po_status" NOT NULL DEFAULT 'Pending',
    "terms" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchase_order_pkey" PRIMARY KEY ("po_id")
);

-- AddForeignKey
ALTER TABLE "inventory_tx" ADD CONSTRAINT "inventory_tx_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "party"("party_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_tx" ADD CONSTRAINT "inventory_tx_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material"("material_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stockpile" ADD CONSTRAINT "stockpile_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material"("material_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_buyer_id_fkey" FOREIGN KEY ("buyer_id") REFERENCES "party"("party_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchase_order" ADD CONSTRAINT "purchase_order_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "material"("material_id") ON DELETE RESTRICT ON UPDATE CASCADE;
