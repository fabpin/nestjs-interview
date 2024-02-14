import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

@Injectable()
export class CompanyParameterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      email,
      minimun_wages_salary,
      minimun_wages_hourly
    } = req.body;
    if(
      validator.isAlphanumeric(name.toString(), 'en-US', { ignore: ' '}) &&
      validator.isNumeric(minimun_wages_salary.toString()) &&
      validator.isNumeric(minimun_wages_hourly.toString()) &&
      validator.isEmail(email.toString())) {
      req.body = {
        name,
        email,
        minimun_wages_salary,
        minimun_wages_hourly };
      next();
    } else {
      if(!validator.isAlphanumeric(name.toString(), 'en-US', { ignore: ' '})){
        return res.status(409).json({message: 'the request has a incorrect type on name, only allow a-zA-Z0-9'});
      }

      if(!validator.isNumeric(minimun_wages_salary.toString())){
        return res.status(409).json({message: 'the request has a incorrect type on minimun_wages_salary, only allow numbers'});
      }

      if(!validator.isNumeric(minimun_wages_hourly.toString())){
        return res.status(409).json({message: 'the request has a incorrect type on minimun_wages_hourly, only allow numbers'});
      }

      if(!validator.isEmail(email.toString())){
        return res.status(409).json({message: 'the request has a incorrect type on email, only allow valid emails, example: example@example.com'});
      }
    }
  }
}
