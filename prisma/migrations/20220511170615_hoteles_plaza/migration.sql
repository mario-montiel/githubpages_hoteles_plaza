/*
  Warnings:

  - You are about to drop the column `typeUserId` on the `ActivityOfDeleteData` table. All the data in the column will be lost.
  - Added the required column `module` to the `ActivityOfDeleteData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeUser` to the `ActivityOfDeleteData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ActivityOfDeleteData` DROP COLUMN `typeUserId`,
    ADD COLUMN `module` VARCHAR(60) NOT NULL,
    ADD COLUMN `typeUser` VARCHAR(60) NOT NULL;
