import { IUser } from "@ocmi/api/providers/prisma/interface/User.interface";
export declare type ICheck = {
  id?: number | undefined,
  name?: string | undefined,
  user?: IUser | undefined,
  created_at?: Date | undefined,
  updated_at?: Date | undefined,
  deleted_at?: Date | undefined
}
