import {DataBaseAdapter} from "@ocmi/api/adapters/DataBaseAdapter/DataBase.adapter";
import {TypeProvider} from "@ocmi/api/adapters/DataBaseAdapter/TDataBase.enum";
import {ENModel, ETModel, ETModelByEmail, ETModelByName} from "@ocmi/api/providers/prisma/TModel.enum";
import {PivotTimesheetTypeEvent} from "@prisma/client/default";

export abstract class DataBaseConnectionAbstract{
  protected dataBaseAdapter:DataBaseAdapter;
  constructor(typeProvider: TypeProvider, typeOfModel?: ENModel, model?: ETModel) {
    this.dataBaseAdapter = new DataBaseAdapter(typeProvider, typeOfModel, model);
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
