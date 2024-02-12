import { Controller, Get, Post, Put, Delete, Body, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { Rol } from "@prisma/client";
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";

@Controller('rol')
export class RolController {
  protected prismaService: PrismaService;
  constructor() {
  }

  @Get()
  async getRol(@Res() res: Response){
    this.prismaService = new PrismaService('Rol');
    const roles: ETModel[] = await this.prismaService.pagination();
    await this.prismaService.disconnect();
    res.status(200).json(roles);
  }

  @Post()
  async createRol(@Body() rol: Rol, @Res() res: Response){
    this.prismaService = new PrismaService('Rol', rol);
    const rolSaved: ETModel = await this.prismaService.create();
    await this.prismaService.disconnect();
    res.status(200).json(rolSaved);
  }

  @Put(':id')
  async updateRol(@Param('id') id: string, @Body() rol: Rol, @Res() res: Response){
    this.prismaService = new PrismaService('Rol', rol);
    const rolSaved: ETModel = await this.prismaService.update(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(rolSaved);
  }

  @Delete(':id')
  async deleteRol(@Param('id') id: string, @Res() res: Response){
    this.prismaService = new PrismaService('Rol');
    const rolDeleted: ETModel = await this.prismaService.delete(parseInt(id));
    await this.prismaService.disconnect();
    res.status(200).json(rolDeleted);
  }
}
