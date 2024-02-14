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
import { CompanyParameter } from "@prisma/client";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";
import { VerifiedEmailToUpdateCompanyParameterMiddleware } from "@ocmi/api/middleware/CompanyParameter/VerifiedEmailToUpdateCompanyParameter.middleware";
import { CustomerRolGuard } from "@ocmi/api/guards/Rol/CustomerRol.guard";
import { AdminRolGuard } from "@ocmi/api/guards/Rol/AdminRol.guard";
import { VerifiedIDToUpdateCompanyParameterMiddleware } from "@ocmi/api/middleware/CompanyParameter/VerifiedIDToUpdateCompanyParameter.middleware";
import { CompanyParameterMiddleware } from "@ocmi/api/middleware/CompanyParameter/CompanyParameter.middleware";
import { VerifiedNameToUpdateCompanyParameterMiddleware } from "@ocmi/api/middleware/CompanyParameter/VerifiedNameToUpdateCompanyParameter.middleware";

@Controller('company_parameters')
export class CompanyParameterController implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifiedIDToUpdateCompanyParameterMiddleware)
      .forRoutes(
        { path: 'company_parameters', method: RequestMethod.PUT },
        { path: 'company_parameters', method: RequestMethod.DELETE }
      )
      .apply(
        CompanyParameterMiddleware,
        VerifiedEmailToUpdateCompanyParameterMiddleware,
        VerifiedNameToUpdateCompanyParameterMiddleware
      )
      .forRoutes(
        { path: 'company_parameters', method: RequestMethod.POST },
        { path: 'company_parameters', method: RequestMethod.PUT }
      );
  }
  protected prismaService: PrismaService;

  constructor() {
  }

  @UseGuards(CustomerRolGuard)
  @Get()
  async getCompanyParameter(@Res() res: Response){
    this.prismaService = new PrismaService('CompanyParameter');
    const companyParameters:ETModel[] = await this.prismaService.pagination();
    await this.prismaService.disconnect();
    res.status(200).json(companyParameters);
  }

  @UseGuards(AdminRolGuard)
  @Post()
  async createCompanyParameter(@Body() companyParameter: CompanyParameter, @Res() res: Response){
    this.prismaService = new PrismaService('CompanyParameter', companyParameter);
    const companyParameterSaved:ETModel = await this.prismaService.create();
    await this.prismaService.disconnect();
    res.status(200).json(companyParameterSaved);
  }

  @UseGuards(CustomerRolGuard)
  @Put(':id')
  async updateCompanyParameter(@Param('id') id: string, @Body() companyParameter: CompanyParameter, @Res() res: Response){
    this.prismaService = new PrismaService('CompanyParameter', companyParameter);
    const companyParameterSaved: ETModel = await this.prismaService.update(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(companyParameterSaved);
  }

  @UseGuards(AdminRolGuard)
  @Delete(':id')
  async deleteCompanyParameter(@Param('id') id: string, @Res() res: Response){
    this.prismaService = new PrismaService('CompanyParameter');
    const companyParameterDeleted: ETModel = await this.prismaService.delete(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(companyParameterDeleted);
  }
}
