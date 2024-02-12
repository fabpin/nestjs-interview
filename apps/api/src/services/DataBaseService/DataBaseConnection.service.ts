import {ETModel, ETModelByEmail, ETModelByName} from "@ocmi/api/providers/prisma/TModel.enum";
import {Logger} from "@nestjs/common";
import { DataBaseConnectionAbstract } from "@ocmi/api/services/DataBaseService/DataBaseConnection.abstract";
import { Injectable } from '@nestjs/common';

@Injectable()
export class DataBaseConnectionService extends DataBaseConnectionAbstract{
  async create() : Promise<ETModel>{
    return await this.dataBaseAdapter
                     .create()
                     .catch(error => {
                       Logger.error(error);
                       throw new Error('Error on create');
                     });
  }

  async delete(id: number): Promise<ETModel> {
    return await this.dataBaseAdapter
      .delete(id)
      .catch(error => {
        Logger.error(error);
        throw new Error('Error on delete');
      });
  }

  async findByEmail(email: string): Promise<ETModelByEmail> {
    return await this.dataBaseAdapter
      .findByEmail(email)
      .catch(error => {
        Logger.error(error);
        throw new Error('Error on findByEmail');
      });
  }

  async findById(id: number): Promise<ETModel> {
    return await this.dataBaseAdapter
      .findById(id)
      .catch(error => {
        Logger.error(error);
        throw new Error('Error on findById');
      });
  }

  async findByName(name: string): Promise<ETModelByName | ETModelByName[]> {
    return await this.dataBaseAdapter
      .findByName(name)
      .catch(error => {
        Logger.error(error);
        throw new Error('Error on findByName');
      });
  }

  async pagination(take?: number, skip?: number): Promise<ETModel[]> {
    return await this.dataBaseAdapter
      .pagination(take, skip)
      .catch(error => {
        Logger.error(error);
        throw new Error('Error on pagination');
      });
  }

  async update(id: number): Promise<ETModel> {
    return await this.dataBaseAdapter
      .update(id)
      .catch(error => {
        Logger.error(error);
        throw new Error('Error on update');
      });
  }

  async disconnect(): Promise<void> {
    return await this.dataBaseAdapter.disconnect();
  }
}
