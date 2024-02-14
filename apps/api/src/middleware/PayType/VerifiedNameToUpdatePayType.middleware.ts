import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { DataBaseConnectionService } from "@ocmi/api/services/DataBaseService/DataBaseConnection.service";
import { ETModelByName } from "@ocmi/api/providers/prisma/TModel.enum";

@Injectable()
export class VerifiedNameToUpdatePayTypeMiddleware implements NestMiddleware {
  private dataBaseConnectionService: DataBaseConnectionService;
  constructor() {
    this.dataBaseConnectionService = new DataBaseConnectionService('Prisma', 'Check');
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const { name } = req.params;
    if(validator.isAlphanumeric(name.toString(),'en-US', {ignore: ' '})){
      const model:ETModelByName | ETModelByName[] = await this.dataBaseConnectionService.findByName(name);
      if(model) {
        next();
      } else {
        return res.status(409).json({message: 'the request has a incorrect name'});
      }
    }else{
      return res.status(401).json({message: 'the request has a incorrect name'});
    }
  }
}
