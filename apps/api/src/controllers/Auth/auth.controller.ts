import { Controller, Post, Body, Res} from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from "@ocmi/api/services/Prisma/PrismaService.service";
import { AuthService } from "./auth.service";
import { LoginDTO } from "@ocmi/api/controllers/Auth/DTO/Login.DTO";
import { Public } from "@ocmi/api/guards/Public.guard";

@Controller('auth')
export class AuthController {
  protected prismaService: PrismaService;
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  async signIn(@Body() loginDTO: LoginDTO, @Res() res: Response){
    const logIn = await this.authService.signIn(loginDTO.email, loginDTO.password);
    res.status(200).json(logIn);
  }
}
