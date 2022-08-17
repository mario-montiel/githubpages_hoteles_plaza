/*
  Warnings:

  - You are about to alter the column `checkIn` on the `RoomBookings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `checkOut` on the `RoomBookings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `createdAt` on the `RoomBookings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `updateAt` on the `RoomBookings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.
  - You are about to alter the column `bookedAt` on the `Rooms` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE `RoomBookings` MODIFY `checkIn` VARCHAR(30) NOT NULL,
    MODIFY `checkOut` VARCHAR(30) NOT NULL,
    MODIFY `createdAt` VARCHAR(30) NOT NULL,
    MODIFY `updateAt` VARCHAR(30) NULL;

-- AlterTable
ALTER TABLE `Rooms` MODIFY `bookedAt` VARCHAR(30) NULL;
