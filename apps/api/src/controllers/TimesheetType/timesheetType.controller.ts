import { Controller, Get, Post, Put, Delete, Body, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { TimesheetTypeEvent } from "@prisma/client";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import {ETModel} from "@ocmi/api/providers/prisma/TModel.enum";

@Controller('timesheet_type')
export class TimesheetTypeController {
  protected prismaService: PrismaService;

  @Get()
  async getTimeSheetType(@Res() res: Response){
    this.prismaService = new PrismaService('TimesheetTypeEvent');
    const checks:ETModel[] = await this.prismaService.pagination();
    await this.prismaService.disconnect();
    res.status(200).json(checks);
  }

  @Post()
  async createTimeSheetType(@Body() timesheetTypeEvent: TimesheetTypeEvent, @Res() res: Response){
    this.prismaService = new PrismaService('TimesheetTypeEvent', timesheetTypeEvent);
    const checkSaved:ETModel = await this.prismaService.create();
    await this.prismaService.disconnect();
    res.status(200).json(checkSaved);
  }

  @Put(':id')
  async updateTimeSheetType(@Param('id') id: string, @Body() timesheetTypeEvent: TimesheetTypeEvent, @Res() res: Response){
    this.prismaService = new PrismaService('TimesheetTypeEvent', timesheetTypeEvent);
    const checkSaved:ETModel = await this.prismaService.update(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(checkSaved);
  }

  @Delete(':id')
  async deleteTimeSheetType(@Param('id') id: string, @Res() res: Response){
    this.prismaService = new PrismaService('TimesheetTypeEvent');
    const checkDeleted:ETModel = await this.prismaService.delete(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(checkDeleted);
  }
}
