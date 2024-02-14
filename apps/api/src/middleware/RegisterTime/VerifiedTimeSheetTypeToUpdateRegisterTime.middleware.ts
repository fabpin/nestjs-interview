import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { DataBaseConnectionService } from "@ocmi/api/services/DataBaseService/DataBaseConnection.service";
import { ETModel } from "@ocmi/api/providers/prisma/TModel.enum";

@Injectable()
export class VerifiedTimeSheetTypeToUpdateRegisterTimeMiddleware implements NestMiddleware {
  private dataBaseConnectionService: DataBaseConnectionService;
  constructor() {
    this.dataBaseConnectionService = new DataBaseConnectionService('Prisma', 'TimesheetTypeEvent');
  }
  async use(req: Request, res: Response, next: NextFunction) {
    const { timesheet_Type_Event_id } = req.params;
    if(validator.isNumeric(timesheet_Type_Event_id.toString(), { no_symbols: true})){
      const model: ETModel = await this.dataBaseConnectionService.findById(parseInt(timesheet_Type_Event_id));
      if(model) {
        next();
      } else {
        return res.status(409).json({message: 'the request has a incorrect timesheet_Type_Event_id'});
      }
    }else{
      return res.status(401).json({message: 'the request has a incorrect timesheet_Type_Event_id'});
    }
  }
}
