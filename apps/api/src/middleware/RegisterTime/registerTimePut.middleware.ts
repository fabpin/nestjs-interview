import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

@Injectable()
export class RegisterTimePutMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const {
      user_id,
      note,
      status_id,
      timesheet_Type_Event_id
    } = req.body;
    if(
      validator.isAlphanumeric(note.toString(), 'en-US', { ignore: ' -_()/'}) &&
      validator.isNumeric(user_id.toString(), {no_symbols : true}) &&
      validator.isNumeric(status_id.toString(), {no_symbols : true}) &&
      validator.isNumeric(timesheet_Type_Event_id.toString(), {no_symbols : true})) {
      req.body = {
        user_id,
        note,
        status_id,
        timesheet_Type_Event_id };
      next();
    } else {
      if(!validator.isAlphanumeric(note.toString(), 'en-US', { ignore: ' -_()/'})){
        return res.status(409).json({message: 'the request has a incorrect type on note, only allow a-zA-Z0-9 and the following characters: [-_()/s]'});
      }

      if(!validator.isNumeric(user_id.toString(), {no_symbols : true})){
        return res.status(409).json({message: 'the request has a incorrect type on user_id, only allow whole numbers'});
      }

      if(!validator.isNumeric(status_id.toString(), {no_symbols : true})){
        return res.status(409).json({message: 'the request has a incorrect type on status_id, only allow whole numbers'});
      }

      if(!validator.isNumeric(timesheet_Type_Event_id.toString(), {no_symbols : true})){
        return res.status(409).json({message: 'the request has a incorrect type on timesheet_Type_Event_id, only allow whole numbers'});
      }
    }
  }
}
