-- AlterTable
ALTER TABLE `PivotTimesheetTypeEvent` MODIFY `note` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
