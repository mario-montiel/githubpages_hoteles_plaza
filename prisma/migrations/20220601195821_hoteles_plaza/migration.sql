/*
  Warnings:

  - You are about to drop the column `typeEmergency` on the `Rooms` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Rooms` DROP COLUMN `typeEmergency`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `bookedAt` DATETIME(3) NULL,
    ADD COLUMN `roomDetailsEmergency` TINYINT NOT NULL DEFAULT 1,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;
