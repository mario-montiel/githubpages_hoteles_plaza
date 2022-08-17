/*
  Warnings:

  - You are about to drop the column `hotelsId` on the `RoomTypeImages` table. All the data in the column will be lost.
  - Added the required column `hotelId` to the `RoomTypeImages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `RoomTypeImages` DROP FOREIGN KEY `RoomTypeImages_hotelsId_fkey`;

-- AlterTable
ALTER TABLE `RoomTypeImages` DROP COLUMN `hotelsId`,
    ADD COLUMN `hotelId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `RoomTypeImages` ADD CONSTRAINT `RoomTypeImages_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
