import { Controller, Get, Post, Put, Delete, Body, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { User } from "@prisma/client";
import { IUser } from "@ocmi/api/providers/prisma/interface/User.interface";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { ETModel, IETModel } from "@ocmi/api/providers/prisma/TModel.enum";

@Controller('users')
export class UserController {
  protected prismaService: PrismaService;
  protected prismaServiceUser: PrismaService;
  protected prismaServiceRol: PrismaService;
  protected prismaServicePayType: PrismaService;
  protected prismaServiceCompany: PrismaService;
  protected iUser:IUser | void;
  constructor() {
    this.prismaServiceRol = new PrismaService('Rol');
    this.prismaServicePayType = new PrismaService('PayType');
    this.prismaServiceCompany = new PrismaService('CompanyParameter');
  }

  @Get()
  async getUser(@Res() res: Response){
    this.prismaService = new PrismaService('User');
    const users: ETModel[] = await this.prismaService.pagination();
    await this.prismaService.disconnect();
    res.status(200).json(users);
  }

  @Post()
  async createUser(@Body() user: User, @Res() res: Response){
    this.iUser = user;
    const rol: ETModel = await this.prismaServiceRol.findById(user.rol_id);
    const payTime: ETModel = await this.prismaServicePayType.findById(user.pay_type_id);
    const companyParameter: ETModel = await this.prismaServiceCompany.findById(user.company_parameters_id);
    this.iUser.rol = rol;
    this.iUser.payType = payTime;
    this.iUser.CompanyParams = companyParameter;
    this.prismaServiceUser = new PrismaService('User', this.iUser);
    const userSaved: ETModel = await this.prismaServiceUser.create();
    await this.prismaServiceRol.disconnect();
    await this.prismaServicePayType.disconnect();
    await this.prismaServiceCompany.disconnect();
    await this.prismaServiceUser.disconnect();
    res.status(200).json(userSaved);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: User, @Res() res: Response){
    this.iUser = user;
    const rol: ETModel = await this.prismaServiceRol.findById(user.rol_id);
    const payTime: ETModel = await this.prismaServicePayType.findById(user.pay_type_id);
    const companyParameter: ETModel = await this.prismaServiceCompany.findById(user.company_parameters_id);
    this.iUser.rol = rol;
    this.iUser.payType = payTime;
    this.iUser.CompanyParams = companyParameter;
    this.prismaServiceUser = new PrismaService('User', this.iUser);
    const userSaved: ETModel = await this.prismaServiceUser.update(parseInt(id));
    await this.prismaServiceRol.disconnect();
    await this.prismaServicePayType.disconnect();
    await this.prismaServiceCompany.disconnect();
    await this.prismaServiceUser.disconnect();
    res.status(200).json(userSaved);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response){
    this.prismaService = new PrismaService('User');
    const userDelated: ETModel = await this.prismaService.delete(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(userDelated);
  }
}
