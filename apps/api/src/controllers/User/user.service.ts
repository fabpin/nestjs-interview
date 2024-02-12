import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  helloWorld(): {message: string} {
    return { message: 'Hellow World'}
  }
}
