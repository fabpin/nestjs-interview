import { Prisma } from "@prisma/client";
export declare type ICompanyParameter = {
  id?: number | undefined,
  name?: string | undefined,
  email?: string | undefined,
  minimun_wages_salary?: Prisma.Decimal | undefined,
  minimun_wages_hourly?: Prisma.Decimal | undefined,
  created_at?: Date | undefined,
  updated_at?: Date | undefined,
  deleted_at?: Date | undefined
}
