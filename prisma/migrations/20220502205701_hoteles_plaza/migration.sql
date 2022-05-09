-- CreateTable
CREATE TABLE `ActivityOfDeleteData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(60) NOT NULL,
    `reason` VARCHAR(60) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `typeUserId` VARCHAR(60) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `editedBy` VARCHAR(60) NULL,
    `name` VARCHAR(60) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SuperAdmin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `fullName` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `typeUser` VARCHAR(20) NOT NULL,
    `updateAt` DATETIME(3) NULL,

    UNIQUE INDEX `SuperAdmin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `fullName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `editedBy` VARCHAR(60) NULL,
    `status` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(10) NOT NULL,
    `typeUserId` INTEGER NOT NULL,
    `departmentId` INTEGER NOT NULL,
    `preferencesId` INTEGER NULL,
    `activityOfDeleteDataId` INTEGER NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `fullName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `company` VARCHAR(60) NULL,
    `city` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Guest_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlacesInterest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,
    `distance` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `travelMode` VARCHAR(191) NOT NULL,
    `hotelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SuperAdminOnHotels` (
    `hotelId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(60) NOT NULL,
    `updateAt` DATETIME(3) NULL,

    PRIMARY KEY (`hotelId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsersOnHotels` (
    `hotelId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(60) NOT NULL,
    `updateAt` DATETIME(3) NULL,

    PRIMARY KEY (`hotelId`, `userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hotels` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,
    `ubication` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(10) NOT NULL,
    `stars` INTEGER NOT NULL,
    `facebook` VARCHAR(191) NULL,
    `whatsapp` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `references` VARCHAR(191) NOT NULL,
    `googleMaps` VARCHAR(191) NULL,
    `latitude` VARCHAR(191) NULL,
    `longitude` VARCHAR(191) NULL,
    `totalFloors` INTEGER NOT NULL,
    `totalRooms` INTEGER NOT NULL,
    `editedBy` VARCHAR(60) NULL,
    `logoImage` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `pathDirImage` VARCHAR(191) NOT NULL,
    `pathImageName` VARCHAR(191) NOT NULL,
    `placeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Services` (
    `id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,
    `altImage` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `editedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Benefits` (
    `id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,
    `altImage` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `editedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Facilities` (
    `id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `altImage` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `editedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promotions` (
    `id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `name` VARCHAR(191) NOT NULL,
    `altImage` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `editedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `floor` INTEGER NOT NULL,
    `roomNumber` INTEGER NOT NULL,
    `roomTypeId` INTEGER NOT NULL,
    `editedBy` VARCHAR(60) NULL,
    `observations` VARCHAR(191) NOT NULL,
    `checkIn` DATETIME(3) NULL,
    `checkOut` DATETIME(3) NULL,
    `isBooking` BOOLEAN NOT NULL DEFAULT false,
    `isBreakfast` INTEGER NOT NULL DEFAULT 0,
    `hotelId` INTEGER NOT NULL,
    `roomStatusId` INTEGER NOT NULL,
    `lastRoomStatusId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `name` VARCHAR(60) NOT NULL,
    `keyWord` VARCHAR(4) NOT NULL,
    `editedBy` VARCHAR(60) NULL,
    `costPerNight` DOUBLE NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `maxPeople` INTEGER NOT NULL,
    `smoke` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `editedBy` VARCHAR(60) NULL,
    `backgroundColor` VARCHAR(7) NOT NULL,
    `textColor` VARCHAR(7) NOT NULL,
    `border` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `editedBy` VARCHAR(60) NULL,
    `title` VARCHAR(60) NULL,
    `description` VARCHAR(191) NOT NULL,
    `starts` INTEGER NOT NULL,
    `hotelId` INTEGER NOT NULL,
    `guestId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OnlyEmail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NOT NULL,
    `hotelId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailForm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NULL,
    `name` VARCHAR(25) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `bookingType` VARCHAR(191) NOT NULL,
    `bookingDays` INTEGER NOT NULL,
    `hotelId` INTEGER NOT NULL,
    `guestId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Departments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_preferencesId_fkey` FOREIGN KEY (`preferencesId`) REFERENCES `Hotels`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlacesInterest` ADD CONSTRAINT `PlacesInterest_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SuperAdminOnHotels` ADD CONSTRAINT `SuperAdminOnHotels_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `SuperAdmin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SuperAdminOnHotels` ADD CONSTRAINT `SuperAdminOnHotels_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnHotels` ADD CONSTRAINT `UsersOnHotels_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsersOnHotels` ADD CONSTRAINT `UsersOnHotels_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rooms` ADD CONSTRAINT `Rooms_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rooms` ADD CONSTRAINT `Rooms_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `RoomType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rooms` ADD CONSTRAINT `Rooms_roomStatusId_fkey` FOREIGN KEY (`roomStatusId`) REFERENCES `RoomStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rooms` ADD CONSTRAINT `Rooms_lastRoomStatusId_fkey` FOREIGN KEY (`lastRoomStatusId`) REFERENCES `RoomStatus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `Guest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OnlyEmail` ADD CONSTRAINT `OnlyEmail_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailForm` ADD CONSTRAINT `EmailForm_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `Guest`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmailForm` ADD CONSTRAINT `EmailForm_hotelId_fkey` FOREIGN KEY (`hotelId`) REFERENCES `Hotels`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
