import { Injectable } from '@nestjs/common';

@Injectable()
export class RolService {
  helloWorld(): {message: string} {
    return { message: 'Hellow World'}
  }
}
