import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {DataBaseConnectionService} from "@ocmi/api/services/DataBaseService/DataBaseConnection.service";
import {Reflector} from "@nestjs/core";
import {JwtService} from "@nestjs/jwt";
import {IUser} from "@ocmi/api/providers/prisma/interface/User.interface";
import {ETModel} from "@ocmi/api/providers/prisma/TModel.enum";

@Injectable()
export class VerifiedCheckUserMiddleware implements NestMiddleware {
  protected dataBaseConnectionService:DataBaseConnectionService;
  constructor( private reflector: Reflector, private jwtService: JwtService) {
    this.dataBaseConnectionService = new DataBaseConnectionService('Prisma', 'User');
  }
  async use(req: Request, res: Response, next: NextFunction){
    const { user_id } = req.body;
    const  token: string = this.extractTokenFromHeader(req);
    let user: IUser;
    let user2: IUser;
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
      const userDB: ETModel = await this.dataBaseConnectionService.findById(user.id);
      const userDBToUpdate: ETModel = await this.dataBaseConnectionService.findById(user_id);
      user2 = userDBToUpdate;
      this.dataBaseConnectionService = new DataBaseConnectionService('Prisma', 'Rol');
      const rolDB: ETModel = await this.dataBaseConnectionService.findById(user.rol.id);
      if(
        (user.id ===  user_id && userDB && user2.rol.id !== 1 && user.CompanyParams.id === user2.CompanyParams.id) ||
        (user.rol.id === 1 && rolDB && userDBToUpdate) ||
        (userDB && user2.rol.id !== 1 && userDBToUpdate && user.CompanyParams.id === user2.CompanyParams.id)) {
        next();
      }
      res.status(409).json("It's mandatory a user with a valid rol");
    } catch(error){
      Logger.error(error);
      res.status(401).json("It's mandatory a user with a valid rol and valid company");
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
