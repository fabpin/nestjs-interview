import { Injectable } from '@nestjs/common';

@Injectable()
export class CheckService {
  helloWorld(): {message: string} {
    return { message: 'Hellow World'}
  }
}
