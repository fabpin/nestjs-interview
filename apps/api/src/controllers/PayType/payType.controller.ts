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
import { PayType } from "@prisma/client";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";
import { CustomerRolGuard } from "@ocmi/api/guards/Rol/CustomerRol.guard";
import { ValidateNameAlphabeticMiddleware } from "@ocmi/api/middleware/common/validateNameOnly.middleware";
import { VerifiedIDToUpdatePayTypeMiddleware } from "@ocmi/api/middleware/PayType/VerifiedIDToUpdatePayType.middleware";
import { VerifiedNameToUpdatePayTypeMiddleware } from "@ocmi/api/middleware/PayType/VerifiedNameToUpdatePayType.middleware";
import { AdminRolGuard } from "@ocmi/api/guards/Rol/AdminRol.guard";

@Controller('pay_type')
export class PayTypeController implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifiedIDToUpdatePayTypeMiddleware)
      .forRoutes(
        { path: 'pay_type', method: RequestMethod.PUT },
        { path: 'pay_type', method: RequestMethod.DELETE }
      )
      .apply(ValidateNameAlphabeticMiddleware, VerifiedNameToUpdatePayTypeMiddleware)
      .forRoutes(
        { path: 'pay_type', method: RequestMethod.POST },
        { path: 'pay_type', method: RequestMethod.PUT }
      );
  }
  protected prismaService: PrismaService;
  constructor() {
  }

  @UseGuards(CustomerRolGuard)
  @Get()
  async getPayType(@Res() res: Response){
    this.prismaService = new PrismaService('PayType');
    const payTypes: ETModel[] = await this.prismaService.pagination();
    await this.prismaService.disconnect();
    res.status(200).json(payTypes);
  }

  @UseGuards(CustomerRolGuard)
  @Post()
  async createPayType(@Body() payType: PayType, @Res() res: Response){
    this.prismaService = new PrismaService('PayType', payType);
    const payTypeSaved: ETModel = await this.prismaService.create();
    await this.prismaService.disconnect();
    res.status(200).json(payTypeSaved);
  }

  @UseGuards(CustomerRolGuard)
  @Put(':id')
  async updatePayType(@Param('id') id: string, @Body() payType: PayType, @Res() res: Response){
    this.prismaService = new PrismaService('PayType', payType);
    const payTypeSaved: ETModel = await this.prismaService.update(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(payTypeSaved);
  }

  @UseGuards(AdminRolGuard)
  @Delete(':id')
  async deletePayType(@Param('id') id: string, @Res() res: Response){
    this.prismaService = new PrismaService('PayType');
    const payTypeSaved: ETModel = await this.prismaService.delete(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(payTypeSaved);
  }
}
