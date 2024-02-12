import { Module } from '@nestjs/common';

import { RegisterTimeController } from './RegisterTime.controller';
// import { HelloCommand } from '@ocmi/api/commands/hello.command';
// import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    // PrismaModule,
  ],
  controllers: [RegisterTimeController],
  providers: [
    //AppService,
    // HelloCommand
  ],
})
export class RegisterTimeModule {}
