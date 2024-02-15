import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

@Injectable()
export class ValidatePaginationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { take, skip } = req.query;
    if(take && skip){
      if(validator.isNumeric(take.toString(), { no_symbols: true }) &&
        validator.isNumeric(skip.toString(), { no_symbols: true })
      ) {
        next();
      } else {
        if(!validator.isNumeric(take.toString(),{ no_symbols: true })){
          return res.status(409).json({message: 'the request has a incorrect type on the query of url, take only allow 0-9'});
        }

        if(!validator.isNumeric(skip.toString(),{ no_symbols: true })){
          return res.status(409).json({message: 'the request has a incorrect type on the query of url, take only allow 0-9'});
        }
      }
    } else {
      next();
    }
  }
}
