/*
  Warnings:

  - Added the required column `name` to the `Graphic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `graphic` ADD COLUMN `date_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
