/*
  Warnings:

  - You are about to drop the column `email` on the `Check` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Check` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `CompanyParameter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Check` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `CompanyParameter` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Check_email_key` ON `Check`;

-- AlterTable
ALTER TABLE `Check` DROP COLUMN `email`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `CompanyParameter` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `PayType` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `PivotTimesheetTypeEvent` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Status` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Timesheet` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `TimesheetTypeEvent` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `Check_name_key` ON `Check`(`name`);

-- CreateIndex
CREATE INDEX `Check_name_idx` ON `Check`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `CompanyParameter_email_key` ON `CompanyParameter`(`email`);

-- CreateIndex
CREATE INDEX `CompanyParameter_email_name_idx` ON `CompanyParameter`(`email`, `name`);

-- CreateIndex
CREATE INDEX `PayType_name_idx` ON `PayType`(`name`);

-- CreateIndex
CREATE INDEX `PivotTimesheetTypeEvent_status_id_timesheet_id_timesheet_Typ_idx` ON `PivotTimesheetTypeEvent`(`status_id`, `timesheet_id`, `timesheet_Type_Event_id`, `user_id`, `company_parameter_id`);

-- CreateIndex
CREATE INDEX `Rol_name_idx` ON `Rol`(`name`);

-- CreateIndex
CREATE INDEX `Status_name_idx` ON `Status`(`name`);

-- CreateIndex
CREATE INDEX `Timesheet_hours_idx` ON `Timesheet`(`hours`);

-- CreateIndex
CREATE INDEX `TimesheetTypeEvent_name_idx` ON `TimesheetTypeEvent`(`name`);

-- CreateIndex
CREATE INDEX `User_email_name_pay_date_pay_type_id_rol_id_check_id_company_idx` ON `User`(`email`, `name`, `pay_date`, `pay_type_id`, `rol_id`, `check_id`, `company_parameters_id`);
