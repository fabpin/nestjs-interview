import { Prisma } from "@prisma/client";
export declare type ITimesheet = {
  id?: number | undefined,
  hours?: Prisma.Decimal | undefined,
  created_at?: Date | undefined,
  updated_at?: Date | undefined,
  deleted_at?: Date | undefined
}
