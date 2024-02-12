import { Injectable } from '@nestjs/common';

@Injectable()
export class TimesheetTypeService {
  helloWorld(): {message: string} {
    return { message: 'Hellow World'}
  }
}
