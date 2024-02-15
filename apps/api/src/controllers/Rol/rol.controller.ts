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
import { Rol } from "@prisma/client";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";
import { AdminRolGuard } from "@ocmi/api/guards/Rol/AdminRol.guard";
import { ValidateNameAlphabeticMiddleware } from "@ocmi/api/middleware/common/validateNameOnly.middleware";
import { VerifiedIDToUpdateRolMiddleware } from "@ocmi/api/middleware/Rol/VerifiedIDToUpdateRol.middleware";
import { VerifiedNameToUpdateRolMiddleware } from "@ocmi/api/middleware/Rol/VerifiedNameToUpdateRol.middleware";
import { ValidatePaginationMiddleware } from "@ocmi/api/middleware/common/ValidatePagination.middleware";

@Controller('rol')
export class RolController implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateNameAlphabeticMiddleware, VerifiedNameToUpdateRolMiddleware)
      .forRoutes(
        { path: 'rol', method: RequestMethod.POST },
        { path: 'rol', method: RequestMethod.PUT }
      )
      .apply(VerifiedIDToUpdateRolMiddleware)
      .forRoutes(
        { path: 'rol', method: RequestMethod.PUT },
        { path: 'rol', method: RequestMethod.DELETE })
      .apply(ValidatePaginationMiddleware)
      .forRoutes({ path: 'company_parameters', method: RequestMethod.GET });
  }
  protected prismaService: PrismaService;
  constructor() {
  }

  @UseGuards(AdminRolGuard)
  @Get()
  async getRol(@Res() res: Response, @Query() query){
    const { take ,skip } = query;
    this.prismaService = new PrismaService('Rol');
    const roles: ETModel[] = await this.prismaService.pagination(take, skip);
    await this.prismaService.disconnect();
    return res.status(200).json(roles);
  }

  @UseGuards(AdminRolGuard)
  @Post()
  async createRol(@Body() rol: Rol, @Res() res: Response){
    this.prismaService = new PrismaService('Rol', rol);
    const rolSaved: ETModel = await this.prismaService.create();
    await this.prismaService.disconnect();
    return res.status(200).json(rolSaved);
  }

  @UseGuards(AdminRolGuard)
  @Put(':id')
  async updateRol(@Param('id') id: string, @Body() rol: Rol, @Res() res: Response){
    this.prismaService = new PrismaService('Rol', rol);
    const rolSaved: ETModel = await this.prismaService.update(parseInt(id));
    await this.prismaService.disconnect();
    return res.status(200).json(rolSaved);
  }

  @UseGuards(AdminRolGuard)
  @Delete(':id')
  async deleteRol(@Param('id') id: string, @Res() res: Response){
    this.prismaService = new PrismaService('Rol');
    const rolDeleted: ETModel = await this.prismaService.delete(parseInt(id));
    await this.prismaService.disconnect();
    return res.status(200).json(rolDeleted);
  }
}
