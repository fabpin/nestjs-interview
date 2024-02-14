import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { DataBaseConnectionService } from "@ocmi/api/services/DataBaseService/DataBaseConnection.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";

@Injectable()
export class VerifiedPayTypeToUpdateUserMiddleware implements NestMiddleware {
  private dataBaseConnectionService: DataBaseConnectionService;
  constructor() {
    this.dataBaseConnectionService = new DataBaseConnectionService('Prisma', 'PayType');
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const { pay_type_id } = req.params;
    if(validator.isNumeric(pay_type_id.toString(), { no_symbols: true })){
      const model:ETModel = await this.dataBaseConnectionService.findById(parseInt(pay_type_id));
      if(model) {
        next();
      } else {
        return res.status(409).json({message: 'the request has a incorrect pay_type_id'});
      }
    }else{
      return res.status(401).json({message: 'the request has a incorrect pay_type_id'});
    }
  }
}
