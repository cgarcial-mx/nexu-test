-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "averagePrice" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "models" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "averagePrice" DOUBLE PRECISION NOT NULL,
    "modelId" INTEGER NOT NULL DEFAULT 0,
    "brandId" INTEGER NOT NULL,
    "brandName" TEXT NOT NULL,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "brands_name_key" ON "brands"("name");

-- CreateIndex
CREATE UNIQUE INDEX "models_name_brandId_key" ON "models"("name", "brandId");

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
