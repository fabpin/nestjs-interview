-- AlterTable
ALTER TABLE `Check` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `PayType` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `PivotTimesheetTypeEvent` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Rol` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Status` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Timesheet` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `TimesheetTypeEvent` MODIFY `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);