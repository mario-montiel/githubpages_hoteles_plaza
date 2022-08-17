/*
  Warnings:

  - You are about to alter the column `name` on the `Hotels` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(60)`.
  - You are about to alter the column `facebook` on the `Hotels` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(40)`.
  - You are about to alter the column `whatsapp` on the `Hotels` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(15)`.
  - You are about to alter the column `instagram` on the `Hotels` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(40)`.
  - You are about to alter the column `googleMaps` on the `Hotels` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(60)`.
  - You are about to alter the column `latitude` on the `Hotels` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `longitude` on the `Hotels` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.
  - You are about to alter the column `logoImage` on the `Hotels` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(60)`.
  - You are about to alter the column `imageUrl` on the `Hotels` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(60)`.
  - You are about to alter the column `pathDirImage` on the `Hotels` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(60)`.
  - You are about to alter the column `pathImageName` on the `Hotels` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(60)`.
  - You are about to drop the column `altImage` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Services` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Services` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Services` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(60)`.
  - You are about to alter the column `editedBy` on the `Services` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(40)`.
  - Added the required column `icon` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Hotels` MODIFY `name` VARCHAR(60) NOT NULL,
    MODIFY `facebook` VARCHAR(40) NULL,
    MODIFY `whatsapp` VARCHAR(15) NULL,
    MODIFY `instagram` VARCHAR(40) NULL,
    MODIFY `googleMaps` VARCHAR(60) NULL,
    MODIFY `latitude` VARCHAR(10) NULL,
    MODIFY `longitude` VARCHAR(10) NULL,
    MODIFY `logoImage` VARCHAR(60) NOT NULL,
    MODIFY `imageUrl` VARCHAR(60) NOT NULL,
    MODIFY `pathDirImage` VARCHAR(60) NOT NULL,
    MODIFY `pathImageName` VARCHAR(60) NOT NULL;

-- AlterTable
ALTER TABLE `Services` DROP COLUMN `altImage`,
    DROP COLUMN `title`,
    DROP COLUMN `url`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `icon` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(60) NOT NULL,
    MODIFY `editedBy` VARCHAR(40) NULL;
