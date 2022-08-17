/*
  Warnings:

  - Added the required column `index` to the `RoomTypeImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RoomTypeImages` ADD COLUMN `index` TINYINT NOT NULL;
