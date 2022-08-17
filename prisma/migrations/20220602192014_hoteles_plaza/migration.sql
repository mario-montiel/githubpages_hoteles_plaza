-- AlterTable
ALTER TABLE `RoomBookings` MODIFY `checkIn` VARCHAR(191) NOT NULL,
    MODIFY `checkOut` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` VARCHAR(191) NOT NULL,
    MODIFY `updateAt` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Rooms` MODIFY `bookedAt` VARCHAR(191) NULL;
