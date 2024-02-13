import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataBaseConnectionService } from '../../services/DataBaseService/DataBaseConnection.service';
import { JwtService } from '@nestjs/jwt';
import { ETModelByEmail } from "@ocmi/api/providers/prisma/TModel.enum";
import bcryptjs from "bcryptjs";
import {IUser} from "@ocmi/api/providers/prisma/interface/User.interface";

@Injectable()
export class AuthService {
  protected dataBaseConnectionService:DataBaseConnectionService;
  protected user:IUser;
  constructor(
    private jwtService: JwtService
  ) {
    this.dataBaseConnectionService = new DataBaseConnectionService('Prisma','User');
  }

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user:ETModelByEmail = await this.dataBaseConnectionService.findByEmail(email);
    await this.dataBaseConnectionService.disconnect();
    this.user = user;
    if (!bcryptjs.compareSync(pass, this.user.password)) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.jwtService.signAsync(this.user),
    };
  }
}
