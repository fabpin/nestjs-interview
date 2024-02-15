import { IUser } from "@ocmi/api/providers/prisma/interface/User.interface";
import { Prisma } from "@prisma/client";
export declare type ICheck = {
  id?: number | undefined,
  name?: string | undefined,
  gross_wages? : Prisma.Decimal | undefined
  user?: IUser | undefined,
  user_id?: number | undefined,
  created_at?: Date | undefined,
  updated_at?: Date | undefined,
  deleted_at?: Date | undefined
}
