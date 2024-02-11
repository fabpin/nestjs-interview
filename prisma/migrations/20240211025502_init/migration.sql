-- DropForeignKey
ALTER TABLE `PivotTimesheetTypeEvent` DROP FOREIGN KEY `PivotTimesheetTypeEvent_company_parameter_id_fkey`;

-- DropForeignKey
ALTER TABLE `PivotTimesheetTypeEvent` DROP FOREIGN KEY `PivotTimesheetTypeEvent_timesheet_Type_Event_id_fkey`;

-- DropForeignKey
ALTER TABLE `PivotTimesheetTypeEvent` DROP FOREIGN KEY `PivotTimesheetTypeEvent_timesheet_id_fkey`;

-- DropForeignKey
ALTER TABLE `PivotTimesheetTypeEvent` DROP FOREIGN KEY `PivotTimesheetTypeEvent_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_company_parameters_id_fkey`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_company_parameters_id_fkey` FOREIGN KEY (`company_parameters_id`) REFERENCES `CompanyParameter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PivotTimesheetTypeEvent` ADD CONSTRAINT `PivotTimesheetTypeEvent_timesheet_id_fkey` FOREIGN KEY (`timesheet_id`) REFERENCES `Timesheet`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PivotTimesheetTypeEvent` ADD CONSTRAINT `PivotTimesheetTypeEvent_timesheet_Type_Event_id_fkey` FOREIGN KEY (`timesheet_Type_Event_id`) REFERENCES `TimesheetTypeEvent`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PivotTimesheetTypeEvent` ADD CONSTRAINT `PivotTimesheetTypeEvent_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PivotTimesheetTypeEvent` ADD CONSTRAINT `PivotTimesheetTypeEvent_company_parameter_id_fkey` FOREIGN KEY (`company_parameter_id`) REFERENCES `CompanyParameter`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
