import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

@Injectable()
export class TimeSheetMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { hours } = req.body;
    if(validator.isNumeric(hours.toString())) {
      req.body = { hours: hours };
      next();
    } else {
      if(!validator.isNumeric(hours.toString())){
        return res.status(409).json({message: 'the request has a incorrect type on hours, only allow numbers'});
      }
    }
  }
}
