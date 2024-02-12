import { Controller, Get, Post, Put, Delete, Body, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { CompanyParameter } from "@prisma/client";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";

@Controller('company_parameters')
export class CompanyParameterController {
  protected prismaService: PrismaService;

  constructor() {
  }

  @Get()
  async getCompanyParameter(@Res() res: Response){
    this.prismaService = new PrismaService('CompanyParameter');
    const companyParameters:ETModel[] = await this.prismaService.pagination();
    await this.prismaService.disconnect();
    res.status(200).json(companyParameters);
  }

  @Post()
  async createCompanyParameter(@Body() companyParameter: CompanyParameter, @Res() res: Response){
    this.prismaService = new PrismaService('CompanyParameter', companyParameter);
    const companyParameterSaved:ETModel = await this.prismaService.create();
    await this.prismaService.disconnect();
    res.status(200).json(companyParameterSaved);
  }

  @Put(':id')
  async updateCompanyParameter(@Param('id') id: string, @Body() companyParameter: CompanyParameter, @Res() res: Response){
    this.prismaService = new PrismaService('CompanyParameter', companyParameter);
    const companyParameterSaved: ETModel = await this.prismaService.update(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(companyParameterSaved);
  }

  @Delete(':id')
  async deleteCompanyParameter(@Param('id') id: string, @Res() res: Response){
    this.prismaService = new PrismaService('CompanyParameter');
    const companyParameterDeleted: ETModel = await this.prismaService.delete(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(companyParameterDeleted);
  }
}
