import { Injectable } from '@nestjs/common';

@Injectable()
export class CompanyParameterControllerService {
  helloWorld(): {message: string} {
    return { message: 'Hellow World'}
  }
}
