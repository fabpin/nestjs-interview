import { Controller, Get, Post, Put, Delete, Body, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { Check } from "@prisma/client";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import {ETModel} from "@ocmi/api/providers/prisma/TModel.enum";

@Controller('checks')
export class CheckController {
  protected prismaService: PrismaService;

  @Get()
  async getCheck(@Res() res: Response){
    this.prismaService = new PrismaService('Check');
    const checks:ETModel[] = await this.prismaService.pagination();
    await this.prismaService.disconnect();
    res.status(200).json(checks);
  }

  @Post()
  async createCheck(@Body() check: Check, @Res() res: Response){
    this.prismaService = new PrismaService('Check', check);
    const checkSaved:ETModel = await this.prismaService.create();
    await this.prismaService.disconnect();
    res.status(200).json(checkSaved);
  }

  @Put(':id')
  async updateCheck(@Param('id') id: string, @Body() check: Check, @Res() res: Response){
    this.prismaService = new PrismaService('Check', check);
    const checkSaved:ETModel = await this.prismaService.update(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(checkSaved);
  }

  @Delete(':id')
  async deleteCheck(@Param('id') id: string, @Res() res: Response){
    this.prismaService = new PrismaService('Check');
    const checkDeleted:ETModel = await this.prismaService.delete(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(checkDeleted);
  }
}
