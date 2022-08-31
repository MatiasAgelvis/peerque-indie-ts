/*
  Warnings:

  - A unique constraint covering the columns `[type,name]` on the table `Coursera` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Coursera_type_name_key" ON "Coursera"("type", "name");
