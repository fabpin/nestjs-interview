import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Res,
  Param,
  UseGuards,
  NestModule,
  MiddlewareConsumer, RequestMethod
} from '@nestjs/common';
import { Response } from 'express';
import { User } from "@prisma/client";
import { IUser } from "@ocmi/api/providers/prisma/interface/User.interface";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";
import { CustomerRolGuard } from "@ocmi/api/guards/Rol/CustomerRol.guard";
import { UserMiddleware } from "@ocmi/api/middleware/User/user.middleware";
import { VerifiedIDToUpdateUserMiddleware } from "@ocmi/api/middleware/User/VerifiedIDToUpdateUser.middleware";
import { VerifiedNameToUpdateUserMiddleware } from "@ocmi/api/middleware/User/VerifiedNameToUpdateUser.middleware";
import { VerifiedEmailToUpdateUserMiddleware } from "@ocmi/api/middleware/User/VerifiedEmailToUpdateUser.middleware";
import { VerifiedPayTypeToUpdateUserMiddleware } from "@ocmi/api/middleware/User/VerifiedPayTypeToUpdateUser.middleware";
import { VerifiedRolToUpdateUserMiddleware } from "@ocmi/api/middleware/User/VerifiedRolToUpdateUser.middleware";
import { VerifiedCompanyParameterToUpdateUserMiddleware } from "@ocmi/api/middleware/User/VerifiedCompanyParameterToUpdateUser.middleware";

@Controller('users')
export class UserController implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        UserMiddleware,
        VerifiedNameToUpdateUserMiddleware,
        VerifiedEmailToUpdateUserMiddleware,
        VerifiedPayTypeToUpdateUserMiddleware,
        VerifiedRolToUpdateUserMiddleware,
        VerifiedCompanyParameterToUpdateUserMiddleware
      )
      .forRoutes(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users', method: RequestMethod.PUT }
      )
      .apply(VerifiedIDToUpdateUserMiddleware)
      .forRoutes(
        { path: 'users', method: RequestMethod.PUT },
        { path: 'users', method: RequestMethod.DELETE }
      );;
  }

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

  @UseGuards(CustomerRolGuard)
  @Get()
  async getUser(@Res() res: Response){
    this.prismaService = new PrismaService('User');
    const users: ETModel[] = await this.prismaService.pagination();
    await this.prismaService.disconnect();
    res.status(200).json(users);
  }

  @UseGuards(CustomerRolGuard)
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

  @UseGuards(CustomerRolGuard)
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

  @UseGuards(CustomerRolGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response){
    this.prismaService = new PrismaService('User');
    const userDelated: ETModel = await this.prismaService.delete(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(userDelated);
  }
}
