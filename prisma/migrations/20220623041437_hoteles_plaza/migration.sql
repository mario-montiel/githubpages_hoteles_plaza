/*
  Warnings:

  - You are about to alter the column `pathDirect` on the `RoomTypeImages` table. The data in that column could be lost. The data in that column will be cast from `VarChar(40)` to `VarChar(20)`.
  - Added the required column `imageUrl` to the `RoomTypeImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RoomTypeImages` ADD COLUMN `imageUrl` VARCHAR(60) NOT NULL,
    MODIFY `pathDirect` VARCHAR(20) NOT NULL;
