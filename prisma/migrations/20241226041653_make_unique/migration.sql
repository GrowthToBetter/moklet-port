/*
  Warnings:

  - You are about to alter the column `title` on the `graphic` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.
  - A unique constraint covering the columns `[name]` on the table `Graphic` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `graphic` MODIFY `title` ENUM('Most_Widely', 'The_Best') NOT NULL DEFAULT 'Most_Widely';

-- CreateIndex
CREATE UNIQUE INDEX `Graphic_name_key` ON `Graphic`(`name`);
