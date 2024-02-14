import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Res,
  Param,
  UseGuards,
  NestModule,
  MiddlewareConsumer, RequestMethod
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma, PivotTimesheetTypeEvent } from "@prisma/client";
import { IPivotTimesheetTypeEvent } from "@ocmi/api/providers/prisma/interface/PivotTimesheetTypeEvent.interface";
import { ITimesheet } from "@ocmi/api/providers/prisma/interface/Timesheet.interface";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";
import { RegisterTimeDto } from "@ocmi/api/controllers/RegisterTime/DTO/RegisterTime.dto";
import { ICheck } from "@ocmi/api/providers/prisma/interface/Check.interface";
import { CustomerRolGuard } from "@ocmi/api/guards/Rol/CustomerRol.guard";
import { RegisterTimePostMiddleware } from "@ocmi/api/middleware/RegisterTime/registerTimePost.middleware";
import { RegisterTimePutMiddleware } from "@ocmi/api/middleware/RegisterTime/registerTimePut.middleware";
import { VerifiedNameToUpdateRegisterTimeMiddleware } from "@ocmi/api/middleware/RegisterTime/VerifiedNameToUpdateRegisterTime.middleware";
import { VerifiedStatusToUpdateRegisterTimeMiddleware } from "@ocmi/api/middleware/RegisterTime/VerifiedStatusToUpdateRegisterTime.middleware";
import { VerifiedTimeSheetTypeToUpdateRegisterTimeMiddleware } from "@ocmi/api/middleware/RegisterTime/VerifiedTimeSheetTypeToUpdateRegisterTime.middleware";
import { VerifiedUserToUpdateCheckMiddleware } from "@ocmi/api/middleware/Check/VerifiedUserToUpdateCheck.middleware";

