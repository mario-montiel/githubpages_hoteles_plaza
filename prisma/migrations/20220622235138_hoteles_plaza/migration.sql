/*
  Warnings:

  - Added the required column `editedBy` to the `RoomTypeImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RoomTypeImages` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `editedBy` VARCHAR(60) NOT NULL,
    ADD COLUMN `updateAt` DATETIME(3) NULL;
