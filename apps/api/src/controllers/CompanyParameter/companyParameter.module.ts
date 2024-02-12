import { Module } from '@nestjs/common';

import { CompanyParameterController } from './companyParameter.controller';
// import { HelloCommand } from '@ocmi/api/commands/hello.command';
// import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    // PrismaModule,
  ],
  controllers: [CompanyParameterController],
  providers: [
    //AppService,
    // HelloCommand
  ],
})
export class CompanyParameterModule {}
