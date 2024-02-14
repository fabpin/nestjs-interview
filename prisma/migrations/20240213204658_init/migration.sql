-- CreateTable
CREATE TABLE `Check` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `gross_wages` DECIMAL(65, 30) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `Check_name_gross_wages_user_id_idx`(`name`, `gross_wages`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PayType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `PayType_name_key`(`name`),
    INDEX `PayType_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CompanyParameter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `minimun_wages_salary` DECIMAL(65, 30) NULL DEFAULT 480.00,
    `minimun_wages_hourly` DECIMAL(65, 30) NULL DEFAULT 12.00,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `CompanyParameter_name_key`(`name`),
    UNIQUE INDEX `CompanyParameter_email_key`(`email`),
    INDEX `CompanyParameter_email_name_minimun_wages_salary_minimun_wag_idx`(`email`, `name`, `minimun_wages_salary`, `minimun_wages_hourly`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `Rol_name_key`(`name`),
    INDEX `Rol_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `pay_date` DATETIME(3) NOT NULL,
    `rol_id` INTEGER NOT NULL,
    `pay_type_id` INTEGER NOT NULL,
    `company_parameters_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `User_name_key`(`name`),
    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_email_name_pay_date_pay_type_id_rol_id_company_paramete_idx`(`email`, `name`, `pay_date`, `pay_type_id`, `rol_id`, `company_parameters_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Timesheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hours` DECIMAL(65, 30) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    INDEX `Timesheet_hours_idx`(`hours`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `Status_name_key`(`name`),
    INDEX `Status_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimesheetTypeEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `TimesheetTypeEvent_name_key`(`name`),
    INDEX `TimesheetTypeEvent_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PivotTimesheetTypeEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `note` LONGTEXT NULL,
    `status_id` INTEGER NOT NULL,
    `check_id` INTEGER NOT NULL,
    `timesheet_id` INTEGER NOT NULL,
    `timesheet_Type_Event_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `company_parameter_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `PivotTimesheetTypeEvent_check_id_key`(`check_id`),
    INDEX `PivotTimesheetTypeEvent_status_id_timesheet_id_timesheet_Typ_idx`(`status_id`, `timesheet_id`, `timesheet_Type_Event_id`, `user_id`, `company_parameter_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Check` ADD CONSTRAINT `Check_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `Rol`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_pay_type_id_fkey` FOREIGN KEY (`pay_type_id`) REFERENCES `PayType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_company_parameters_id_fkey` FOREIGN KEY (`company_parameters_id`) REFERENCES `CompanyParameter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PivotTimesheetTypeEvent` ADD CONSTRAINT `PivotTimesheetTypeEvent_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `Status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PivotTimesheetTypeEvent` ADD CONSTRAINT `PivotTimesheetTypeEvent_timesheet_id_fkey` FOREIGN KEY (`timesheet_id`) REFERENCES `Timesheet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PivotTimesheetTypeEvent` ADD CONSTRAINT `PivotTimesheetTypeEvent_timesheet_Type_Event_id_fkey` FOREIGN KEY (`timesheet_Type_Event_id`) REFERENCES `TimesheetTypeEvent`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PivotTimesheetTypeEvent` ADD CONSTRAINT `PivotTimesheetTypeEvent_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PivotTimesheetTypeEvent` ADD CONSTRAINT `PivotTimesheetTypeEvent_company_parameter_id_fkey` FOREIGN KEY (`company_parameter_id`) REFERENCES `CompanyParameter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PivotTimesheetTypeEvent` ADD CONSTRAINT `PivotTimesheetTypeEvent_check_id_fkey` FOREIGN KEY (`check_id`) REFERENCES `Check`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
