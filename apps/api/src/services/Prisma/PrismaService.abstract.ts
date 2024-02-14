import { PrismaAdapter } from "@ocmi/api/adapters/DataBaseAdapter/Prisma/Prisma.adapter";
import {ETModel, ENModel, ETModelByName, ETModelByEmail, IETModel} from "@ocmi/api/providers/prisma/TModel.enum";
import {PivotTimesheetTypeEvent} from "@prisma/client/default";

export abstract class PrismaServiceAbstract {
  protected prismaAdapter: PrismaAdapter;
  constructor(typeOfModel: ENModel, model?: ETModel | IETModel) {
    this.prismaAdapter = new PrismaAdapter(typeOfModel, model);
  }

  abstract create():Promise<ETModel>
  abstract update(id: number):Promise<ETModel>
  abstract findByName(name: string):Promise<ETModelByName | ETModelByName[]>
  abstract findByEmail(email: string):Promise<ETModelByEmail>
  abstract findById(id: number):Promise<ETModel>
  abstract delete(id: number):Promise<ETModel>
  abstract pagination(take?:number, skip?:number):Promise<ETModel[]>
  abstract findPivotTimeSheeetCheck(id: number):Promise<PivotTimesheetTypeEvent>
  abstract disconnect():Promise<void>
}