@Controller('register_time')
export class RegisterTimeController implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        RegisterTimePostMiddleware,
        VerifiedNameToUpdateRegisterTimeMiddleware,
        VerifiedStatusToUpdateRegisterTimeMiddleware,
        VerifiedTimeSheetTypeToUpdateRegisterTimeMiddleware,
        VerifiedUserToUpdateCheckMiddleware
      )
      .forRoutes({ path: 'register_time', method: RequestMethod.POST })
      .apply(
        RegisterTimePutMiddleware,
        VerifiedStatusToUpdateRegisterTimeMiddleware,
        VerifiedTimeSheetTypeToUpdateRegisterTimeMiddleware,
        VerifiedUserToUpdateCheckMiddleware
      )
      .forRoutes({ path: 'register_time', method: RequestMethod.PUT });
  }
  protected prismaService: PrismaService;
  protected prismaServiceTimeSheet: PrismaService;
  protected prismaServiceUser: PrismaService;
  protected prismaServiceCheck: PrismaService;
  protected prismaServiceCompanyParameter: PrismaService;
  protected prismaServiceTimeSheetType: PrismaService;
  protected prismaServiceStatus: PrismaService;
  protected pivotTimesheetTypeEvent: IPivotTimesheetTypeEvent;
  protected timesheet: ITimesheet;
  protected check: ICheck;

  constructor() {
  }

  @UseGuards(CustomerRolGuard)
  @Get()
  async getRegisterTime(@Res() res: Response){
    this.prismaService = new PrismaService('PivotTimesheetTypeEvent');
    const payPivotTimesheetTypeEvent: ETModel[] = await this.prismaService.pagination();
    await this.prismaService.disconnect();
    res.status(200).json(payPivotTimesheetTypeEvent);
  }

  @UseGuards(CustomerRolGuard)
  @Post()
  async createRegisterTime(@Body() registerTimeDto: RegisterTimeDto, @Res() res: Response){
    this.pivotTimesheetTypeEvent = registerTimeDto;
    this.prismaServiceTimeSheet = new PrismaService('Timesheet', {hours: registerTimeDto.hours});
    const timesheet: ETModel = await this.prismaServiceTimeSheet.create();
    this.prismaServiceUser = new PrismaService('User');
    const user: ETModel = await this.prismaServiceUser.findById(this.pivotTimesheetTypeEvent.user_id);
    this.pivotTimesheetTypeEvent.user = user;
    this.pivotTimesheetTypeEvent.timesheet = timesheet;
    this.prismaServiceCompanyParameter = new PrismaService('CompanyParameter');
    const companyParameter: ETModel = await this.prismaServiceCompanyParameter.findById(this.pivotTimesheetTypeEvent.user.CompanyParams.id);
    this.prismaServiceTimeSheetType = new PrismaService('TimesheetTypeEvent');
    const timeSheetType: ETModel = await this.prismaServiceTimeSheetType.findById(this.pivotTimesheetTypeEvent.timesheet_Type_Event_id);
    this.pivotTimesheetTypeEvent.timesheet_type = timeSheetType;
    this.pivotTimesheetTypeEvent.companyParams = companyParameter;
    let gross_wages: Prisma.Decimal;
    const wages_hourly_price: Prisma.Decimal = <Prisma.Decimal>(typeof this.pivotTimesheetTypeEvent.companyParams.minimun_wages_hourly === 'string'? parseFloat(this.pivotTimesheetTypeEvent.companyParams.minimun_wages_hourly): this.pivotTimesheetTypeEvent.companyParams.minimun_wages_hourly);
    const wages_price_hour: Prisma.Decimal = <Prisma.Decimal>(typeof this.pivotTimesheetTypeEvent.timesheet.hours === 'string'?parseFloat(this.pivotTimesheetTypeEvent.timesheet.hours): this.pivotTimesheetTypeEvent.timesheet.hours);

    if(this.pivotTimesheetTypeEvent.timesheet_type.id === 1){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      gross_wages = wages_hourly_price * wages_price_hour;
    }else{
      gross_wages = registerTimeDto.gross_wages;
    }

    this.prismaServiceCheck = new PrismaService('Check', {name: registerTimeDto.name_check, gross_wages: gross_wages, user_id: this.pivotTimesheetTypeEvent.user.id});
    const check: ETModel = await this.prismaServiceCheck.create();
    this.pivotTimesheetTypeEvent.check = check;
    this.prismaServiceStatus = new PrismaService('Status');
    const status: ETModel = await this.prismaServiceStatus.findById(this.pivotTimesheetTypeEvent.status_id);
    this.pivotTimesheetTypeEvent.status = status;
    this.pivotTimesheetTypeEvent['company_parameter_id'] = this.pivotTimesheetTypeEvent.user.CompanyParams.id;
    this.pivotTimesheetTypeEvent['check_id'] = this.pivotTimesheetTypeEvent.check.id;
    this.pivotTimesheetTypeEvent['timesheet_id'] = this.pivotTimesheetTypeEvent.timesheet.id;
    this.prismaService = new PrismaService('PivotTimesheetTypeEvent', this.pivotTimesheetTypeEvent);
    const pivotTimesheetTypeEventSaved: ETModel = await this.prismaService.create();
    await this.prismaService.disconnect();
    await this.prismaServiceTimeSheet.disconnect();
    await this.prismaServiceUser.disconnect();
    await this.prismaServiceCheck.disconnect();
    await this.prismaServiceStatus.disconnect();
    await this.prismaServiceCompanyParameter.disconnect();
    await this.prismaServiceTimeSheetType.disconnect();
    res.status(200).json(pivotTimesheetTypeEventSaved);
  }

  @UseGuards(CustomerRolGuard)
  @Put(':id')
  async updateRegisterTime(@Param('id') id: string, @Body() pivotTimesheetTypeEvent: PivotTimesheetTypeEvent, @Res() res: Response){
    this.prismaService = new PrismaService('PivotTimesheetTypeEvent');
    const pivotTimesheetTypeEventSaved: ETModel = await this.prismaService.findById(parseInt(id));
    this.pivotTimesheetTypeEvent = pivotTimesheetTypeEventSaved;
    this.pivotTimesheetTypeEvent.note = pivotTimesheetTypeEvent.note;
    this.pivotTimesheetTypeEvent.status_id = pivotTimesheetTypeEvent.status_id;
    this.pivotTimesheetTypeEvent.timesheet_Type_Event_id = pivotTimesheetTypeEvent.timesheet_Type_Event_id;
    this.pivotTimesheetTypeEvent.user_id = pivotTimesheetTypeEvent.user_id;
    this.prismaService = new PrismaService('PivotTimesheetTypeEvent', this.pivotTimesheetTypeEvent);
    const pivotTimesheetTypeEventUpdated: ETModel = await this.prismaService.update(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(pivotTimesheetTypeEventUpdated);
  }
}
