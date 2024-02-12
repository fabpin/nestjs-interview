import { Prisma } from "@prisma/client";

export class RegisterTimeDto{
  hours: Prisma.Decimal;
  name_check: string;
  user_id: number;
  note: string;
  status_id: number;
  gross_wages: Prisma.Decimal;
  timesheet_type_id: number;
}
