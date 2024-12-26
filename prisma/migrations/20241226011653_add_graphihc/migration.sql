-- CreateTable
CREATE TABLE `Graphic` (
    `graphic_id` CHAR(36) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type_content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`graphic_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
