import { ICheck } from "@ocmi/api/providers/prisma/interface/Check.interface";
import { IPayType } from "@ocmi/api/providers/prisma/interface/PayType.interface";
import { ICompanyParameter } from "@ocmi/api/providers/prisma/interface/CompanyParameters.interface";
import { IRol } from "@ocmi/api/providers/prisma/interface/Rol.interface";

export declare type IUser = {
  id?: number | undefined,
  name?: string | undefined,
  password?: string | undefined,
  email?: string | undefined,
  pay_date?: Date | undefined,
  check?: ICheck | undefined,
  rol?: IRol | undefined,
  payType?: IPayType | undefined,
  CompanyParams?: ICompanyParameter | undefined,
  created_at?: Date | undefined,
  updated_at?: Date | undefined,
  deleted_at?: Date | undefined
}
