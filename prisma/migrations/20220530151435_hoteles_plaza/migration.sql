/*
  Warnings:

  - You are about to alter the column `isBreakfast` on the `RoomBookings` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `RoomBookings` MODIFY `isBreakfast` BOOLEAN NOT NULL DEFAULT false;
