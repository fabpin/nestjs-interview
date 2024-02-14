import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { DataBaseConnectionService } from "@ocmi/api/services/DataBaseService/DataBaseConnection.service";
import { ETModelByName } from "@ocmi/api/providers/prisma/TModel.enum";

@Injectable()
export class VerifiedNameToUpdateRegisterTimeMiddleware implements NestMiddleware {
  private dataBaseConnectionService: DataBaseConnectionService;
  constructor() {
    this.dataBaseConnectionService = new DataBaseConnectionService('Prisma', 'Check');
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const { name_check } = req.params;
    if(validator.isAlphanumeric(name_check.toString(),'en-US', {ignore: ' '})){
      const model:ETModelByName | ETModelByName[] = await this.dataBaseConnectionService.findByName(name_check);
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
