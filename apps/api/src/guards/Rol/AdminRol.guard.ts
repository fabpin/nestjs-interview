import {
  CanActivate,
  ExecutionContext,
  Injectable, Logger,
  UnauthorizedException,
  ConflictException
} from '@nestjs/common';
import { Reflector } from "@nestjs/core";
import { DataBaseConnectionService } from "@ocmi/api/services/DataBaseService/DataBaseConnection.service";
import { Request } from "express";
import { JwtService } from '@nestjs/jwt';
import { IUser } from "@ocmi/api/providers/prisma/interface/User.interface";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";

@Injectable()
export class AdminRolGuard implements CanActivate {
  protected dataBaseConnectionService:DataBaseConnectionService;
  constructor( private reflector: Reflector, private jwtService: JwtService) {
    this.dataBaseConnectionService = new DataBaseConnectionService('Prisma', 'Rol');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    let user: IUser;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: (process.env.JWT_SECRET || 'secret'),
      });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      user = payload;
      const rol: ETModel = await this.dataBaseConnectionService.findById(user.rol.id);
      if(user.rol.id === 1 && rol) {
        return true;
      }
      throw new ConflictException();
    } catch(error){
      Logger.error(error);
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

