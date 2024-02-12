import { Injectable } from '@nestjs/common';

@Injectable()
export class TimesheetService {
  helloWorld(): {message: string} {
    return { message: 'Hellow World'}
  }
}
