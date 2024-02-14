import { TypeProvider, ETypeProvider } from './TDataBase.enum';
import { DataBaseInterface } from "@ocmi/api/adapters/DataBaseAdapter/IDataBase.interface";
import {ENModel, ETModel, ETModelByEmail, ETModelByName} from "@ocmi/api/providers/prisma/TModel.enum";
import { PrismaAdapter } from "@ocmi/api/adapters/DataBaseAdapter/Prisma/Prisma.adapter";
import {PivotTimesheetTypeEvent} from "@prisma/client";

export class DataBaseAdapter implements DataBaseInterface {
  private typeProvider: TypeProvider;
  private prismaAdapter: PrismaAdapter;
  constructor(typeProvider: TypeProvider, typeOfModel?: ENModel, model?: ETModel) {
    this.typeProvider = typeProvider;
    switch(this.typeProvider){
      case ETypeProvider.PRISMA:
        this.prismaAdapter = new PrismaAdapter(typeOfModel, model);
    }
  }
  async create(): Promise<ETModel> {
    switch(this.typeProvider){
      case ETypeProvider.PRISMA:
        return await this.prismaAdapter.create();
    }
  }

  async delete(id: number): Promise<ETModel> {
    switch(this.typeProvider){
      case ETypeProvider.PRISMA:
        return this.prismaAdapter.delete(id);
    }
  }

  async findByEmail(email: string): Promise<ETModelByEmail> {
    switch(this.typeProvider){
      case ETypeProvider.PRISMA:
        return this.prismaAdapter.findByEmail(email);
    }
  }

  async findById(id: number): Promise<ETModel> {
    switch(this.typeProvider){
      case ETypeProvider.PRISMA:
        return this.prismaAdapter.findById(id);
    }
  }

  async findByName(name: string): Promise<ETModelByName | ETModelByName[]> {
    switch(this.typeProvider){
      case ETypeProvider.PRISMA:
        return this.prismaAdapter.findByName(name);
    }
  }

  async pagination(take?: number, skip?: number): Promise<ETModel[]> {
    switch(this.typeProvider){
      case ETypeProvider.PRISMA:
        return this.prismaAdapter.pagination(take, skip);
    }
  }

  async update(id: number): Promise<ETModel> {
    switch(this.typeProvider){
      case ETypeProvider.PRISMA:
        return this.prismaAdapter.update(id);
    }
  }

  findPivotTimeSheeetCheck(id: number): Promise<PivotTimesheetTypeEvent> {
    return this.prismaAdapter.findPivotTimeSheeetCheck(id);
  }

  async disconnect(): Promise<void> {
    return this.prismaAdapter.disconnect();
  }

}
