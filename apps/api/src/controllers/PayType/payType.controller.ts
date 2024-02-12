import { Controller, Get, Post, Put, Delete, Body, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { PayType } from "@prisma/client";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import {ETModel} from "@ocmi/api/providers/prisma/TModel.enum";

@Controller('pay_type')
export class PayTypeController {
  protected prismaService: PrismaService;
  constructor() {
  }

  @Get()
  async getPayType(@Res() res: Response){
    this.prismaService = new PrismaService('PayType');
    const payTypes: ETModel[] = await this.prismaService.pagination();
    await this.prismaService.disconnect();
    res.status(200).json(payTypes);
  }

  @Post()
  async createPayType(@Body() payType: PayType, @Res() res: Response){
    this.prismaService = new PrismaService('PayType', payType);
    const payTypeSaved: ETModel = await this.prismaService.create();
    await this.prismaService.disconnect();
    res.status(200).json(payTypeSaved);
  }

  @Put(':id')
  async updatePayType(@Param('id') id: string, @Body() payType: PayType, @Res() res: Response){
    this.prismaService = new PrismaService('PayType', payType);
    const payTypeSaved: ETModel = await this.prismaService.update(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(payTypeSaved);
  }

  @Delete(':id')
  async deletePayType(@Param('id') id: string, @Res() res: Response){
    this.prismaService = new PrismaService('PayType');
    const payTypeSaved: ETModel = await this.prismaService.delete(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(payTypeSaved);
  }
}
