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
import { Check } from "@prisma/client";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";
import { CustomerRolGuard } from "@ocmi/api/guards/Rol/CustomerRol.guard";
import { PivotTimesheetTypeEvent } from "@prisma/client/default";
import { CheckStructureMiddleware } from "@ocmi/api/middleware/Check/check.middleware";
import { VerifiedCheckUserMiddleware } from "@ocmi/api/middleware/Check/VerifiedCheckUser.middleware";
import { VerifiedIDToUpdateCheckMiddleware } from "@ocmi/api/middleware/Check/VerifiedIDToUpdateCheck.middleware";
import { VerifiedNameToUpdateCheckMiddleware } from "@ocmi/api/middleware/Check/VerifiedNameToUpdateCheck.middleware";

@Controller('checks')
export class CheckController implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        CheckStructureMiddleware,
        VerifiedCheckUserMiddleware,
        VerifiedNameToUpdateCheckMiddleware
      )
      .forRoutes(
        { path: 'checks', method: RequestMethod.POST },
        { path: 'checks', method: RequestMethod.PUT }
      )
      .apply(VerifiedIDToUpdateCheckMiddleware)
      .forRoutes(
        { path: 'checks', method: RequestMethod.PUT },
        { path: 'checks', method: RequestMethod.DELETE }
        );
  }
  protected prismaService: PrismaService;
  protected prismaServicePivotTimeSheet: PrismaService;

  @UseGuards(CustomerRolGuard)
  @Get()
  async getCheck(@Res() res: Response){
    this.prismaService = new PrismaService('Check');
    const checks:ETModel[] = await this.prismaService.pagination();
    await this.prismaService.disconnect();
    res.status(200).json(checks);
  }

  @UseGuards(CustomerRolGuard)
  @Post()
  async createCheck(@Body() check: Check, @Res() res: Response){
    this.prismaService = new PrismaService('Check', check);
    const checkSaved:ETModel = await this.prismaService.create();
    await this.prismaService.disconnect();
    res.status(200).json(checkSaved);
  }

  @UseGuards(CustomerRolGuard)
  @Put(':id')
  async updateCheck(@Param('id') id: string, @Body() check: Check, @Res() res: Response){
    this.prismaService = new PrismaService('Check', check);
    this.prismaServicePivotTimeSheet = new PrismaService('PivotTimesheetTypeEvent');
    const pivotSaved:PivotTimesheetTypeEvent = await this.prismaServicePivotTimeSheet.findPivotTimeSheeetCheck(parseInt(id));
    if(pivotSaved){
      pivotSaved.user_id = check.user_id;
      this.prismaServicePivotTimeSheet = new PrismaService('PivotTimesheetTypeEvent', pivotSaved);
      await this.prismaServicePivotTimeSheet.update(pivotSaved.id);
    }
    const checkSaved:ETModel = await this.prismaService.update(parseInt(id));
    await this.prismaService.disconnect();
    await this.prismaServicePivotTimeSheet.disconnect();
    res.status(200).json(checkSaved);
  }

  @UseGuards(CustomerRolGuard)
  @Delete(':id')
  async deleteCheck(@Param('id') id: string, @Res() res: Response){
    this.prismaService = new PrismaService('Check');
    const checkDeleted:ETModel = await this.prismaService.delete(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(checkDeleted);
  }
}
