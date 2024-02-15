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
  MiddlewareConsumer, RequestMethod, Query
} from '@nestjs/common';
import { Response } from 'express';
import { TimesheetTypeEvent } from "@prisma/client";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";
import { CustomerRolGuard } from "@ocmi/api/guards/Rol/CustomerRol.guard";
import { ValidateNameAlphabeticMiddleware } from "@ocmi/api/middleware/common/validateNameOnly.middleware";
import { VerifiedIDToUpdateTimeSheetTypeMiddleware } from "@ocmi/api/middleware/TimeSheetType/VerifiedIDToUpdateTimeSheetType.middleware";
import {ValidatePaginationMiddleware} from "@ocmi/api/middleware/common/ValidatePagination.middleware";

@Controller('timesheet_type')
export class TimesheetTypeController implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ValidateNameAlphabeticMiddleware,
        VerifiedIDToUpdateTimeSheetTypeMiddleware
      )
      .forRoutes(
        { path: 'timesheet_type', method: RequestMethod.POST },
        { path: 'timesheet_type', method: RequestMethod.PUT }
      )
      .apply(VerifiedIDToUpdateTimeSheetTypeMiddleware)
      .forRoutes({ path: 'timesheet_type', method: RequestMethod.DELETE })
      .apply(ValidatePaginationMiddleware)
      .forRoutes({ path: 'company_parameters', method: RequestMethod.GET });
  }
  protected prismaService: PrismaService;

  @UseGuards(CustomerRolGuard)
  @Get()
  async getTimeSheetType(@Res() res: Response, @Query() query){
    const { take ,skip } = query;
    this.prismaService = new PrismaService('TimesheetTypeEvent');
    const checks:ETModel[] = await this.prismaService.pagination(take, skip);
    await this.prismaService.disconnect();
    return res.status(200).json(checks);
  }

  @UseGuards(CustomerRolGuard)
  @Post()
  async createTimeSheetType(@Body() timesheetTypeEvent: TimesheetTypeEvent, @Res() res: Response){
    this.prismaService = new PrismaService('TimesheetTypeEvent', timesheetTypeEvent);
    const checkSaved:ETModel = await this.prismaService.create();
    await this.prismaService.disconnect();
    return res.status(200).json(checkSaved);
  }

  @UseGuards(CustomerRolGuard)
  @Put(':id')
  async updateTimeSheetType(@Param('id') id: string, @Body() timesheetTypeEvent: TimesheetTypeEvent, @Res() res: Response){
    this.prismaService = new PrismaService('TimesheetTypeEvent', timesheetTypeEvent);
    const checkSaved:ETModel = await this.prismaService.update(parseInt(id));
    await this.prismaService.disconnect();
    return res.status(200).json(checkSaved);
  }

  @UseGuards(CustomerRolGuard)
  @Delete(':id')
  async deleteTimeSheetType(@Param('id') id: string, @Res() res: Response){
    this.prismaService = new PrismaService('TimesheetTypeEvent');
    const checkDeleted:ETModel = await this.prismaService.delete(parseInt(id));
    await this.prismaService.disconnect();
    return res.status(200).json(checkDeleted);
  }
}
