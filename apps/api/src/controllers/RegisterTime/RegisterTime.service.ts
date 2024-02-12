import { Injectable } from '@nestjs/common';

@Injectable()
export class PayTypeService {
  helloWorld(): {message: string} {
    return { message: 'Hellow World'}
  }
}
