import { Controller, Get, Post, Put, Delete, Body, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { Timesheet } from "@prisma/client";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";

@Controller('timesheet')
export class TimesheetController {
  protected prismaService: PrismaService;

  @Get()
  async getTimesheet(@Res() res: Response){
    this.prismaService = new PrismaService('Timesheet');
    const checks:ETModel[] = await this.prismaService.pagination();
    await this.prismaService.disconnect();
    res.status(200).json(checks);
  }

  @Put(':id')
  async updateTimesheet(@Param('id') id: string, @Body() timesheet: Timesheet, @Res() res: Response){
    this.prismaService = new PrismaService('Timesheet', timesheet);
    const checkSaved:ETModel = await this.prismaService.update(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(checkSaved);
  }

  @Delete(':id')
  async deleteTimesheet(@Param('id') id: string, @Res() res: Response){
    this.prismaService = new PrismaService('Timesheet');
    const checkDeleted:ETModel = await this.prismaService.delete(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(checkDeleted);
  }
}
