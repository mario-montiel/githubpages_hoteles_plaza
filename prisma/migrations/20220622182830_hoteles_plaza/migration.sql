/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `RoomType` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `RoomType` DROP COLUMN `imageUrl`;

-- CreateTable
CREATE TABLE `RoomTypeImages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pathDirect` VARCHAR(40) NOT NULL,
    `roomTypeId` INTEGER NOT NULL,
    `hotelsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RoomTypeImages` ADD CONSTRAINT `RoomTypeImages_hotelsId_fkey` FOREIGN KEY (`hotelsId`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomTypeImages` ADD CONSTRAINT `RoomTypeImages_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `RoomType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
