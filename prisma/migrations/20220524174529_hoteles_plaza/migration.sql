/*
  Warnings:

  - You are about to drop the column `checkIn` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `checkOut` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `isBreakfast` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `observations` on the `Rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Rooms` DROP COLUMN `checkIn`,
    DROP COLUMN `checkOut`,
    DROP COLUMN `isBreakfast`,
    DROP COLUMN `observations`;

-- CreateTable
CREATE TABLE `RoomBookings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `detailsOfRoom` VARCHAR(191) NOT NULL,
    `detailsOfBooking` VARCHAR(191) NOT NULL,
    `checkIn` DATETIME(3) NULL,
    `checkOut` DATETIME(3) NULL,
    `isBreakfast` INTEGER NOT NULL DEFAULT 0,
    `guestId` INTEGER NOT NULL,
    `roomsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RoomBookings` ADD CONSTRAINT `RoomBookings_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `Guest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomBookings` ADD CONSTRAINT `RoomBookings_roomsId_fkey` FOREIGN KEY (`roomsId`) REFERENCES `Rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
