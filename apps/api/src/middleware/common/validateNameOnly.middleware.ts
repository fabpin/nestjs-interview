import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

@Injectable()
export class ValidateNameAlphabeticMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    if(validator.isAlpha(name.toString(), 'en-US', { ignore: ' '})) {
      req.body = { name: name };
      next();
    } else {
      if(!validator.isAlpha(name.toString(), 'en-US', { ignore: ' '})){
        return res.status(409).json({message: 'the request has a incorrect type on name, only allow a-zA-Z0-9'});
      }
    }
  }
}
