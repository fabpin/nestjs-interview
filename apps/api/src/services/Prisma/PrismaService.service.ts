import {ETModel, ETModelByName, ETModelByEmail} from "@ocmi/api/providers/prisma/TModel.enum";
import { PrismaServiceAbstract } from "./PrismaService.abstract";
import {Logger} from "@nestjs/common";
import { Injectable } from '@nestjs/common';
import {PivotTimesheetTypeEvent} from "@prisma/client/default";

@Injectable()
export class PrismaService extends PrismaServiceAbstract {
  async create(): Promise<ETModel> {
    return this.prismaAdapter
               .create()
               .catch(error => {
                 Logger.error(error);
                 throw new Error('Error on create');
               });
  }

  async delete(id: number): Promise<ETModel> {
    return this.prismaAdapter
               .delete(id)
               .catch(error => {
                 Logger.error(error);
                 throw new Error('Error on delete');
               });
  }

  async findByEmail(email: string): Promise<ETModelByEmail> {
    return this.prismaAdapter
               .findByEmail(email)
               .catch(error => {
                 Logger.error(error);
                 throw new Error('Error on findByEmail');
               });
  }

  async findById(id: number): Promise<ETModel> {
    return this.prismaAdapter
               .findById(id)
               .catch(error => {
                 Logger.error(error);
                 throw new Error('Error on findById');
               });
  }

  async findByName(name: string): Promise<ETModelByName | ETModelByName[]> {
    return this.prismaAdapter
               .findByName(name)
               .catch(error => {
                 Logger.error(error);
                 throw new Error('Error on findByName');
               });
  }

  async pagination(take?: number, skip?: number): Promise<ETModel[]> {
    return this.prismaAdapter
               .pagination(take, skip)
               .catch(error => {
                 Logger.error(error);
                 throw new Error('Error on pagination');
               });
  }

  async update(id: number): Promise<ETModel> {
    return this.prismaAdapter
               .update(id)
               .catch(error => {
                 Logger.error(error);
                 throw new Error('Error on update');
               });
  }

  async findPivotTimeSheeetCheck(id: number): Promise<PivotTimesheetTypeEvent> {
    return await this.prismaAdapter
      .findPivotTimeSheeetCheck(id)
      .catch(error => {
        Logger.error(error);
        throw new Error('Error on find pivot');
      });
  }

  async disconnect(): Promise<void> {
    return await this.prismaAdapter.disconnect();
  }

}
