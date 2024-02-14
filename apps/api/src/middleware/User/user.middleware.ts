import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      password,
      email,
      pay_date,
      rol_id,
      pay_type_id,
      company_parameters_id
    } = req.body;
    if(
      validator.isAlphanumeric(name.toString(), 'en-US', { ignore: ' '}) &&
      validator.isNumeric(rol_id.toString(),{no_symbols : true}) &&
      validator.isNumeric(pay_type_id.toString(), {no_symbols : true}) &&
      validator.isStrongPassword(password.toString()) &&
      validator.isEmail(email.toString()) &&
      validator.isISO8601(pay_date.toString()) &&
      validator.isNumeric(pay_type_id.toString())) {
      req.body = {
        name,
        password,
        email,
        pay_date,
        rol_id,
        pay_type_id,
        company_parameters_id };
      next();
    } else {
      if(!validator.isAlphanumeric(name.toString(), 'en-US', { ignore: ' '})){
        return res.status(409).json({message: 'the request has a incorrect type on name, only allow a-zA-Z0-9'});
      }

      if(!validator.isNumeric(rol_id.toString(), {no_symbols : true})){
        return res.status(409).json({message: 'the request has a incorrect type on rol_id, only allow whole numbers'});
      }

      if(!validator.isNumeric(pay_type_id.toString(), {no_symbols : true})){
        return res.status(409).json({message: 'the request has a incorrect type on user_id, only allow whole numbers'});
      }

      if(!validator.isStrongPassword(password.toString())){
        return res.status(409).json({message: 'the request has a incorrect type on password, only allow strong password by default { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }'});
      }

      if(!validator.isEmail(email.toString())){
        return res.status(409).json({message: 'the request has a incorrect type on email, only allow valid emails, example: example@example.com'});
      }

      if(!validator.isISO8601(pay_date.toString())){
        return res.status(409).json({message: 'the request has a incorrect type on pay_date, only allow valid pay_date, example:  [2002-07-15, new Date()]'});
      }

      if(!validator.isNumeric(pay_type_id.toString())){
        return res.status(409).json({message: 'the request has a incorrect type on pay_type_id, only allow whole numbers'});
      }
    }
  }
}
