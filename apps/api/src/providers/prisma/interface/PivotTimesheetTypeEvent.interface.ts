import {ICompanyParameter} from "@ocmi/api/providers/prisma/interface/CompanyParameters.interface";
import { ITimesheet } from "@ocmi/api/providers/prisma/interface/Timesheet.interface";
import { ITimesheetTypeEvent } from "@ocmi/api/providers/prisma/interface/TimesheetTypeEvent.interface";
import { IStatus } from "@ocmi/api/providers/prisma/interface/Status.interface";
import { IUser } from "@ocmi/api/providers/prisma/interface/User.interface";

export declare type IPivotTimesheetTypeEvent = {
  id?: number | undefined,
  note?: string | undefined,
  status?: IStatus | undefined,
  timesheet?: ITimesheet | undefined,
  timesheet_type?: ITimesheetTypeEvent | undefined,
  user?: IUser | undefined,
  companyParams?: ICompanyParameter | undefined,
  created_at?: Date | undefined,
  updated_at?: Date | undefined,
  deleted_at?: Date | undefined
}
