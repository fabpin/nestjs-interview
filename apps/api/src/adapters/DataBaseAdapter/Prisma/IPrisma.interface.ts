import {ETModel, ETModelByEmail, ETModelByName} from "@ocmi/api/providers/prisma/TModel.enum";

export interface IPrismaInterface {
  create():Promise<ETModel>
  update(id: number):Promise<ETModel>
  findByName(name: string):Promise<ETModelByName | ETModelByName[]>
  findByEmail(email: string):Promise<ETModelByEmail>
  findById(id: number):Promise<ETModel>
  delete(id: number):Promise<ETModel>
  pagination(take?:number, skip?:number):Promise<ETModel[]>
  disconnect():Promise<void>
}
