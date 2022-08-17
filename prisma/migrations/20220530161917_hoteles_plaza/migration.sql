/*
  Warnings:

  - Made the column `checkIn` on table `RoomBookings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checkOut` on table `RoomBookings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `RoomBookings` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NULL,
    MODIFY `checkIn` DATETIME(3) NOT NULL,
    MODIFY `checkOut` DATETIME(3) NOT NULL;
