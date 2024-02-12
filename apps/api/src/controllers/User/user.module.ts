import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
// import { HelloCommand } from '@ocmi/api/commands/hello.command';
// import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    // PrismaModule,
  ],
  controllers: [UserController],
  providers: [
    //AppService,
    // HelloCommand
  ],
})
export class UserModule {}
