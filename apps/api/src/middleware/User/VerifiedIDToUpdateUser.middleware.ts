import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { DataBaseConnectionService } from "@ocmi/api/services/DataBaseService/DataBaseConnection.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";

@Injectable()
export class VerifiedIDToUpdateUserMiddleware implements NestMiddleware {
  private dataBaseConnectionService: DataBaseConnectionService;
  constructor() {
    this.dataBaseConnectionService = new DataBaseConnectionService('Prisma', 'User');
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if(validator.isNumeric(id.toString())){
      const model:ETModel = await this.dataBaseConnectionService.findById(parseInt(id));
      if(model) {
        next();
      } else {
        return res.status(401).json({message: 'the request has a incorrect id'});
      }
    }else{
      return res.status(401).json({message: 'the request has a incorrect id'});
    }
  }
}
