import { IPrismaInterface } from "@ocmi/api/adapters/DataBaseAdapter/Prisma/IPrisma.interface";
import {ENModel, ETModel, ETModelByEmail, ETModelByName, IETModel} from "@ocmi/api/providers/prisma/TModel.enum";
import { PrismaProviders } from "@ocmi/api/providers/prisma/prisma.providers";
import {PivotTimesheetTypeEvent} from "@prisma/client";

export class PrismaAdapter implements IPrismaInterface {
  private prismaProvider: PrismaProviders;
  constructor(typeOfModel: ENModel, model?: ETModel | IETModel) {
    this.prismaProvider = new PrismaProviders(typeOfModel, model)
  }
  async create(): Promise<ETModel> {
    return await this.prismaProvider.create();
  }

  async delete(id: number): Promise<ETModel> {
    return this.prismaProvider.delete(id);
  }

  async findByEmail(email: string): Promise<ETModelByEmail> {
    return this.prismaProvider.findByEmail(email);
  }

  async findById(id: number): Promise<ETModel> {
    return this.prismaProvider.findById(id);
  }

  async findByName(name: string): Promise<ETModelByName | ETModelByName[]> {
    return this.prismaProvider.findByName(name);
  }

  async pagination(take?: number, skip?: number): Promise<ETModel[]> {
    return this.prismaProvider.pagination(take, skip);
  }

  async update(id: number): Promise<ETModel> {
    return this.prismaProvider.update(id);
  }

  async findPivotTimeSheeetCheck(id: number): Promise<PivotTimesheetTypeEvent> {
    return this.prismaProvider.findPivotTimeSheeetCheck(id);
  }

  async disconnect(): Promise<void> {
    return this.prismaProvider.disconnect();
  }

}
