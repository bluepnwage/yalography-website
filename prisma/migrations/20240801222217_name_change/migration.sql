/*
  Warnings:

  - You are about to drop the `imagefolders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `imagefolders`;

-- DropTable
DROP TABLE `images`;

-- CreateTable
CREATE TABLE `resources` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `width` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `alt` TEXT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `projectId` INTEGER NULL,
    `folderId` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `publicId` VARCHAR(191) NOT NULL,

    INDEX `resources_projectId_idx`(`projectId`),
    INDEX `resources_folderId_idx`(`folderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResourceFolders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
