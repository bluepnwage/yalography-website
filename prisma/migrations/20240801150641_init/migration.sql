-- CreateTable
CREATE TABLE `bookings` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(40) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `environment` BOOLEAN NOT NULL,
    `description` TEXT NULL,
    `status` ENUM('completed', 'pending', 'approved', 'rescheduled') NULL DEFAULT 'pending',
    `features` TEXT NULL,

    INDEX `bookings_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL DEFAULT '',
    `description` TEXT NULL,
    `thumbnail` VARCHAR(191) NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `testimonial` TEXT NULL,
    `companyName` VARCHAR(191) NULL DEFAULT '',
    `customerName` VARCHAR(191) NULL DEFAULT '',
    `published` BOOLEAN NOT NULL DEFAULT false,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL DEFAULT '',
    `pinned` BOOLEAN NOT NULL DEFAULT false,
    `thumbnailPublicId` VARCHAR(191) NULL DEFAULT '',
    `thumbnailType` VARCHAR(191) NULL DEFAULT '',

    UNIQUE INDEX `projects_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images` (
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

    INDEX `images_projectId_idx`(`projectId`),
    INDEX `images_folderId_idx`(`folderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageFolders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `deadline` DATETIME(3) NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` BOOLEAN NOT NULL DEFAULT false,
    `priority` ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
    `bookingId` VARCHAR(191) NULL,
    `pinned` BOOLEAN NOT NULL DEFAULT false,

    INDEX `tasks_bookingId_idx`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `quote` INTEGER NOT NULL,
    `bookingId` VARCHAR(191) NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,

    UNIQUE INDEX `Orders_bookingId_key`(`bookingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `taskId` INTEGER NOT NULL,
    `priority` ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'low',
    `status` ENUM('todo', 'inprogress', 'completed') NOT NULL DEFAULT 'todo',
    `description` TEXT NULL,

    INDEX `sub_tasks_taskId_idx`(`taskId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
