import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

@Injectable()
export class CheckStructureMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { name, gross_wages, user_id } = req.body;
    if(
      validator.isAlphanumeric(name.toString(), 'en-US', { ignore: ' '}) &&
      validator.isNumeric(gross_wages.toString()) &&
      validator.isNumeric(user_id.toString(), {no_symbols : true})) {
      req.body = { name: name, gross_wages: gross_wages , user_id: user_id};
      next();
    } else {
      if(!validator.isAlphanumeric(name.toString(), 'en-US', { ignore: ' '})){
        return res.status(409).json({message: 'the request has a incorrect type on name, only allow a-zA-Z0-9'});
      }

      if(!validator.isNumeric(gross_wages.toString())){
        return res.status(409).json({message: 'the request has a incorrect type on gross_wages, only allow numbers'});
      }

      if(!validator.isNumeric(user_id.toString(), {no_symbols : true})){
        return res.status(409).json({message: 'the request has a incorrect type on user_id, only allow whole numbers'});
      }
    }
  }
}
