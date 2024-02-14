import {
  Controller,
  Get,
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
import { Timesheet } from "@prisma/client";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";
import { CustomerRolGuard } from "@ocmi/api/guards/Rol/CustomerRol.guard";
import { TimeSheetMiddleware } from "@ocmi/api/middleware/TimeSheet/timesheet.middleware";
import { VerifiedIDToUpdateTimeSheetMiddleware } from "@ocmi/api/middleware/TimeSheet/VerifiedIDToUpdateTimeSheet.middleware";

@Controller('timesheet')
export class TimesheetController implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TimeSheetMiddleware, VerifiedIDToUpdateTimeSheetMiddleware)
      .forRoutes({ path: 'timesheet', method: RequestMethod.PUT })
      .apply(VerifiedIDToUpdateTimeSheetMiddleware)
      .forRoutes({ path: 'timesheet', method: RequestMethod.DELETE });
  }
  protected prismaService: PrismaService;

  @UseGuards(CustomerRolGuard)
  @Get()
  async getTimesheet(@Res() res: Response){
    this.prismaService = new PrismaService('Timesheet');
    const checks:ETModel[] = await this.prismaService.pagination();
    await this.prismaService.disconnect();
    res.status(200).json(checks);
  }

  @UseGuards(CustomerRolGuard)
  @Put(':id')
  async updateTimesheet(@Param('id') id: string, @Body() timesheet: Timesheet, @Res() res: Response){
    this.prismaService = new PrismaService('Timesheet', timesheet);
    const checkSaved:ETModel = await this.prismaService.update(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(checkSaved);
  }

  @UseGuards(CustomerRolGuard)
  @Delete(':id')
  async deleteTimesheet(@Param('id') id: string, @Res() res: Response){
    this.prismaService = new PrismaService('Timesheet');
    const checkDeleted:ETModel = await this.prismaService.delete(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(checkDeleted);
  }
}
