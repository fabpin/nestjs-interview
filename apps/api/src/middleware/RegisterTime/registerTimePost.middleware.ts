import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

@Injectable()
export class RegisterTimePostMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const {
      hours,
      name_check,
      user_id,
      note,
      status_id,
      gross_wages,
      timesheet_Type_Event_id
    } = req.body;
    if(
      validator.isAlphanumeric(note.toString(), 'en-US', { ignore: ' -_()/'}) &&
      validator.isAlphanumeric(name_check.toString(), 'en-US', { ignore: ' -'}) &&
      validator.isNumeric(hours.toString()) &&
      validator.isNumeric(user_id.toString(), {no_symbols : true}) &&
      validator.isNumeric(status_id.toString(), {no_symbols : true}) &&
      validator.isNumeric(gross_wages.toString()) &&
      validator.isNumeric(timesheet_Type_Event_id.toString(), {no_symbols : true})) {
      req.body = {
        hours,
        name_check,
        user_id,
        note,
        status_id,
        gross_wages,
        timesheet_Type_Event_id };
      next();
    } else {
      if(!validator.isAlphanumeric(note.toString(), 'en-US', { ignore: ' -_()/'})){
        return res.status(409).json({message: 'the request has a incorrect type on note, only allow a-zA-Z0-9 and the following characters: [-_()/s]'});
      }

      if(!validator.isAlphanumeric(name_check.toString(), 'en-US', { ignore: ' -_()/'})){
        return res.status(409).json({message: 'the request has a incorrect type on name_check, only allow a-zA-Z0-9 and the following characters: [ -]'});
      }

      if(!validator.isNumeric(hours.toString())){
        return res.status(409).json({message: 'the request has a incorrect type on hours, only allow whole numbers'});
      }

      if(!validator.isNumeric(user_id.toString(), {no_symbols : true})){
        return res.status(409).json({message: 'the request has a incorrect type on user_id, only allow whole numbers'});
      }

      if(!validator.isNumeric(status_id.toString(), {no_symbols : true})){
        return res.status(409).json({message: 'the request has a incorrect type on status_id, only allow whole numbers'});
      }

      if(!validator.isNumeric(gross_wages.toString())){
        return res.status(409).json({message: 'the request has a incorrect type on gross_wages, only allow numbers'});
      }

      if(!validator.isNumeric(timesheet_Type_Event_id.toString(), {no_symbols : true})){
        return res.status(409).json({message: 'the request has a incorrect type on timesheet_Type_Event_id, only allow whole numbers'});
      }
    }
  }
}
