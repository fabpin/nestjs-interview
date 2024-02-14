import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { DataBaseConnectionService } from "@ocmi/api/services/DataBaseService/DataBaseConnection.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";

@Injectable()
export class VerifiedEmailToUpdateCompanyParameterMiddleware implements NestMiddleware {
  private dataBaseConnectionService: DataBaseConnectionService;
  constructor() {
    this.dataBaseConnectionService = new DataBaseConnectionService('Prisma', 'CompanyParameter');
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const { email } = req.params;
    if(validator.isEmail(email.toString())){
      const model:ETModel = await this.dataBaseConnectionService.findByEmail(email);
      if(model) {
        next();
      } else {
        return res.status(409).json({message: 'the request has a incorrect email'});
      }
    }else{
      return res.status(401).json({message: 'the request has a incorrect email'});
    }
  }
}
