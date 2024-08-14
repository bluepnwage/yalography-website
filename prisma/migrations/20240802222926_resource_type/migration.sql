/*
  Warnings:

  - You are about to drop the `resourcefolders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `resourceType` to the `resources` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `resources` ADD COLUMN `resourceType` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `resourcefolders`;

-- CreateTable
CREATE TABLE `resource_folders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
